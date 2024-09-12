import { View, Text, Image, Button, Alert, ScrollView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./components/Home";
import Menu from "./components/Menu";
import Login from './components/Login';
import Setting from './components/Setting';

import BasicToC from './components/Unit_1';
import Register from './components/Register';
import Navbar from './components/NavbarMenu';
import Unit_1 from './components/Unit_1';
import Unit_2 from './components/Unit_2';


const Stack = createNativeStackNavigator();

export default function App() {
  return (

    //<Menu></Menu>
    //<Home></Home>
    //<Login></Login>
    //<Unit1></Unit1>
    // <Navbar></Navbar>
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
        <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
        <Stack.Screen name="Unit_1" component={Unit_1} options={{ headerShown: false }} />
        <Stack.Screen name="Unit_2" component={Unit_2} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}