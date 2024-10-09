import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styled } from 'nativewind';
import Navbar from "./NavbarSetting";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Setting = ({ navigation }) => {
    return (
        <StyledView className="flex-1 bg-gray-100">
            <Navbar navigation={navigation} />

            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>

                <StyledView className="">
                    <StyledText className="text-center text-blue-700 text-4xl font-bold mb-5">
                        Settings
                    </StyledText>

                    <StyledTouchableOpacity className="bg-blue-500 py-3 px-8 rounded-full mb-4">                        
                        <StyledText className="text-white text-xl font-semibold text-center">
                            โปรไฟล์
                        </StyledText>
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity className="bg-red-500 py-3 px-8 rounded-full mb-4"
                        onPress={() => navigation.navigate('Login')}
                    >
                        <StyledText className="text-white text-xl font-semibold text-center">
                            ออกจากระบบ
                        </StyledText>
                    </StyledTouchableOpacity>
                    
                </StyledView>
            </ScrollView>
        </StyledView>
    );
}

export default Setting;
