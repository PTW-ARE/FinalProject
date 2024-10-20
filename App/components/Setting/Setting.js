import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styled } from 'nativewind';
import Navbar from "../Navbar/NavbarSetting";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Setting = ({ route, navigation }) => {


    const logout = async (navigation) => {
        try {
            // ลบ token หรือข้อมูลที่เก็บไว้ใน AsyncStorage
            await AsyncStorage.removeItem('token');

            // นำผู้ใช้ไปยังหน้า Login
            // navigation.replace('Login'); // หรือ navigation.navigate('Login') ถ้าใช้แบบ Stack Navigator
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }], // นำไปที่หน้าจอ Login
                })
            );
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <StyledView className="flex-1 bg-gray-100">
            <Navbar navigation={navigation} />

            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>

                <StyledView className="">
                    <StyledText className="text-center text-blue-700 text-4xl font-bold mb-5">
                        Settings
                    </StyledText>

                    <StyledTouchableOpacity className="bg-blue-600 shadow-md py-3 px-8 rounded-full mb-4"
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <StyledText className="text-white text-xl font-semibold text-center">
                            โปรไฟล์
                        </StyledText>
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity
                        className=" items-center"
                        onPress={() => logout(navigation)}
                    >
                        <StyledText className="text-white bg-red-700 shadow-md text-lg font-bold p-4 rounded-full text-center">
                            ออกจากระบบ
                        </StyledText>
                    </StyledTouchableOpacity>

                </StyledView>
            </ScrollView>
        </StyledView>
    );
}

export default Setting;
