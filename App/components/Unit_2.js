import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import Navbar from './NavbarUnit';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Unit_2 = ({ }) => {
    return (
        <StyledView className='flex-1 bg-white flex-col  items-center mt-5 py-7 mx-3 rounded-3xl'>
            <StyledText>Unit_2</StyledText>
        </StyledView>
    )
};

export default Unit_2;
