import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import axios from "axios";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const NavbarUnit_01 = ({ navigation = useNavigation() }) => {


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
    /// bg-กำหนดภายหลัง 
    <StyledView className="bg-blue-700 p-4 rounded-b-3xl flex-row justify-between pt-8">

      <StyledView></StyledView>
      <StyledView>
        {units
          .filter((unit) => unit.UnitID === 'U01')
          .map((unit) => (
            <StyledText key={unit.UnitID} className="text-white text-2xl font-bold flex-col justify-center items-center">
              {unit.UnitName}
            </StyledText>
          ))}
      </StyledView>
      <StyledTouchableOpacity onPress={() => navigation.navigate('Menu')} className={"pt-3"}>
        <StyledImage source={require('../Unit_01/asset/BergerMenu.png')} className="w-5 h-5"></StyledImage>
      </StyledTouchableOpacity>


    </StyledView>
  );
};

export default NavbarUnit_01;
