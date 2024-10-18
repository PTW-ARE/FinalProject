import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import NavbarProfile from '../Navbar/NavbarProfile';
import axios from "axios";


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const Profile = ({ navigation }) => {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get("http://192.168.0.149:8000/customer")
                .then((response) => {
                    setCustomers(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the customer!", error);
                });
        });

        return unsubscribe;
    }, [navigation]);


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
                            .filter((customer) => customer.CustomerID === 'C03')
                            .map((customer) => (
                                <StyledView key={customer.CustomerID}>
                                    <StyledText className='text-black text-lg my-3 pl-4'>
                                        Username :     {customer.UserName}
                                    </StyledText>
                                    <StyledText className='text-black text-lg my-3 pl-4'>
                                        Firstname :     {customer.FirstName}
                                    </StyledText>
                                    <StyledText className='text-black text-lg my-3 pl-4'>
                                        Lastname :     {customer.LastName}
                                    </StyledText>
                                    <StyledText className='text-black text-lg my-3 pl-4'>
                                        Email :             {customer.Email}
                                    </StyledText>
                                </StyledView>
                            ))}
                    </StyledView>
                </StyledView>
                <StyledView className='bg-white h-1/4 w mx-4 mt-5 rounded-xl'>
                    <StyledView>
                        <StyledText className='text-xl font-bold text-center mt-4'>
                            คะแนนแบบทดสอบที่ได้
                        </StyledText>
                    </StyledView>
                    {customers
                        .filter((customer) => customer.CustomerID === 'C03')
                        .map((customer) => {
                            let scoreColor = '';
                            let statusText = '';

                            if (customer.TestScore >= 0 && customer.TestScore <= 4) {
                                scoreColor = 'text-red-500'; // สีแดง
                                statusText = 'ยังไม่ผ่าน';
                            } else if (customer.TestScore === 5) {
                                scoreColor = 'text-blue-500'; // สีน้ำเงิน
                                statusText = 'ผ่าน';
                            } else if (customer.TestScore >= 6 && customer.TestScore <= 7) {
                                scoreColor = 'text-green-800'; // สีเขียวเข้ม
                                statusText = 'ดี';
                            } else if (customer.TestScore >= 8 && customer.TestScore <= 10) {
                                scoreColor = 'text-green-500'; // สีเขียวอ่อน
                                statusText = 'ดีมาก';
                            }

                            return (
                                <StyledView key={customer.CustomerID} className="flex-row items-center">

                                    <StyledText className={`text-lg my-3 text-center ${scoreColor}`}>
                                        {customer.TestScore} - {statusText}
                                    </StyledText>
                                </StyledView>
                            );
                        })}
                </StyledView>
            </StyledView>

            <StyledTouchableOpacity
                className="mt-2 items-center"
                onPress={() => {
                    navigation.navigate('C_Part06');
                }}>

                <StyledText className="text-white bg-red-700 text-lg font-bold p-2 rounded-full w-2/5 text-center">
                    ออกจากระบบ
                </StyledText>
            </StyledTouchableOpacity>

            <StyledTouchableOpacity
                className="mt-4 items-center"
                onPress={() => {
                    navigation.navigate('C_Part06');
                }}>

                <StyledText className="text-white bg-red-500 text-lg font-bold p-2 rounded-full w-2/5 text-center">
                    ลบบัญชี
                </StyledText>
            </StyledTouchableOpacity>

        </StyledView>
    );
};

export default Profile;
