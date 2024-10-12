import { View, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { styled } from 'nativewind';
import Navbar from './NavbarMenu';
import axios from "axios";
import React, { useEffect, useState } from "react";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Menu = ({ navigation }) => {

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
        <StyledView className="flex-1 bg-white flex-col">
            <Navbar navigation={navigation} />

            <StyledView className="ml-8 mt-10 mb-1">
                <StyledText className="text-black text-2xl font-bold text-blue-700">
                    บทเรียน
                </StyledText>
            </StyledView>

            <StyledText></StyledText>

            <StyledView className="flex-1 bg-white flex-col  items-center mt-1 py-7 mx-3 rounded-3xl">
                {units.map((unit) => (
                    <StyledTouchableOpacity
                        key={unit.UnitID}
                        className="bg-blue-600 p-3 mb-4 w-3/4 rounded-full shadow-md"
                        onPress={() => {
                            if (unit.UnitID === 'U01') {
                                navigation.navigate('Unit_1');
                            } else if (unit.UnitID === 'U02') {
                                navigation.navigate('Unit_2');
                            } else if (unit.UnitID === 'U03') {
                                navigation.navigate('');
                            } else if (unit.UnitID === 'U04') {
                                navigation.navigate('');
                            } else if (unit.UnitID === 'U05') {
                                navigation.navigate('');
                            } else {
                                navigation.navigate('Unit_Default', { unitId: unit.UnitID });
                            }
                        }}
                    >
                        <StyledText className="text-white text-xl font-bold text-center">
                            {unit.UnitName}
                        </StyledText>
                    </StyledTouchableOpacity>
                ))}
            </StyledView>

        </StyledView>
    );
};

export default Menu;
