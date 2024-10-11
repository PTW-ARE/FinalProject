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
import BergerNav from './components/Unit_01/BergerNav';
import NavbarUnit_01 from './components/Unit_01/BergerNav';
import Unit_3 from './components/Unit_03/Unit_3';
import Unit_3_2 from './components/Unit_03/Unit_3_2';
import Unit_4 from './components/Unit_04/Unit_4';
import Unit_5 from './components/Unit_05/Unit_5';


const Stack = createNativeStackNavigator();

export default function App() {
  return (

    //<Menu></Menu>
    //<Home></Home>
    //<Login></Login>
    //<Unit1></Unit1>
    // <Navbar></Navbar>
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Unit_5">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
        <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
        <Stack.Screen name="Unit_1" component={Unit_1} options={{ headerShown: false }} />
        <Stack.Screen name="Unit_2" component={Unit_2} options={{ headerShown: false }} />
        <Stack.Screen name="Unit_2_2" component={Unit_2_2} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="BergerNav" component={BergerNav} options={{ headerShown: false }} />
        <Stack.Screen name="NavbarUnit_01" component={NavbarUnit_01} options={{ headerShown: false }} />
        <Stack.Screen name="Unit_3" component={Unit_3} options={{ headerShown: false }} />
        <Stack.Screen name="Unit_3_2" component={Unit_3_2} options={{ headerShown: false }} />
        <Stack.Screen name="Unit_4" component={Unit_4} options={{ headerShown: false }} />
        <Stack.Screen name="Unit_5" component={Unit_5} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}