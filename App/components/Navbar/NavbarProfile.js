import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import axios from "axios";

const StyledView = styled(View);
const StyledText = styled(Text);

const NavbarProfile = ({ navigation = useNavigation() }) => {

  return (
    <StyledView className="bg-green-600 p-4 rounded-b-3xl flex-row justify-between pt-8">
      <StyledView></StyledView>
      <StyledView>
        
            <StyledText className="text-white text-3xl font-bold flex-col justify-center items-center">
              Profile
            </StyledText>
          
      </StyledView>
      <StyledView></StyledView>
    </StyledView>
  );
};

export default NavbarProfile;
