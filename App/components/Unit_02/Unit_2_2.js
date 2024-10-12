import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import NavbarUnit_02 from './NavbarUnit_02';
import axios from "axios";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Unit_2 = ({ navigation }) => {
    const [parts, setParts] = useState([]);

    useEffect(() => {
        // ดึงข้อมูลจาก API
        axios.get("http://192.168.0.149:8000/part")
            .then((response) => {
                setParts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the part!", error);
            });
    }, []);

    return (
        <StyledView className="flex-1 bg-gray-100">


            <NavbarUnit_02 navigation={navigation} />

            <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}>

                <StyledView className='rounded-full'>
                {parts
                    .filter((part) => part.PartID === 'P05')
                    .map((part) => (
                    <StyledText key={part.PartID} className="text-2xl font-bold text-black p-2 text-left">
                        {part.PartName}
                    </StyledText>
                    ))}
                </StyledView>
                
                <StyledView className="mb-4 p-4 bg-yellow-100 rounded-3xl shadow-sm">
                {parts
                    .filter((part) => part.PartID === 'P05')
                    .map((part) => (
                    <StyledText key={part.PartID} className="text-base text-gray-800">
                        {part.ContentPart}
                    </StyledText>
                    ))}
                </StyledView>

                <StyledView className='rounded-full'>
                {parts
                    .filter((part) => part.PartID === 'P06')
                    .map((part) => (
                    <StyledText key={part.PartID} className="text-2xl font-bold text-black p-2 text-left">
                        {part.PartName}
                    </StyledText>
                    ))}
                </StyledView>

                <StyledView className="mb-4 p-4 bg-yellow-100 rounded-3xl shadow-sm">
                {parts
                    .filter((part) => part.PartID === 'P06')
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
                    .filter((part) => part.PartID === 'P06')
                    .map((part) => (
                        <StyledText key={part.PartID} className="text-base text-gray-800">
                            {part.RuncodeContent}
                        </StyledText>
                        ))}
                    </StyledView>

                    <StyledTouchableOpacity className="mt-4 bg-blue-500 p-3 rounded-full items-center">
                        <StyledText className="text-white text-base font-bold">
                            ลองรัน
                        </StyledText>
                    </StyledTouchableOpacity>
                    
                </StyledView>
                
                <StyledView className="mb-4 p-4 bg-yellow-100 rounded-3xl shadow-sm">
                {parts
                    .filter((part) => part.PartID === 'P07')
                    .map((part) => (
                    <StyledText key={part.PartID} className="text-base text-gray-800">
                        {part.ContentPart}
                    </StyledText>
                    ))}
                </StyledView>

                <StyledView className="mb-4 p-4 bg-blue-100 rounded-lg shadow-sm">
                    <StyledText className="text-xl font-bold text-black mb-2">
                        ผลลัพธ์
                    </StyledText>

                    <StyledView className="bg-gray-100 p-4 rounded-lg mb-2">
                    {parts
                    .filter((part) => part.PartID === 'P06')
                    .map((part) => (
                        <StyledText key={part.PartID} className="text-base text-gray-800">
                            {part.ResultRuncode}
                        </StyledText>
                        ))}
                    </StyledView>
                </StyledView>
                
                <StyledView className="flex-row justify-end mt-3">

                    <StyledTouchableOpacity className="bg-blue-500 p-3 rounded-full w-2/5 items-center"
                        onPress={() => {
                            navigation.navigate('Unit_3');
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

export default Unit_2;
