import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { styled } from 'nativewind';
import NavbarCompiler from '../Navbar/NavbarCompiler';
import axios from "axios";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledTextInput = styled(TextInput);

const C_Compiler = ({ navigation }) => {

    const [code, setCode] = useState(`#include <stdio.h>\nint main() {\n   printf("Hello World!");\n   return 0;\n}`);
    const [output, setOutput] = useState(''); // เก็บผลลัพธ์ที่ได้จากการรันโค้ด

    const runCode = () => {
        axios.post('http://192.168.0.149:8000/compile', { code })
            .then(response => {
                setOutput(response.data.output); // เก็บผลลัพธ์ที่ได้ใน state
            })
            .catch(error => {
                // console.error('Error:', error);
                // setOutput("เกิดข้อผิดพลาดในการคอมไพล์");
                Alert.alert('คำเตือน', 'โค้ดไม่ถูกต้อง');
            });
    };


    return (
        <StyledView className="flex-1 bg-gray-100">


            <NavbarCompiler navigation={navigation}></NavbarCompiler>

            {/* กล่องสำหรับพิมพ์โค้ด */}
            <StyledView className="mt-5 mx-2 p-4 bg-blue-700 rounded-3xl shadow-sm">
                <StyledText className="text-lg font-bold text-white mb-2">
                    พิมพ์โค้ดภาษา C
                </StyledText>

                <StyledTextInput
                    multiline
                    className="bg-stone-200 h-80 px-2 py-2 shadow-sm"
                    value={code}
                    onChangeText={setCode}
                    placeholder="พิมพ์โค้ดภาษา C ของคุณที่นี่..."
                    textAlignVertical="top"
                    style={{ textAlign: 'left' }}
                />
            </StyledView>

            <StyledTouchableOpacity className="mt-2 mb-2 items-center" onPress={runCode}>
                <StyledText className="text-white bg-emerald-400 text-lg font-bold p-3 rounded-full w-28 text-center">
                    Run Code
                </StyledText>
            </StyledTouchableOpacity>

            {/* แสดงผลลัพธ์ */}
            <StyledView className="mt-1 mx-2 p-4 bg-blue-700 rounded-3xl shadow-sm">
                <StyledText className="text-lg font-bold text-white mb-2">
                    ผลลัพธ์
                </StyledText>


                <StyledView className="flex-1 bg-stone-200 px-2 shadow-sm h-32">
                    <ScrollView style={{ maxHeight: 200 }} showsVerticalScrollIndicator={true}>
                        <StyledText>{output}</StyledText>
                    </ScrollView>
                </StyledView>

            </StyledView>

        </StyledView>
    );
};

export default C_Compiler;
