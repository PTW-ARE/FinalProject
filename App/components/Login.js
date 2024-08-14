import React , {useState} from 'react';
import { withExpoSnack } from 'nativewind';
import { Text, View, TextInput, TouchableOpacity,Alert } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);


const Login = ({}) => {

  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      // เรียก API ด้วย axios
      const response = await axios.post('http://172.28.159.77:8000/api/authen_request', {
        UserName: UserName,
        Password: Password,
      });

      // ตรวจสอบผลลัพธ์จาก API
      if (response.data.result) {
        // หากเข้าสู่ระบบสำเร็จ
        navigation.navigate('Menu');

      } else {
        // หากเข้าสู่ระบบไม่สำเร็จ
        Alert.alert('กรุณาลองใหม่', response.data.message);
      }
    } catch (error) {
      // จัดการข้อผิดพลาดที่เกิดขึ้น
      console.error(error);
      Alert.alert('คำเตือน', 'เกิดข้อผิดพลาด');
    }
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
          value={UserName}
          onChangeText={setUserName}
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