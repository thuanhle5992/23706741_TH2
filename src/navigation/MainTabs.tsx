import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ShopStack from '@navigation/ShopStack';
import CartScreen from '@screens/CartScreen';
import MeScreen from '@screens/MeScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Shop"
        component={ShopStack}
        options={{
          title: 'Cửa hàng',
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Giỏ',
        }}
      />

      <Tab.Screen
        name="Me"
        component={MeScreen}
        options={{
          title: 'Tôi',
        }}
      />
    </Tab.Navigator>
  );
}