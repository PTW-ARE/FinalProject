import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import axios from "axios";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const BergerNav = ({ navigation = useNavigation() }) => {


    const [units, setUnits] = useState([]);

    useEffect(() => {
        // ดึงข้อมูลจาก API
        axios.get("http://192.168.0.149:8000/units")
            .then((response) => {
                setUnits(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the units!", error);
            });
    }, []);

    return (
        <StyledView className="bg-blue-700 p-4 rounded-b-3xl flex-row justify-between pt-8">

            

        </StyledView>
    );
};

export default BergerNav;
