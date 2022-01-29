import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Game from './components/Game';
import Menu from './components/Menu';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="menu" component={Menu} options={{ title: 'Menu' }}></Stack.Screen>
        <Stack.Screen name="singlePlayer" component={Game} options={{ title: 'SinglePlayer' }}></Stack.Screen>
        <Stack.Screen name="multiPlayer" component={Game} options={{ title: 'MultiPlayer' }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}