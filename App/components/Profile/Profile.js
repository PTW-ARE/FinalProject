import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image ,Alert} from 'react-native';
import { styled } from 'nativewind';
import NavbarProfile from '../Navbar/NavbarProfile';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { useUser } from "../UserProvider";



const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const Profile = ({ route, navigation }) => {

    const [customers, setCustomers] = useState([]);
    const { userName } = useUser();
    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get(`http://192.168.0.149:8000/customer/profile/${userName}`)
                .then((response) => {
                    setCustomers(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the customer!", error);
                });
        });

        return unsubscribe;
    }, [navigation]);

    const handleDeleteAccess = () => {
        
        Alert.alert(
            "ลบบัญชี",
            "ยืนยันการลบบัญชีใช่หรือไม่?",
            [
                {
                    text: "ยกเลิก",
                    style: "cancel"
                },
                {
                    text: "ตกลง",
                    onPress: () => {
                        
                        if (customers.length > 0) {
                            const CustomerID = customers[0].CustomerID;
                            handleDeleteProfile(CustomerID, navigation); 
                        }
                    }
                }
            ]
        );
    };



    const handleDeleteProfile = async (CustomerID, navigation) => {
        try {
            // ลบ token หรือข้อมูลที่เก็บไว้ใน AsyncStorage เพื่อทำการล็อกเอาท์
            await AsyncStorage.removeItem('token');

            // ลบโปรไฟล์ของผู้ใช้
            await axios.delete(`http://192.168.0.149:8000/customer/profile/${CustomerID}`);
            console.log(`Customer with ID ${CustomerID} deleted successfully`);

            // รีเซ็ตสแต็กของการนำทาง และนำผู้ใช้ไปยังหน้า Login
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
            );
        } catch (error) {
            console.error("There was an error during logout or profile deletion!", error);
        }
    };


    return (
        <StyledView className="flex-1 bg-gray-100">

            <NavbarProfile navigation={navigation} />

            <StyledView className='bg-orange-200 mx-4 mt-10 mb-2 h-4/6 rounded-2xl'>

                <StyledView className='flex-row justify-center'>
                    <StyledImage source={require('./assets/blank-profile-picture-973460_1280.png')} className='h-24 w-20 rounded-xl mt-3'></StyledImage>
                </StyledView>

                <StyledView className='bg-white h-2/5 w mx-4 mt-2 rounded-xl'>
                    <StyledView>

                        {customers
                            .map((customer) =>
                                <StyledView key={customer.UserName}>


                                    <StyledText className='text-black text-lg my-3 pl-4'>
                                        Username : {customer.UserName}
                                    </StyledText>
                                    <StyledText className='text-black text-lg my-3 pl-4'>
                                        FirstName : {customer.FirstName}
                                    </StyledText>
                                    <StyledText className='text-black text-lg my-3 pl-4'>
                                        LastName : {customer.LastName}
                                    </StyledText>
                                    <StyledText className='text-black text-lg my-3 pl-4'>
                                        Email : {customer.Email}
                                    </StyledText>
                                </StyledView>


                            )}

                    </StyledView>
                </StyledView>

                <StyledView className='bg-white h-1/4 w mx-4 mt-5 rounded-xl'>
                    <StyledView>
                        <StyledText className='text-lg font-bold text-center mt-4'>
                            คะแนนแบบทดสอบที่ทำได้สูงสุด
                        </StyledText>
                    </StyledView>

                    {customers && customers.length > 0 && (
                        customers.map((customer) => (
                            <StyledView key={customer.UserName}>
                                <StyledText className={`text-2xl font-bold my-3 mr-3 text-center ${getScoreColor(customer.TestScore)}`}>
                                    {customer.TestScore} - {getStatusText(customer.TestScore)}
                                </StyledText>
                            </StyledView>
                        ))
                    )}
                </StyledView>
            </StyledView>

            <StyledTouchableOpacity
                className="mt-8 items-center"
                onPress={() => {
                    handleDeleteAccess()
                }}
            >
                <StyledText className="text-white bg-red-800 shadow-md text-lg font-bold p-2 py-3 rounded-full w-2/5 text-center">
                    ลบบัญชี
                </StyledText>
            </StyledTouchableOpacity>

        </StyledView>
    );
};

const getScoreColor = (score) => {
    if (score >= 0 && score <= 4) return 'text-red-500';
    if (score === 5) return 'text-blue-500';
    if (score >= 6 && score <= 7) return 'text-green-800';
    if (score >= 8 && score <= 10) return 'text-green-500';
    return '';
};

const getStatusText = (score) => {
    if (score >= 0 && score <= 4) return 'ยังไม่ผ่าน';
    if (score === 5) return 'ผ่าน';
    if (score >= 6 && score <= 7) return 'ดี';
    if (score >= 8 && score <= 10) return 'ดีมาก';
    return '';
};

export default Profile;
