import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import NavbarUnit_03 from './NavbarUnit_03';
import axios from "axios";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Unit_3 = ({ navigation }) => {
    const [parts, setParts] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            axios.get("http://192.168.0.149:8000/part")
                .then((response) => {
                    setParts(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the part!", error);
                });
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <StyledView className="flex-1 bg-gray-100">


            <NavbarUnit_03 navigation={navigation} />

            <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}>

                <StyledView className=' w-3/4 rounded-full'>
                    {parts
                        .filter((part) => part.PartID === 'P08')
                        .map((part) => (
                            <StyledText key={part.PartID} className="text-2xl font-bold text-black p-2 text-left">
                                {part.PartName}
                            </StyledText>
                        ))}
                </StyledView>

                <StyledView className="mb-4 p-4 bg-yellow-100 rounded-3xl shadow-sm">
                    {parts
                        .filter((part) => part.PartID === 'P08')
                        .map((part) => (
                            <StyledText key={part.PartID} className="text-base text-gray-800">
                                {part.ContentPart}
                            </StyledText>
                        ))}
                </StyledView>

                <StyledView className="mb-4 p-4 bg-blue-100 rounded-lg shadow-sm">
                    <StyledText className="text-lg font-bold text-blue-700 mb-2">
                        ตัวอย่างโค้ด
                    </StyledText>

                    <StyledView className="bg-gray-100 p-4 rounded-lg mb-2">
                        {parts
                            .filter((part) => part.PartID === 'P08')
                            .map((part) => (
                                <StyledText key={part.PartID} className="text-base text-gray-800">
                                    {part.RuncodeContent}
                                </StyledText>
                            ))}
                    </StyledView>
                </StyledView>

                <StyledView className="mb-4 p-4 bg-blue-100 rounded-lg shadow-sm">
                    <StyledText className="text-xl font-bold text-black mb-2">
                        ผลลัพธ์
                    </StyledText>

                    <StyledView className="bg-gray-100 p-4 rounded-lg mb-2">
                        {parts
                            .filter((part) => part.PartID === 'P08')
                            .map((part) => (
                                <StyledText key={part.PartID} className="text-base text-gray-800">
                                    {part.ResultRuncode}
                                </StyledText>
                            ))}
                    </StyledView>
                </StyledView>

                <StyledView className=' w-3/4 rounded-full'>
                    {parts
                        .filter((part) => part.PartID === 'P09')
                        .map((part) => (
                            <StyledText key={part.PartID} className="text-2xl font-bold text-black p-2 text-left">
                                {part.PartName}
                            </StyledText>
                        ))}
                </StyledView>

                <StyledView className="mb-4 p-4 bg-yellow-100 rounded-3xl shadow-sm">
                    <StyledView>{parts
                        .filter((part) => part.PartID === 'P09')
                        .map((part) => (
                            <StyledText key={part.PartID} className="text-base text-gray-800">
                                {part.ContentPart}
                            </StyledText>
                        ))}
                    </StyledView>

                    <StyledText className='text-xl font-bold text-black mb-2 mt-2'>
                        ตัวอย่าง
                    </StyledText>

                    <StyledView className="bg-gray-100 p-4 rounded-lg mb-2">

                        {parts
                            .filter((part) => part.PartID === 'P09')
                            .map((part) => (
                                <StyledText key={part.PartID} className="text-base text-gray-800">
                                    {part.Example}
                                </StyledText>
                            ))}
                    </StyledView>

                </StyledView>

                <StyledView className=' w-3/4 rounded-full'>
                    {parts
                        .filter((part) => part.PartID === 'P10')
                        .map((part) => (
                            <StyledText key={part.PartID} className="text-2xl font-bold text-black p-2 text-left">
                                {part.PartName}
                            </StyledText>
                        ))}
                </StyledView>

                <StyledView className="mb-4 p-4 bg-yellow-100 rounded-3xl shadow-sm">
                    <StyledView>{parts
                        .filter((part) => part.PartID === 'P10')
                        .map((part) => (
                            <StyledText key={part.PartID} className="text-base text-gray-800">
                                {part.ContentPart}
                            </StyledText>
                        ))}
                    </StyledView>

                    <StyledText className='text-xl font-bold text-black mb-2 mt-2'>
                        ตัวอย่าง
                    </StyledText>

                    <StyledView className="bg-gray-100 p-4 rounded-lg mb-2">

                        {parts
                            .filter((part) => part.PartID === 'P10')
                            .map((part) => (
                                <StyledText key={part.PartID} className="text-base text-gray-800">
                                    {part.Example}
                                </StyledText>
                            ))}
                    </StyledView>

                    <StyledText className='text-xl font-bold text-black mb-2 mt-2'>
                        ผลลัพธ์
                    </StyledText>

                    <StyledView className="bg-gray-100 p-4 rounded-lg mb-2">

                        {parts
                            .filter((part) => part.PartID === 'P10')
                            .map((part) => (
                                <StyledText key={part.PartID} className="text-base text-gray-800">
                                    {part.ResultRuncode}
                                </StyledText>
                            ))}
                    </StyledView>

                    <StyledTouchableOpacity className="mt-4  items-center">
                        <StyledText className="text-white bg-blue-500 text-lg font-bold p-3 rounded-full w-full text-center">
                            ลองรัน
                        </StyledText>
                    </StyledTouchableOpacity>

                </StyledView>

                <StyledView className="flex-row justify-end mt-3">

                    <StyledTouchableOpacity className="bg-blue-500 p-3 rounded-full w-2/5 items-center"
                        onPress={() => {
                            navigation.navigate('Unit_3_2');
                        }}
                    >
                        <StyledText className="text-white text-base font-bold">
                            บทต่อไป
                        </StyledText>
                    </StyledTouchableOpacity>
                </StyledView>

            </ScrollView>
        </StyledView>
    );
};

export default Unit_3;
