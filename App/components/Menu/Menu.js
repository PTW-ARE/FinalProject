import { View, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { styled } from 'nativewind';
import Navbar from '../Navbar/NavbarMenu';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from 'react-native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Menu = ({ navigation }) => {

    const [units, setUnits] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            axios.get("http://192.168.28.189:8000/units")
                .then((response) => {
                    setUnits(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the units!", error);
                });
        });

        // Cleanup listener เมื่อ component ถูก unmount
        return unsubscribe;
    }, [navigation]);


    return (
        <SafeAreaView key={units.length} className="flex-auto  bg-white flex-col">
            <Navbar navigation={navigation} />

            <StyledView className="ml-8 mt-10 mb-1">
                <StyledText className="text-2xl font-bold text-blue-700">
                    บทเรียน
                </StyledText>
            </StyledView>

            <StyledView className="bg-white mx-auto w-auto rounded-2xl drop-shadow-md m-2 p-8 ">
                {units.length > 0 ? (
                    units.map((unit) => (
                        <StyledTouchableOpacity className="bg-rose-700 p-3 mb-4 w-56 rounded-full shadow-md mx-auto"
                            key={unit.UnitID}
                            onPress={() => {
                                if (unit.UnitID === 'U01') {
                                    navigation.navigate('U01');
                                } else if (unit.UnitID === 'U02') {
                                    navigation.navigate('U02');
                                } else if (unit.UnitID === 'U03') {
                                    navigation.navigate('U03');
                                } else if (unit.UnitID === 'U04') {
                                    navigation.navigate('U04');
                                } else if (unit.UnitID === 'U05') {
                                    navigation.navigate('U05');
                                } else if (unit.UnitID === 'U06') {
                                    navigation.navigate('U06');
                                } else if (unit.UnitID === 'U07') {
                                    navigation.navigate('U07');
                                } else {
                                    navigation.navigate('Unit_Default', { unitId: unit.UnitID });
                                }
                            }}
                        >
                            <StyledText className="text-white text-xl text-sm font-bold text-center ">
                                {unit.UnitName}
                            </StyledText>
                        </StyledTouchableOpacity>
                    ))

                ) : (
                    <StyledText>Loading...</StyledText>
                )}

            </StyledView>

        </SafeAreaView>
    );
};

export default Menu;
