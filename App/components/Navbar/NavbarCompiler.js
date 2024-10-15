import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Picker } from '@react-native-picker/picker';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const NavbarCompiler = ({ navigation = useNavigation() }) => {
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState('U06');
  const [dropdownVisible, setDropdownVisible] = useState(false);

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

  const handleUnitChange = (unitID) => {
    setSelectedUnit(unitID);
    setDropdownVisible(false); 
    navigation.navigate(unitID); 
  };

  return (
    <StyledView className="bg-red-700 p-4 rounded-b-3xl flex-row justify-between pt-8">
      <StyledView></StyledView>
      <StyledView>
        {units
          .filter((unit) => unit.UnitID === selectedUnit)
          .map((unit) => (
            <StyledText key={unit.UnitID} className="text-white text-2xl font-bold flex-col justify-center items-center">
              {unit.UnitName}
            </StyledText>
          ))}
      </StyledView>
      <StyledTouchableOpacity
        onPress={() => setDropdownVisible(!dropdownVisible)} 
        className={"pt-3"}
      >
        <StyledImage source={require('./asset/BergerMenu.png')} className="w-6 h-6" />
      </StyledTouchableOpacity>

      {/* Modal สำหรับ Dropdown */}
      <Modal
        transparent={true}
        visible={dropdownVisible}
        onRequestClose={() => setDropdownVisible(false)} 
      >
        <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
          <StyledView className="flex-1 justify-center items-center bg-transparent"> 
            <TouchableWithoutFeedback>
              <StyledView className="bg-white rounded-2xl p-3">
              <StyledText className="text-2xl font-bold text-center">เลือกบทเรียน</StyledText>
                <Picker
                  selectedValue={selectedUnit}
                  style={{ height: 150, width: 250 }}
                  onValueChange={(itemValue) => handleUnitChange(itemValue)}
                >
                  {units.map((unit) => (
                    <Picker.Item key={unit.UnitID} label={unit.UnitName} value={unit.UnitID} />
                  ))}
                </Picker>
                <StyledTouchableOpacity onPress={() => setDropdownVisible(false)} className="">
                  <StyledText className="text-white text-center bg-blue-500 rounded-lg p-2">ปิด</StyledText>
                </StyledTouchableOpacity>
              </StyledView>
            </TouchableWithoutFeedback>
          </StyledView>
        </TouchableWithoutFeedback>
      </Modal>
    </StyledView>
  );
};

export default NavbarCompiler;