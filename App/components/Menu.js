import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { styled } from 'nativewind';
import Navbar from './NavbarMenu';
import axios from "axios";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Menu = ({ navigation }) => {

    const [Unit, setUnit] = useState([]);
    const [isLoading, setIsLoading] = useState()

    useEffect(() => {
        // fetch('https://192.168.0.149:8000/api/getUnitName')
        fetch('https://localhost: 8000/api/getUnitName')

            .then(res => res.json())
            .then((result) => {

                setUnit(result)
                console.log(result)

            })
    }, [])

    const renderItem = ({ Units }) => (
        <StyledView>
            <StyledText>{Unit.UnitName}</StyledText>
        </StyledView>
    )

    return (
        <StyledView className="flex-1 bg-white">
            <Navbar navigation={navigation} />
            <ScrollView>
                <StyledView>

                    <FlatList
                        data={Unit}
                        renderItem={renderItem}
                        keyExtractor={Unit => Unit.UnitID}
                    />
                </StyledView>

                <StyledView className="flex-1 ml-8 mt-5">
                    <StyledText className="text-black text-2xl font-bold text-blue-700">
                        บทเรียน
                    </StyledText>
                </StyledView>

                <StyledView className="flex-1 bg-white flex-col justify-center items-center mt-5 py-7 mx-3 rounded-3xl">

                    <FlatList
                        data={Unit}
                        renderItem={renderItem}
                        keyExtractor={Unit => Unit.UnitID}
                    />
                    {/* <StyledTouchableOpacity 
                        className="bg-blue-600 p-3 mb-4 w-3/4 rounded-full shadow-md"
                        onPress={() => navigation.navigate('dsds')}
                    >
                        <StyledText className="text-white text-xl font-bold text-center">
                            แบบทดสอบก่อนเรียน
                        </StyledText>
                    </StyledTouchableOpacity> */}

                    <StyledTouchableOpacity
                        className="bg-blue-600 p-3 mb-4 w-3/4 rounded-full shadow-md"
                        onPress={() => navigation.navigate('BasicToC')}
                    >
                        <StyledText className="text-white text-xl font-bold text-center">
                            ทำความรู้จักกับภาษา C
                        </StyledText>
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity
                        className="bg-blue-600 p-3 mb-4 w-3/4 rounded-full shadow-md"
                    // onPress={() => navigation.navigate('')}
                    >
                        <StyledText className="text-white text-xl font-bold text-center">
                            Syntax
                        </StyledText>
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity
                        className="bg-blue-600 p-3 mb-4 w-3/4 rounded-full shadow-md"
                    // onPress={() => navigation.navigate('')}
                    >
                        <StyledText className="text-white text-xl font-bold text-center">
                            Output
                        </StyledText>
                    </StyledTouchableOpacity>

                    <StyledTouchableOpacity
                        className="bg-blue-600 p-3 mb-4 w-3/4 rounded-full shadow-md"
                    // onPress={() => navigation.navigate('')}
                    >
                        <StyledText className="text-white text-xl font-bold text-center">
                            Comment
                        </StyledText>
                    </StyledTouchableOpacity>

                </StyledView>
            </ScrollView>
        </StyledView>
    );
};

export default Menu;
