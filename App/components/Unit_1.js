import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import Navbar from './NavbarUnit';
import axios from "axios";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Unit_1 = ({ navigation }) => {

    const { PartID } = route.params; // รับ PartID จาก params
    const [partData, setPartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (PartID) {
            // ดึงข้อมูลจาก API โดยใช้ PartID
            axios.get(`http://your-server-url/part/${PartID}`)
                .then(response => {
                    setPartData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching part data: ", error);
                    setError("ไม่สามารถดึงข้อมูลได้");
                    setLoading(false);
                });
        }
    }, [PartID]);

    if (loading) {
        return <StyledView className="flex-1 justify-center items-center"><ActivityIndicator size="large" color="#0000ff" /></StyledView>;
    }

    if (error) {
        return <StyledView className="flex-1 justify-center items-center"><StyledText>{error}</StyledText></StyledView>;
    }

    return (
        <StyledView className="flex-1 bg-gray-100">
            <Navbar navigation={navigation} />

            <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}>
                <StyledView className='bg-yellow-500 mb-2 w-3/4 rounded-full'>
                    <StyledText className="text-2xl font-bold text-white p-2 text-center">
                        {partData?.PartName} {/* แสดงชื่อ Part */}
                    </StyledText>
                </StyledView>

                <StyledView className="mb-4 p-4 bg-yellow-100 rounded-3xl shadow-sm">
                    <StyledText className="text-base text-gray-800">
                        {partData?.Description} {/* แสดงรายละเอียด */}
                    </StyledText>
                </StyledView>

                {/* เพิ่มข้อมูลที่ต้องการแสดงจาก partData */}
                {/* สมมติว่า partData มีฟิลด์ที่เรียกว่า 'Importance', 'Examples', 'Steps' */}
                <StyledView className='bg-yellow-500 mb-2 w-10/12 rounded-full'>
                    <StyledText className="text-2xl font-bold text-white p-2 text-center">
                        ความสำคัญ
                    </StyledText>
                </StyledView>

                <StyledView className="mb-4 p-5 bg-yellow-100 rounded-3xl shadow-sm">
                    <StyledText className="text-base text-gray-800">
                        {partData?.Importance}
                    </StyledText>
                </StyledView>

                <StyledView className='bg-blue-500 mb-2 w-3/4 rounded-full'>
                    <StyledText className="text-2xl font-bold text-white p-2 text-center">
                        ตัวอย่าง
                    </StyledText>
                </StyledView>

                <StyledView className="mb-4 p-4 bg-blue-100 rounded-lg shadow-sm">
                    <StyledText className="text-base text-gray-800">
                        {partData?.Examples}
                    </StyledText>
                </StyledView>

                <StyledView className="flex-row justify-end mt-3">
                    <StyledTouchableOpacity className="bg-blue-500 p-3 rounded-full w-2/5 items-center"
                        onPress={() => {
                            navigation.navigate('Unit_2');
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

export default Unit_1;
