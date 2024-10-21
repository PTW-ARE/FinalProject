import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Icon from 'react-native-vector-icons/MaterialIcons';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const NavbarPostTest = ({ navigation = useNavigation() }) => {
  const [units, setUnits] = useState([]);
  const [selectedUnit] = useState('U07');

  useEffect(() => {
    // ดึงข้อมูลจาก API
    axios.get("http://192.168.28.189:8000/units")
      .then((response) => {
        setUnits(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the units!", error);
      });
  }, []);

  const handleExit = () => {
    // แสดงการยืนยัน
    Alert.alert(
      "คำเตือน",
      "ออกจากการทำแบบทดสอบหรือไม่",
      [
        {
          text: "ยกเลิก",
          style: "cancel"
        },
        {
          text: "ตกลง",
          onPress: () => {

            navigation.navigate('U07');
          }
        }
      ]
    );
  };

  return (
    <StyledView className="bg-green-800 p-4 rounded-b-3xl flex-row justify-between pt-8">

      <StyledView>

      </StyledView>

      <StyledView>
        {units
          .filter((unit) => unit.UnitID === selectedUnit)
          .map((unit) => (
            <StyledText key={unit.UnitID} className="text-white text-3xl ml-5 font-bold flex-col justify-center items-center">
              {unit.UnitName}
            </StyledText>
          ))}
      </StyledView>

      <StyledView>
        <StyledTouchableOpacity className='pt-2'
          onPress={() => {
            handleExit()
          }}>

          <Icon name="exit-to-app" size={30} color="#f8fafc" />

        </StyledTouchableOpacity>
      </StyledView>

    </StyledView>
  );
};

export default NavbarPostTest;
