import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import NavbarPostTest from '../Navbar/NavberPostTest';
import axios from "axios";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Test_4 = ({ navigation }) => {

    const [selectedTest] = useState('T04');
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
                <StyledText className='text-white text-center text-2xl font-bold bg-yellow-500 p-2 mx-10 mt-5 mb-1 rounded-xl'>
                    แบบทดสอบหลังเรียน
                </StyledText>
            </StyledView>

            <StyledView className='bg-orange-200 mx-4 mt-1 mb-4 h-2/3 rounded-2xl'>
                <StyledView className='bg-white mx-4 mt-4 rounded-2xl pb-5 pl-2'>
                    {tests
                        .filter((test) => test.TestID === selectedTest)
                        .map((test) => (
                            <StyledText key={test.TestID} className='text-black text-xl ml-2 mt-4'>
                                {test.CodeQuestion}
                            </StyledText>
                        ))}
                </StyledView>
                <StyledView>
                    {tests
                        .filter((test) => test.TestID === selectedTest)
                        .map((test) => (
                            <StyledText key={test.TestID} className='text-black text-lg ml-5 mt-4'>
                                {test.Question}
                            </StyledText>
                        ))}
                </StyledView>

                <StyledView className='mt-5'>
                    <StyledTouchableOpacity>
                        {tests
                            .filter((test) => test.TestID === selectedTest)
                            .map((test) => (
                                <StyledText key={test.TestID} className='bg-blue-500 text-lg text-white my-4 ml-4 w-5/6 pl-4 py-2 rounded-2xl'>
                                    1.{test.Choice1}
                                </StyledText>
                            ))}
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity>
                        {tests
                            .filter((test) => test.TestID === selectedTest)
                            .map((test) => (
                                <StyledText key={test.TestID} className='bg-blue-500 text-lg text-white my-4 ml-4 w-5/6 pr-2 pl-4 py-2 rounded-2xl'>
                                    2.{test.Choice2}
                                </StyledText>
                            ))}
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity>
                        {tests
                            .filter((test) => test.TestID === selectedTest)
                            .map((test) => (
                                <StyledText key={test.TestID} className='bg-blue-500 text-lg text-white my-4 ml-4 w-5/6 pl-4 py-2 rounded-2xl'>
                                    3.{test.Choice3}
                                </StyledText>
                            ))}
                    </StyledTouchableOpacity>
                </StyledView>


            </StyledView>

            <StyledView className="flex-row justify-end">
                <StyledTouchableOpacity
                    onPress={() => {
                        navigation.navigate('T05');
                    }}
                >
                    <StyledText className="text-white text-base font-bold bg-blue-500 px-7 py-3 m-4 rounded-3xl">
                        ข้อต่อไป
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledView>

        </StyledView>
    );
};

export default Test_4;
