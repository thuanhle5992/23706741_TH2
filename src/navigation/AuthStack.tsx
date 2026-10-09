import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthStack from '@navigation/AuthStack';
import MainTabs from '@navigation/MainTabs';
import {useAuthStore} from '@stores/authStore';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const isLoggedIn = useAuthStore(
    state => state.isLoggedIn,
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!isLoggedIn ? (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
        />
      ) : (
        <Stack.Screen
          name="Main"
          component={MainTabs}
        />
      )}
    </Stack.Navigator>
  );
}