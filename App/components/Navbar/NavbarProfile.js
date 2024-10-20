import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const NavbarProfile = ({ navigation = useNavigation() }) => {

  const handleExit = () => {
    navigation.navigate('Setting');
  };

  return (
    <StyledView className="bg-blue-800 p-4 rounded-b-3xl flex-row justify-between pt-8">
      <StyledView>
        <StyledTouchableOpacity className='pt-2'
          onPress={() => {
            handleExit()
          }}>

          <Icon name="arrow-back" size={25} color="#f8fafc" />

        </StyledTouchableOpacity>
      </StyledView>
      <StyledView>

        <StyledText className="text-white text-3xl font-bold flex-col mr-7 justify-center items-center">
          Profile
        </StyledText>

      </StyledView>
      <StyledView></StyledView>
    </StyledView>
  );
};

export default NavbarProfile;
