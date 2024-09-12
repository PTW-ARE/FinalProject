import React, { useState, useEffect } from 'react';
import { withExpoSnack } from 'nativewind';
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Register = () => {
    const [CustomerID, setCustomerID] = useState(''); // สำหรับ CustomerID
    const [UserName, setUsername] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [BirthDate, setBirthDate] = useState('');
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('');

    const navigation = useNavigation();

    const isValidDate = (date) => {
        // ตรวจสอบรูปแบบวันที่ DD/MM/YYYY และทำการตรวจสอบวันเดือนปี
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (!regex.test(date)) return false;

        const [day, month, year] = date.split('/').map(Number);

        // ตรวจสอบวันเดือนปี
        const dateObject = new Date(year, month - 1, day);
        return (
            dateObject.getFullYear() === year &&
            dateObject.getMonth() === month - 1 &&
            dateObject.getDate() === day
        );
    };


    const handleRegister = async () => {
        if (!UserName || !FirstName || !LastName || !BirthDate || !Password || !Email) {
            Alert.alert('คำเตือน', 'กรุณากรอกข้อมูลทุกช่อง');
            return;
        }

        if (!isValidDate(BirthDate)) {
            Alert.alert('คำเตือน', 'กรุณากรอกวันเกิดในรูปแบบ วัน/เดือน/ปี (เช่น 31/12/2024)');
            return;
        }

        try {

            const response = await axios.post('http://172.28.156.125:8000/register', {
            UserName,
            Password,
            FirstName,
            LastName,
            BirthDate,
            Email
        });

            if (response.status === 201) {
                Alert.alert('สำเร็จ', 'การลงทะเบียนเสร็จสมบูรณ์', [
                    { text: 'ตกลง', onPress: () => navigation.navigate('Login') }
                ]);

            } else {
                Alert.alert('ผิดพลาด', 'การลงทะเบียนล้มเหลว');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('ผิดพลาด', 'มีบางอย่างผิดพลาด');
        }
    };


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <StyledView className="flex-1 justify-center bg-white items-center">
                <StyledText className="text-blue-500 font-bold text-4xl mb-6">
                    Beginning to C
                </StyledText>

                <StyledView className="w-3/4 mb-4">
                    <StyledText className="text-blue-500 mb-1">ชื่อ</StyledText>
                    <StyledTextInput
                        className="p-3 bg-blue-100 rounded-lg"
                        placeholder="FirstName"
                        placeholderTextColor="#999"
                        value={FirstName}
                        onChangeText={setFirstName}
                    />
                </StyledView>

                <StyledView className="w-3/4 mb-4">
                    <StyledText className="text-blue-500 mb-1">นามสกุล</StyledText>
                    <StyledTextInput
                        className="p-3 bg-blue-100 rounded-lg"
                        placeholder="LastName"
                        placeholderTextColor="#999"
                        value={LastName}
                        onChangeText={setLastName}
                    />
                </StyledView>

                <StyledView className="w-3/4 mb-4">
                    <StyledText className="text-blue-500 mb-1">วันเกิด (วัน/เดือน/ปี(ค.ศ.))</StyledText>
                    <StyledTextInput
                        className="p-3 bg-blue-100 rounded-lg"
                        placeholder="DD/MM/YYYY"
                        placeholderTextColor="#999"
                        value={BirthDate}
                        onChangeText={setBirthDate}
                    />
                </StyledView>


                <StyledView className="w-3/4 mb-4">
                    <StyledText className="text-blue-500 mb-1">ชื่อผู้ใช้</StyledText>
                    <StyledTextInput
                        className="p-3 bg-blue-100 rounded-lg"
                        placeholder="UserName"
                        placeholderTextColor="#999"
                        value={UserName}
                        onChangeText={setUsername}
                    />
                </StyledView>

                <StyledView className="w-3/4 mb-4">
                    <StyledText className="text-blue-500 mb-1">รหัสผ่าน</StyledText>
                    <StyledTextInput
                        className="p-3 bg-blue-100 rounded-lg"
                        placeholder="Password"
                        placeholderTextColor="#999"
                        secureTextEntry
                        value={Password}
                        onChangeText={setPassword}
                    />
                </StyledView>

                <StyledView className="w-3/4 mb-6">
                    <StyledText className="text-blue-500 mb-1">Email</StyledText>
                    <StyledTextInput
                        className="p-3 bg-blue-100 rounded-lg"
                        placeholder="Email"
                        placeholderTextColor="#999"
                        value={Email}
                        onChangeText={setEmail}
                    />
                </StyledView>

                <StyledTouchableOpacity
                    className="w-3/4 p-3 bg-orange-500 rounded-lg items-center"
                    onPress={handleRegister}
                >
                    <StyledText className="text-white font-bold text-lg">
                        ลงทะเบียน
                    </StyledText>
                </StyledTouchableOpacity>
            </StyledView>
        </ScrollView>
    );
};

export default withExpoSnack(Register);
