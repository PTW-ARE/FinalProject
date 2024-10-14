import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import NavbarCompiler from '../Navbar/NavbarCompiler';
import axios from "axios";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const C_Part04 = ({ navigation }) => {

    const [output, setOutput] = useState(''); // เก็บผลลัพธ์ที่ได้จากการรันโค้ด
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

    const runCode = () => {
        axios.post('http://192.168.0.149:8000/compile', {
            code: parts.find(part => part.PartID === 'P04').RuncodeContent
        })
            .then(response => {
                setOutput(response.data.output); // เก็บผลลัพธ์ที่ได้ใน state
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    return (
        <StyledView className="flex-1 bg-gray-100">


            <NavbarCompiler navigation={navigation}></NavbarCompiler>

            <StyledView className="mt-5 mx-2 p-4 bg-stone-200 rounded-3xl shadow-sm">
                <StyledText className="text-lg font-bold text-black mb-2">
                    โค้ด
                </StyledText>


                <StyledView className="bg-white h-80 px-2 shadow-sm">
                    {parts
                        .filter((part) => part.PartID === 'P04')
                        .map((part) => (
                            <StyledText key={part.PartID} className="text-base text-gray-800">
                                {part.RuncodeContent}
                            </StyledText>
                        ))}

                </StyledView>

            </StyledView>

            <StyledTouchableOpacity className="mt-2 mb-2 items-center" onPress={runCode}>
                <StyledText className="text-white bg-blue-500 text-lg font-bold p-3 rounded-full w-28 text-center">
                    ลองรัน
                </StyledText>
            </StyledTouchableOpacity>

            <StyledView className="mt-1 mx-2 p-4 bg-stone-200 rounded-3xl shadow-sm">
                <StyledText className="text-lg font-bold text-black mb-2">
                    ผลลัพธ์
                </StyledText>

                <ScrollView>
                    <StyledView className="bg-white h-28 px-2 shadow-sm">

                        <StyledText>{output}</StyledText>

                    </StyledView>
                </ScrollView>
            </StyledView>

        </StyledView>
    );
};

export default C_Part04;
