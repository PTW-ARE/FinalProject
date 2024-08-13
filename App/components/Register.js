import React, { useState } from 'react';
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
    const [Username, setUsername] = useState('');
    const [Firstname, setFirstName] = useState('');
    const [Lastname, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

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
        if (!Username || !Firstname || !Lastname || !dob || !password || !email) {
            Alert.alert('คำเตือน', 'กรุณากรอกข้อมูลทุกช่อง');
            return;
        }
    
        if (!isValidDate(dob)) {
            Alert.alert('คำเตือน', 'กรุณากรอกวันเกิดในรูปแบบ วัน/เดือน/ปี (เช่น 31/12/2024)');
            return;
        }
    
        try {
            const response = await axios.post('https://sheet.best/api/sheets/37b85bb3-3767-4278-820f-fe368f0d46d1', {
                Username,
                Firstname,
                Lastname,
                dob,
                password,
                email
            });
    
            if (response.status === 200) {
                Alert.alert('สำเร็จ', 'การลงทะเบียนเสร็จสมบูรณ์', [
                    { text: 'ตกลง', onPress: () => navigation.navigate('Login') }
                ]);
            } else {
                Alert.alert('ผิดพลาด', 'การลงทะเบียนล้มเหลว');
            }
        } catch (error) {
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
                        placeholder="Firstname"
                        placeholderTextColor="#999"
                        value={Firstname}
                        onChangeText={setFirstName}
                    />
                </StyledView>

                <StyledView className="w-3/4 mb-4">
                    <StyledText className="text-blue-500 mb-1">นามสกุล</StyledText>
                    <StyledTextInput
                        className="p-3 bg-blue-100 rounded-lg"
                        placeholder="Lastname"
                        placeholderTextColor="#999"
                        value={Lastname}
                        onChangeText={setLastName}
                    />
                </StyledView>

                <StyledView className="w-3/4 mb-4">
                    <StyledText className="text-blue-500 mb-1">วันเกิด (วัน/เดือน/ปี(ค.ศ.))</StyledText>
                    <StyledTextInput
                        className="p-3 bg-blue-100 rounded-lg"
                        placeholder="DD/MM/YYYY"
                        placeholderTextColor="#999"
                        value={dob}
                        onChangeText={setDob}
                    />
                </StyledView>


                <StyledView className="w-3/4 mb-4">
                    <StyledText className="text-blue-500 mb-1">ชื่อผู้ใช้</StyledText>
                    <StyledTextInput
                        className="p-3 bg-blue-100 rounded-lg"
                        placeholder="Username"
                        placeholderTextColor="#999"
                        value={Username}
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
                        value={password}
                        onChangeText={setPassword}
                    />
                </StyledView>

                <StyledView className="w-3/4 mb-6">
                    <StyledText className="text-blue-500 mb-1">Email</StyledText>
                    <StyledTextInput
                        className="p-3 bg-blue-100 rounded-lg"
                        placeholder="Email"
                        placeholderTextColor="#999"
                        value={email}
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
