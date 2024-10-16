import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import NavbarPostTest from '../Navbar/NavberPostTest';
import axios from "axios";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Result = ({ navigation }) => {

    const [selectedTest] = useState('T10');
    const [tests, setTests] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get("http://192.168.0.149:8000/test")
                .then((response) => {
                    setTests(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the test!", error);
                });
        });

        return unsubscribe;
    }, [navigation]);


    return (
        <StyledView className="flex-1 bg-gray-100">

            <NavbarPostTest navigation={navigation} />

            <StyledView>
                <StyledText className='bg-yellow-500 p-2 mx-10 mt-10 mb-10 text-white text-center text-2xl font-bold rounded-xl'>
                    แบบทดสอบหลังเรียน
                </StyledText>
            </StyledView>

            <StyledView className='bg-orange-200 mx-4 mt-1 mb-4 h-32 rounded-2xl'>
                <StyledView>
                    <StyledText className='text-black text-lg ml-5 mt-4 text-center pt-7'>
                        คะแนนที่ได้ : 
                    </StyledText>

                </StyledView>



            </StyledView>

            <StyledView className="flex-row justify-end">

                <StyledTouchableOpacity
                    onPress={() => {
                        navigation.navigate('T03');
                    }}
                >
                    <StyledText className="text-white text-base font-bold bg-blue-500 px-7 py-3 m-4 rounded-3xl ">
                        ข้อต่อไป
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledView>

        </StyledView>
    );
};

export default Result;
