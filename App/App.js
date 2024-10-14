import { View, Text, Image, Button, Alert, ScrollView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./components/HOME/Home";
import Menu from "./components/Menu/Menu";
import Login from './components/Login&Register/Login';
import Register from './components/Login&Register/Register';
import Setting from './components/Setting/Setting';
import Unit_1 from './components/Unit_01/Unit_1';
import Unit_2 from './components/Unit_02/Unit_2';
import Unit_2_2 from './components/Unit_02/Unit_2_2';
import Unit_3 from './components/Unit_03/Unit_3';
import Unit_3_2 from './components/Unit_03/Unit_3_2';
import Unit_4 from './components/Unit_04/Unit_4';
import Unit_5 from './components/Unit_05/Unit_5';
import Unit_5_2 from './components/Unit_05/Unit_5_2';
import Unit_5_3 from './components/Unit_05/Unit_5_3';
import Unit_5_4 from './components/Unit_05/Unit_5_4';
import C_Compiler from './components/Simulate_C/C_Compiler';
import NavbarCompiler from './components/Navbar/NavbarCompiler';
import C_Part02 from './components/Simulate_C/C_Part02';
import C_Part04 from './components/Simulate_C/C_Part04';
import C_Part06 from './components/Simulate_C/C_Part06';
import C_Part10 from './components/Simulate_C/C_Part10';
import C_Part11 from './components/Simulate_C/C_Part11';
import C_Part13 from './components/Simulate_C/C_Part13';
import C_Part14 from './components/Simulate_C/C_Part14';
import C_Part17 from './components/Simulate_C/C_Part17';
import C_Part19 from './components/Simulate_C/C_Part19';
import C_Part21 from './components/Simulate_C/C_Part21';
import C_Part23 from './components/Simulate_C/C_Part23';
import C_Part24 from './components/Simulate_C/C_Part24';



const Stack = createNativeStackNavigator();

export default function App() {
  return (

    //<Menu></Menu>
    //<Home></Home>
    //<Login></Login>
    //<Unit1></Unit1>
    // <Navbar></Navbar>
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="U01">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
        <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
        <Stack.Screen name="C_Part02" component={C_Part02} options={{ headerShown: false }} />
        <Stack.Screen name="C_Part04" component={C_Part04} options={{ headerShown: false }} />
        <Stack.Screen name="C_Part06" component={C_Part06} options={{ headerShown: false }} />
        <Stack.Screen name="C_Part10" component={C_Part10} options={{ headerShown: false }} />
        <Stack.Screen name="C_Part11" component={C_Part11} options={{ headerShown: false }} />
        <Stack.Screen name="C_Part13" component={C_Part13} options={{ headerShown: false }} />
        <Stack.Screen name="C_Part14" component={C_Part14} options={{ headerShown: false }} />
        <Stack.Screen name="C_Part17" component={C_Part17} options={{ headerShown: false }} />
        <Stack.Screen name="C_Part19" component={C_Part19} options={{ headerShown: false }} />
        <Stack.Screen name="C_Part21" component={C_Part21} options={{ headerShown: false }} />
        <Stack.Screen name="C_Part23" component={C_Part23} options={{ headerShown: false }} />
        <Stack.Screen name="C_Part24" component={C_Part24} options={{ headerShown: false }} />


        <Stack.Screen name="U01" component={Unit_1} options={{ headerShown: false }} />
        <Stack.Screen name="U02" component={Unit_2} options={{ headerShown: false }} />
        <Stack.Screen name="U02_2" component={Unit_2_2} options={{ headerShown: false }} />
        <Stack.Screen name="U03" component={Unit_3} options={{ headerShown: false }} />
        <Stack.Screen name="U03_2" component={Unit_3_2} options={{ headerShown: false }} />
        <Stack.Screen name="U04" component={Unit_4} options={{ headerShown: false }} />
        <Stack.Screen name="U05" component={Unit_5} options={{ headerShown: false }} />
        <Stack.Screen name="U05_2" component={Unit_5_2} options={{ headerShown: false }} />
        <Stack.Screen name="U05_3" component={Unit_5_3} options={{ headerShown: false }} />
        <Stack.Screen name="U05_4" component={Unit_5_4} options={{ headerShown: false }} />
        <Stack.Screen name="U06" component={C_Compiler} options={{ headerShown: false }} />


        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        
        <Stack.Screen name="NavbarCompiler" component={NavbarCompiler} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}