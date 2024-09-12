import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import Navbar from './NavbarUnit';
import axios from "axios";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Unit_1 = ({ navigation }) => {

    const [part, setPart] = useState([]);

    useEffect(() => {
        // ดึงข้อมูลจาก API
        axios.get("http://192.168.28.189:8000/partName") // แทนที่ "your-folder" ด้วยโฟลเดอร์ที่คุณวางไฟล์ PHP
            .then(response => {
                setPart(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the units!", error);
            });
    }, []);
    return (
        <StyledView className="flex-1 bg-gray-100">

            {/* Navbar ต้องแก้ในหน้านี้ */}
            <Navbar navigation={navigation} />

            <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}>

                {/* <StyledView className="flex-1 bg-white flex-col items-center mt-5 py-7 mx-3 rounded-3xl">
                    {part.map((part) => {
                        
                        if (part.PartID === 'P01') {
                            return (
                                <StyledText className="text-white text-xl font-bold text-center">
                                    {part.PartName}
                                </StyledText>);
                        } else {
                            
                            return (
                                <StyledTouchableOpacity
                                    key={part.PartID}
                                    className="bg-red-600 p-3 mb-4 w-3/4 rounded-full shadow-md"
                                    onPress={() => alert("Error: Invalid PartID")}
                                >
                                    <StyledText className="text-white text-xl font-bold text-center">
                                        Error: Invalid PartID
                                    </StyledText>
                                </StyledTouchableOpacity>
                            );
                        }
                    })}
                </StyledView> */}

                <StyledView className='bg-yellow-500 mb-2 w-3/4 rounded-full'>
                    <StyledText className="text-2xl font-bold text-white p-2 text-center">
                        ภาษา C คืออะไร ?
                    </StyledText>
                </StyledView>

                <StyledView className="mb-4 p-4 bg-yellow-100 rounded-3xl shadow-sm">

                    {/* คอยกำกับโดย useEffect ภายหลังเอา ** ต้องแก้! */}
                    <StyledText className="text-base text-gray-800">
                        C - Programming Language หรือ ภาษาซี
                        คือ ภาษาที่ใช้สำหรับพัฒนาโปรแกรมทั่วไป เพราะมีความ
                        ยืดหยุ่นสูง ออกแบบมาให้สามารถทำงานกับคำสั่งพื้น
                        ฐานของคอมพิวเตอร์ได้อย่างมีประสิทธิภาพ

                        ภาษาซีพัฒนาขึ้นระหว่าง ค.ศ. 1969 - 1973 โดย Dennis Rittchie ค่อย ๆ เป็นที่นิยมขึ้นจนเริ่มใช้กัน
                        อย่างแพร่หลาย จนกระทั้งปี ค.ศ.1989 มีการกำหนด
                        มาตรฐานของภาษาซีเรียกว่า “ANSI C” ขึ้น และใช้เป็น
                        มาตรฐานในการพัฒนาภาษาคอมพิวเตอร์รุ่นใหม่ ๆ ต่อไป
                    </StyledText>
                </StyledView>

                <StyledView className='bg-yellow-500 mb-2 w-10/12 rounded-full'>
                    <StyledText className="text-2xl font-bold text-white p-2 text-center">
                        ทำไมภาษา C ถึงสำคัญ
                    </StyledText>
                </StyledView>

                <StyledView className="mb-4 p-5 bg-yellow-100 rounded-3xl shadow-sm">

                    {/* คอยกำกับโดย useEffect ภายหลังเอา ** ต้องแก้! */}
                    <StyledText className="text-base text-gray-800">
                        • เป็นหนึ่งในภาษาโปรแกรมที่ได้รับความนิยมมากที่สุดในโลก
                    </StyledText>
                    <StyledText className="text-base text-gray-800">
                        • เป็นพื้นฐานไปสู่ภาษาโปรแกรมอื่นๆ เช่น Java , Python , C++ เป็นต้น
                    </StyledText>
                    <StyledText className="text-base text-gray-800">
                        • ภาษา C สามารถใช้ในการพัฒนาแอปพลิเคชั่น
                        และเทคโนโลยีต่างๆอีกมากมาย
                    </StyledText>

                </StyledView>

                <StyledView className="mb-4 p-4 bg-blue-100 rounded-lg shadow-sm">
                    <StyledText className="text-lg font-bold text-blue-700 mb-2">
                        ตัวอย่างโค้ด
                    </StyledText>

                    <StyledView className="bg-gray-200 p-4 rounded-lg mb-2">

                        {/* คอยกำกับโดย useEffect ภายหลังเอา ** ต้องแก้! */}
                        <StyledText className="text-base text-gray-800">
                            #include &lt;stdio.h&gt;{'\n'}
                            int main() {'{'}{'\n'}
                            {'  '}printf("Hello World!");{'\n'}
                            {'  '}return 0;{'\n'}
                            {'}'}
                        </StyledText>
                    </StyledView>

                    <StyledView className="bg-gray-100 p-4 rounded-lg">
                        <StyledText className="text-base text-gray-800">
                            ผลลัพธ์: Hello World!
                        </StyledText>
                    </StyledView>

                    <StyledTouchableOpacity className="mt-4 bg-blue-500 p-3 rounded-full items-center">
                        <StyledText className="text-white text-base font-bold">
                            ลองรัน
                        </StyledText>
                    </StyledTouchableOpacity>
                </StyledView>

                <StyledView className='bg-blue-500 mb-2 w-3/4 rounded-full'>
                    <StyledText className="text-2xl font-bold text-white p-2 text-center">
                        ขั้นตอนการทำงาน
                    </StyledText>
                </StyledView>

                <StyledView className="mb-4 p-4 bg-yellow-100 rounded-lg shadow-sm">

                    <StyledText className="text-base text-gray-800 mb-2">
                        1. Source code คือ เขียน C Code ขึ้นเพื่อสั่งงาน
                    </StyledText>
                    <StyledText className="text-base text-gray-800 mb-2">
                        2. Compile คือ นำ C Code มาแปลเป็นภาษาเครื่อง
                    </StyledText>
                    <StyledText className="text-base text-gray-800 mb-2">
                        3. Link คือ นำโค้ดโปรแกรมจากหลายๆ ไฟล์มารวมกัน
                    </StyledText>
                    <StyledText className="text-base text-gray-800">
                        4. Run คือ ประมวลผลโปรแกรมที่เขียน
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
