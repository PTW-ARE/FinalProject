import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity,BackHandler,Alert } from 'react-native';
import { styled } from 'nativewind';
import NavbarPostTest from '../Navbar/NavbarPostTest';
import axios from "axios";
import { CommonActions } from '@react-navigation/native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Test_8 = ({ route, navigation }) => {

    const [selectedTest] = useState('T08');
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

    useEffect(() => {
        const backAction = () => {
            // แสดงข้อความเตือนเมื่อกดย้อนกลับ
            Alert.alert(
                "คำเตือน",
                "ไม่สามารถย้อนกลับไปทำข้อเก่าได้",
                [
                    { text: "ตกลง", onPress: () => {} } // ให้แสดงแค่ข้อความเตือนและไม่ทำอะไร
                ]
            );
            return true; // ปิดกั้นการกดย้อนกลับ
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove(); // ลบ event เมื่อออกจากหน้าจอ
    }, []);

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
        if (selectedChoice === null) {
            Alert.alert("คำเตือน",
            "กรุณาเลือกคำตอบก่อนไปข้อต่อไป",
            [
                { text: "ตกลง", onPress: () => {} } // ให้แสดงแค่ข้อความเตือนและไม่ทำอะไร
            ]);
            return;
        }

        console.log("Score to be sent:", { scores });
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'T09', params: { scores } } // ปรับตามหน้าที่จะไป
                ],
            })
        );
    };


    return (
        <StyledView className="flex-1 bg-gray-100">

            <NavbarPostTest navigation={navigation} />

            <StyledView>
                <StyledText className='text-white text-center text-2xl font-bold bg-blue-800 p-2 mx-10 mt-5 mb-1 rounded-xl'>
                    แบบทดสอบหลังเรียนข้อที่8
                </StyledText>
            </StyledView>

            <StyledView className='bg-orange-200 mx-4 mt-1 mb-4 h-2/3 rounded-2xl'>
                <StyledView className='bg-white mx-4 mt-4 rounded-2xl h-48'>
                    {tests
                        .filter((test) => test.TestID === selectedTest)
                        .map((test) => (
                            <StyledText key={test.TestID} className='text-black text-base ml-2 mt-2'>
                                {test.CodeQuestion}
                            </StyledText>
                        ))}
                </StyledView>
                <StyledView>
                    {tests
                        .filter((test) => test.TestID === selectedTest)
                        .map((test) => (
                            <StyledText key={test.TestID} className='text-black text-base ml-5 mt-4 '>
                                {test.Question}
                            </StyledText>
                        ))}
                </StyledView>

                <StyledView className='mt-5'>
                    <StyledTouchableOpacity onPress={() => handleChoice('Choice1', false)}
                        className={`my-4 ml-4 w-1/2 pl-4 py-2 shadow-md rounded-2xl ${selectedChoice === 'Choice1' ? 'bg-violet-700' : 'bg-blue-700'}`}>
                        {tests
                            .filter((test) => test.TestID === selectedTest)
                            .map((test) => (
                                <StyledText key={test.TestID} className='text-lg text-white'>
                                    1. {test.Choice1}
                                </StyledText>
                            ))}
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity
                        onPress={() => handleChoice('Choice2', true)}
                        className={`my-4 ml-4 w-1/2 pl-4 py-2 shadow-md rounded-2xl ${selectedChoice === 'Choice2' ? 'bg-violet-700' : 'bg-blue-700'}`}>
                        {tests
                            .filter((test) => test.TestID === selectedTest)
                            .map((test) => (
                                <StyledText key={test.TestID} className='text-lg text-white'>
                                    2. {test.Choice2}
                                </StyledText>
                            ))}
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity
                        onPress={() => handleChoice('Choice3', false)}
                        className={`my-4 ml-4 w-1/2 pl-4 py-2 shadow-md rounded-2xl ${selectedChoice === 'Choice3' ? 'bg-violet-700' : 'bg-blue-700'}`}>
                        {tests
                            .filter((test) => test.TestID === selectedTest)
                            .map((test) => (
                                <StyledText key={test.TestID} className='text-lg text-white '>
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
                    <StyledText className="text-white text-base font-bold shadow-md bg-blue-600 px-7 py-3 m-4 rounded-3xl">
                        ข้อต่อไป
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledView>

        </StyledView>
    );
};

export default Test_8;
