import React from 'react';
import { withExpoSnack } from 'nativewind';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Login = ({}) => {

  const navigation = useNavigation();

  const handleLogin = () => {
    // นำทางไปยังหน้า Menu เมื่อเข้าสู่ระบบสำเร็จ
    navigation.navigate('Menu');
  };

  const handleRegister = () => {
    // นำทางไปยังหน้า Menu เมื่อเข้าสู่ระบบสำเร็จ
    navigation.navigate('Register');
  };

  return (
    <StyledView className="container flex-1 justify-center bg-blue-700 items-center">
      <StyledText className="text-white font-bold text-4xl mb-10">
        Login
      </StyledText>

      <StyledView className="w-3/4 mb-4">
        <StyledText className="text-white mb-2">Username</StyledText>
        <StyledTextInput
          className="p-4 bg-white rounded-lg"
          placeholder="Username"
          placeholderTextColor="#999"
        />
      </StyledView>

      <StyledView className="w-3/4 mb-6">
        <StyledText className="text-white mb-2">Password</StyledText>
        <StyledTextInput
          className="p-4 bg-white rounded-lg"
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
        />
      </StyledView>

      <StyledView className="flex-row gap-2 w-10/12 px-4 justify-center">
            <StyledTouchableOpacity
                className="w-2/6 p-2 bg-green-500 rounded-lg items-center"
                onPress={handleLogin}
            >
                <StyledText className="text-white font-bold text-sm">
                    Login
                </StyledText>
            </StyledTouchableOpacity>

            <StyledTouchableOpacity
                className="w-2/6 p-2 bg-green-500 rounded-lg items-center"
                onPress={handleRegister}
            >
                <StyledText className="text-white font-bold text-sm">
                    Register
                </StyledText>
            </StyledTouchableOpacity>
        </StyledView>

    </StyledView>
  );
};

export default withExpoSnack(Login);