import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Game from './components/Game';
import MultiPlayerGame from './components/MultiPlayerGame';

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="singlePlayer" component={Game} options={{
          title: 'SinglePlayer', tabBarIcon: ({ color, size }) => {
            return <MaterialCommunityIcons name="grid" color={color} size={size} />
          }
        }}></Tab.Screen>
        <Tab.Screen name="multiPlayer" component={MultiPlayerGame} options={{
          title: 'MultiPlayer', tabBarIcon: ({ color, size }) => {
            return <MaterialCommunityIcons name="earth" color={color} size={size} />
          }
        }}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}