import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '@screens/LoginScreen';
import MainTabs from '@navigation/MainTabs';
import {useAuthStore} from '@stores/authStore';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const isLoggedIn = useAuthStore(
    state => state.isLoggedIn,
  );

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!isLoggedIn ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
      ) : (
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
        />
      )}
    </Stack.Navigator>
  );
}