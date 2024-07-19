import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Activities from './Screens/Activities';
import ActivityForm from './Screens/ActivityForm';
import Diet from './Screens/Diet';
import Setting from './Screens/Setting';
import {Ionicons, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let IconComponent;
        let iName;
        if (route.name === 'Activities') {
          IconComponent = FontAwesome5;
          iName = "running";
        } else if (route.name === 'Diet') {
          IconComponent = MaterialCommunityIcons;
          iName = 'food'; 
        } else if (route.name === 'Setting'){
          IconComponent = Ionicons;
          iName = "settings";
        }
        return <IconComponent  name={iName} size={size} color={color} />;
      },
    })}>
      <Tab.Screen name="Activities" component={Activities} />
      <Tab.Screen name="Diet" component={Diet} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MyTabs} options={{ headerShown: false }}/>
        <Stack.Screen name="Activities" component={Activities}/>
        <Stack.Screen name="Diet" component={Diet}/>
        <Stack.Screen name="ActivityForm" component={ActivityForm} options={{ title: 'Add Activity' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
