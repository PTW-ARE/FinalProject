import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity,BackHandler,Alert } from 'react-native';
import { styled } from 'nativewind';
import NavbarPostTest from '../Navbar/NavbarPostTest';
import axios from "axios";
import { CommonActions } from '@react-navigation/native';
import { useUser } from '../UserProvider';


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Test_10 = ({ route, navigation }) => {

    const [selectedTest] = useState('T10');
    const [tests, setTests] = useState([]);
    const [scores, setScores] = useState(route.params?.scores || {});
    const [selectedChoice, setSelectedChoice] = useState(null);
    const { userName } = useUser();

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

    const handleFinish = (userName) => {

        if (selectedChoice === null) {
            Alert.alert("คำเตือน", "กรุณาเลือกคำตอบก่อนไปข้อต่อไป", [
                { text: "ตกลง", onPress: () => {} }
            ]);
            return; // หยุดการทำงานถ้าไม่มีการเลือกคำตอบ
        }

        const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

        console.log("Total score to be sent:", totalScore);
        

        axios.post(`http://192.168.0.149:8000/saveTestScore/${userName}`, { score: totalScore })
            .then((response) => {

                console.log("Score saved successfully!", response.data);


                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'TestSuccess', params: { totalScore } } // ส่งค่า totalScore
                        ],
                    })
                );
            })
            .catch(error => {
                
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'TestSuccess', params: { totalScore } } // ส่งค่า totalScore
                        ],
                    })
                );
            });
            
    };


    return (
        <StyledView className="flex-1 bg-gray-100">

            <NavbarPostTest navigation={navigation} />

            <StyledView >
                <StyledText className='bg-blue-800 p-2 mx-6 mt-5 mb-1 text-white text-center text-2xl font-bold rounded-xl'>
                    แบบทดสอบหลังเรียนข้อที่10
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
                    <StyledTouchableOpacity onPress={() => handleChoice('Choice1', false)}
                        className={`my-4 ml-4 w-1/2 pl-4 py-2 shadow-md rounded-2xl ${selectedChoice === 'Choice1' ? 'bg-violet-700' : 'bg-blue-700'}`}>
                        {tests
                            .filter((test) => test.TestID === selectedTest)
                            .map((test) => (
                                <StyledText key={test.TestID} className='text-base text-white '>
                                    1. {test.Choice1}
                                </StyledText>
                            ))}
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity
                        onPress={() => handleChoice('Choice2', false)}
                        className={`my-4 ml-4 w-1/2 pl-4 py-2 shadow-md rounded-2xl ${selectedChoice === 'Choice2' ? 'bg-violet-700' : 'bg-blue-700'}`}>
                        {tests
                            .filter((test) => test.TestID === selectedTest)
                            .map((test) => (
                                <StyledText key={test.TestID} className='text-base text-white '>
                                    2. {test.Choice2}
                                </StyledText>
                            ))}
                    </StyledTouchableOpacity>
                    <StyledTouchableOpacity
                        onPress={() => handleChoice('Choice3', true)}
                        className={`my-4 ml-4 w-1/2 pl-4 py-2 shadow-md rounded-2xl ${selectedChoice === 'Choice3' ? 'bg-violet-700' : 'bg-blue-700'}`}>
                        {tests
                            .filter((test) => test.TestID === selectedTest)
                            .map((test) => (
                                <StyledText key={test.TestID} className='text-base text-white '>
                                    3. {test.Choice3}
                                </StyledText>
                            ))}
                    </StyledTouchableOpacity>
                </StyledView>

            </StyledView>

            <StyledView className="flex-row justify-end">

                <StyledTouchableOpacity
                    onPress={() => {
                        handleFinish(userName)
                    }}
                >
                    <StyledText className="text-white text-base font-bold shadow-md bg-red-700 px-7 py-3 m-4 rounded-3xl ">
                        ส่งแบบทดสอบ
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledView>

        </StyledView>
    );
};

export default Test_10;
