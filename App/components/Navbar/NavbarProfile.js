import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import axios from "axios";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const NavbarProfile = ({ navigation = useNavigation() }) => {

  const handleExit = () => {
    navigation.navigate('Setting');
  };

  return (
    <StyledView className="bg-blue-600 p-4 rounded-b-3xl flex-row justify-between pt-8">
      <StyledView>
        <StyledTouchableOpacity
          onPress={() => {
            handleExit()
          }}>
          <StyledText className='text-white text-base pt-2'>
            ย้อนกลับ
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
      <StyledView>
        
            <StyledText className="text-white text-3xl font-bold flex-col mr-16 justify-center items-center">
              Profile
            </StyledText>
          
      </StyledView>
      <StyledView></StyledView>
    </StyledView>
  );
};

export default NavbarProfile;
