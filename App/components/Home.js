import { View, Text, TouchableOpacity } from "react-native";
import { styled } from 'nativewind';
import React from 'react';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function Home({ navigation }) {

    return (
        <StyledTouchableOpacity 
            className="flex-1 bg-blue-700 items-center justify-center" 
            onPress={() => navigation.navigate('Login')}
        >
            <StyledText 
                className="text-center text-white text-4xl font-bold">
                Beginnig To C
            </StyledText>
            <StyledView className="pt-5 px-5">
                <StyledText className="text-center text-white text-lg">
                    Press to Start
                </StyledText>
            </StyledView>
        </StyledTouchableOpacity>
    )
}
