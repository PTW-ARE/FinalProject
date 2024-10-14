import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const Navbar = ({ navigation = useNavigation() }) => {

    return (
        /// bg-กำหนดภายหลัง 
        <StyledView className="bg-red-700 p-4 rounded-b-3xl flex-row justify-between pt-8">

            {/* <StyledTouchableOpacity onPress={() => navigation.navigate('Menu')} className={"pt-3"}>
          <StyledImage source={require('../assets/BergerMenu.png')} className="w-5 h-5"></StyledImage>
      </StyledTouchableOpacity> */}

            <StyledView></StyledView>

            <StyledText className="text-white text-2xl font-bold flex-col justify-center items-center">
                Beginning To C
            </StyledText>

            {/* <StyledTouchableOpacity onPress={() => navigation.navigate('Setting')} className={"pt-2"}>
          <StyledImage source={require('../assets/setting.png')} className="w-6 h-6"></StyledImage>
      </StyledTouchableOpacity> */}

            <StyledView></StyledView>

        </StyledView>
    );
};

export default Navbar;
