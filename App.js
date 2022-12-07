import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, Text } from 'react-native-paper';

import { Login } from './src/components/screens/Login';
import { Register } from './src/components/screens/Register';
import { Password } from './src/components/screens/Password';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>

      <NavigationContainer>

        <Stack.Navigator screenOptions={{headerShown: false}}>          
          <Stack.Screen name='login' component={Login} />
          <Stack.Screen name='register' component={Register} />
          <Stack.Screen name='password' component={Password} />
        </Stack.Navigator>

      </NavigationContainer>

    </PaperProvider>
  );
}
