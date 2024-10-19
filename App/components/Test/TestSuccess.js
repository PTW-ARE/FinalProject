import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity,BackHandler,Alert } from 'react-native';
import { styled } from 'nativewind';
import NavbarCriteria from '../Navbar/NavbarCriteria';


const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const TestSuccess = ({ route, navigation }) => {


    const totalScore = route.params?.totalScore || 5;
    let scoreColor = '';
    let statusText = '';

    if (totalScore >= 0 && totalScore <= 4) {
        scoreColor = 'text-red-500'; // สีแดง
        statusText = 'ยังไม่ผ่าน';
    } else if (totalScore === 5) {
        scoreColor = 'text-blue-500'; // สีน้ำเงิน
        statusText = 'ผ่าน';
    } else if (totalScore >= 6 && totalScore <= 7) {
        scoreColor = 'text-green-800'; // สีเขียวเข้ม
        statusText = 'ดี';
    } else if (totalScore >= 8 && totalScore <= 10) {
        scoreColor = 'text-green-500'; // สีเขียวอ่อน
        statusText = 'ดีมาก';
    }


    useEffect(() => {
        const backAction = () => {
            // แสดงข้อความเตือนเมื่อกดย้อนกลับ
            Alert.alert(
                "คำเตือน",
                "ไม่สามารถย้อนกลับได้",
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

    return (
        <StyledView className="flex-1 bg-gray-100">

            <NavbarCriteria navigation={navigation} />

            <StyledView>
                <StyledText className='bg-yellow-500 px-2 py-5 mx-10 mt-10 mb-5 text-white text-center text-2xl font-bold rounded-xl'>
                    แบบทดสอบหลังเรียน
                </StyledText>
            </StyledView>

            <StyledView className='bg-orange-200 mx-4 mt-1 mb-4 h-2/5 rounded-2xl'>

                <StyledView>
                    <StyledView>
                        <StyledText className='text-2xl font-bold text-center mt-10'>
                            คะแนนแบบทดสอบที่ได้
                        </StyledText>
                    </StyledView>

                    {/* แสดงผลคะแนน */}
                    <StyledView className="flex-row items-center justify-center mt-3">
                        <StyledText className={`text-2xl font-bold my-3 text-center ${scoreColor}`}>
                            {totalScore} - {statusText}
                        </StyledText>
                    </StyledView>

                </StyledView>
                <StyledTouchableOpacity
                    className="mt-16 items-center"
                    onPress={() => {
                        navigation.navigate('Profile');
                    }}>

                    <StyledText className="text-white bg-blue-500 text-lg font-bold p-3 rounded-full w-80 text-center">
                        ไปยังหน้าโปรไฟล์
                    </StyledText>
                </StyledTouchableOpacity>


            </StyledView>


        </StyledView>
    );
};

export default TestSuccess;
