import React, { useState } from 'react';
import { withExpoSnack } from 'nativewind';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useUser } from "../UserProvider";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);


const Login = ({ }) => {

  const [UserName, setuserName] = useState('');
  const [Password, setPassword] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [authSignature, setAuthSignature] = useState('');
  const { setUserName } = useUser();

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!UserName || !Password) {
      Alert.alert('คำเตือน', 'กรุณากรอก Username และ Password ให้ถูกต้อง');
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.149:8000/login', {
        UserName,
        Password,
      });
      
      if (response.data.result) {


        setAuthToken(response.data.token);
        
        setUserName(UserName);
        navigation.navigate('Menu');
        
        
      } else {
        Alert.alert('Login Failed', response.data.message || 'Unknown error'); // ป้องกันการแสดงข้อความ undefined
      }

    } catch (error) {
      setAuthToken('');
      Alert.alert('คำเตือน', 'Username หรือ Password ไม่ถูกต้อง');
    }

  };




  const handleRegister = () => {

    navigation.navigate('Register');
  };

  return (
    <StyledView className="container flex-1 justify-center bg-blue-700 items-center">
      <StyledText className="text-white font-bold text-4xl mb-10">
        LOGIN
      </StyledText>

      <StyledView className="w-3/4 mb-4">
        <StyledText className="text-white mb-2">Username</StyledText>
        <StyledTextInput
          className="p-4 bg-white rounded-lg"
          placeholder="Username"
          placeholderTextColor="#999"
          value={UserName}
          onChangeText={setuserName}
        />
      </StyledView>

      <StyledView className="w-3/4 mb-6">
        <StyledText className="text-white mb-2">Password</StyledText>
        <StyledTextInput
          className="p-4 bg-white rounded-lg"
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={Password}
          onChangeText={setPassword}
        />
      </StyledView>

      <StyledView className="flex-row gap-2 w-10/12 px-4 justify-center">
        

        <StyledTouchableOpacity
          className="w-2/6 p-2 bg-blue-500 shadow-md rounded-lg items-center"
          onPress={handleRegister}
        >
          <StyledText className="text-white font-bold text-sm">
            Register
          </StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          className="w-2/6 p-2 bg-cyan-500 shadow-md rounded-lg items-center"
          onPress={handleLogin}
        >
          <StyledText className="text-white font-bold text-sm">
            Login
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>

    </StyledView>
  );
};

export default withExpoSnack(Login);