import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import axios from "axios";

const StyledView = styled(View);
const StyledText = styled(Text);

const NavbarPostTest = ({ navigation = useNavigation() }) => {
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState('U07');

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
    <StyledView className="bg-green-600 p-4 rounded-b-3xl flex-row justify-between pt-8">
      <StyledView></StyledView>
      <StyledView>
        {units
          .filter((unit) => unit.UnitID === selectedUnit)
          .map((unit) => (
            <StyledText key={unit.UnitID} className="text-white text-3xl font-bold flex-col justify-center items-center">
              {unit.UnitName}
            </StyledText>
          ))}
      </StyledView>
      <StyledView></StyledView>
    </StyledView>
  );
};

export default NavbarPostTest;
