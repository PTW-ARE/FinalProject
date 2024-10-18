import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import NavbarPostTest from '../Navbar/NavberPostTest';
import axios from "axios";
import { CommonActions } from '@react-navigation/native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Test_9 = ({ route, navigation }) => {

    const [selectedTest] = useState('T09');
    const [tests, setTests] = useState([]);
    const [scores, setScores] = useState(route.params?.scores || {});
    const [selectedChoice, setSelectedChoice] = useState(null);


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

    const handleChoice = (choice, isCorrect) => {
        if (selectedChoice !== choice) {
            setSelectedChoice(choice);
            
            // อัปเดตคะแนนใน Object
            setScores(prevScores => ({
                ...prevScores,
                [selectedTest]: isCorrect ? 1 : 0 // ถ้าตอบถูกให้เก็บ 1 ถ้าตอบผิดให้เก็บ 0
            }));
        }
    };

    const handleNext = () => {
        console.log("Score to be sent:", { scores });
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'T10', params: { scores } } // ปรับตามหน้าที่จะไป
                ],
            })
        );
    };


    return (
        <StyledView className="flex-1 bg-gray-100">

            <NavbarPostTest navigation={navigation} />

            <StyledView>
                <StyledText className='bg-yellow-500 p-2 mx-10 mt-5 mb-1 text-white text-center text-2xl font-bold rounded-xl'>
                    แบบทดสอบหลังเรียน
                </StyledText>
            </StyledView>

            <StyledView className='bg-orange-200 mx-4 mt-1 mb-4 h-2/3 rounded-2xl'>
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
                    <StyledTouchableOpacity onPress={() => handleChoice('Choice1', true)}
                        className={`my-4 ml-4 w-1/2 pl-4 py-2 rounded-2xl ${selectedChoice === 'Choice1' ? 'bg-violet-500' : 'bg-blue-500'}`}>
                        {tests
                            .filter((test) => test.TestID === selectedTest)
                            .map((test) => (
                                <StyledText key={test.TestID} className=' text-base text-white '>
                                    1. {test.Choice1}
                                </StyledText>
                            ))}
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity
                        onPress={() => handleChoice('Choice2', false)}
                        className={`my-4 ml-4 w-1/2 pl-4 py-2 rounded-2xl ${selectedChoice === 'Choice2' ? 'bg-violet-500' : 'bg-blue-500'}`}>
                        {tests
                            .filter((test) => test.TestID === selectedTest)
                            .map((test) => (
                                <StyledText key={test.TestID} className=' text-base text-white '>
                                    2. {test.Choice2}
                                </StyledText>
                            ))}
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity
                        onPress={() => handleChoice('Choice3', false)}
                        className={`my-4 ml-4 w-1/2 pl-4 py-2 rounded-2xl ${selectedChoice === 'Choice3' ? 'bg-violet-500' : 'bg-blue-500'}`}>
                        {tests
                            .filter((test) => test.TestID === selectedTest)
                            .map((test) => (
                                <StyledText key={test.TestID} className=' text-base text-white '>
                                    3. {test.Choice3}
                                </StyledText>
                            ))}
                    </StyledTouchableOpacity>
                </StyledView>

            </StyledView>

            <StyledView className="flex-row justify-end">
                <StyledTouchableOpacity
                    onPress={() => {
                        
                        handleNext()
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

export default Test_9;
