import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const Navbar = ({ navigation = useNavigation() }) => {

    const handleExit = () => {
        navigation.navigate('Menu');
    };

    return (

        <StyledView className="bg-blue-800 p-4 rounded-b-3xl flex-row justify-between pt-8">


            <StyledView>
                <StyledTouchableOpacity className='pt-2'
                    onPress={() => {
                        handleExit()
                    }}>

                    <Icon name="home" size={25} color="#f8fafc" />

                </StyledTouchableOpacity>
            </StyledView>
            <StyledView>
                <StyledText className="text-white text-3xl mr-9 font-bold flex-col justify-center items-center">
                    Setting
                </StyledText>
            </StyledView>

            <StyledView></StyledView>

        </StyledView>
    );
};

export default Navbar;
