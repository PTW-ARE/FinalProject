import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import NavbarPostTest from '../Navbar/NavberPostTest';
import axios from "axios";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const CriteriaTest = ({ navigation }) => {

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
                <StyledText className='bg-yellow-500 px-2 py-5 mx-10 mt-10 mb-5 text-white text-center text-2xl font-bold rounded-xl'>
                    แบบทดสอบหลังเรียน
                </StyledText>
            </StyledView>

            <StyledView className='bg-orange-200 mx-4 mt-1 mb-4 h-3/5 rounded-2xl'>

                <StyledText className='text-black text-xl font-bold mt-4 text-center pt-7'>
                    เกณฑ์คะแนนการผ่านแบบทดสอบ
                </StyledText>
                <StyledText className='text-lime-500 text-xl font-bold mt-4 ml-12 pt-7'>
                    8-10 คะแนน              ดีมาก
                </StyledText>
                <StyledText className='text-emerald-500 text-xl font-bold mt-4 ml-12 pt-7'>
                    6-7 คะแนน                 ดี
                </StyledText >
                <StyledText className='text-blue-500 text-xl font-bold mt-4 ml-12 pt-7'>
                    5 คะแนน                     ผ่าน
                </StyledText>
                <StyledText className='text-red-500 text-xl font-bold mt-4 ml-12 pt-7'>
                    0-4 คะแนน                ไม่ผ่าน
                </StyledText>

                <StyledTouchableOpacity
                        className="mt-9 items-center"
                        onPress={() => {
                            navigation.navigate('T01');
                        }}>
                            
                        <StyledText className="text-white bg-red-500 text-lg font-bold p-3 rounded-full w-80 text-center">
                            เริ่มทำแบบทดสอบ
                        </StyledText>
                    </StyledTouchableOpacity>


            </StyledView>

            
        </StyledView>
    );
};

export default CriteriaTest;
