import React from 'react';
import { View, Text, TouchableOpacity , Image } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const Navbar = ({ navigation = useNavigation() }) => {

  
  return (
    /// bg-กำหนดภายหลัง 
    <StyledView className="bg-blue-800 p-4 rounded-b-3xl flex-row justify-between pt-8">
      <StyledView></StyledView>

      <StyledText className="text-white text-3xl font-bold flex-col ml-3 justify-center items-center">
        Beginning To C
      </StyledText>

      <StyledTouchableOpacity onPress={() => navigation.navigate('Setting')} className={"pt-2"}>
          <StyledImage source={require('../Menu/assets/setting.png')} className="w-6 h-6"></StyledImage>
      </StyledTouchableOpacity>



    </StyledView>
  );
};

export default Navbar;
