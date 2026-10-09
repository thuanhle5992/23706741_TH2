import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';

import {VARIANT} from '@constants/student';
import {COLORS} from '@constants/theme';
import {ShopStack} from '@navigation/ShopStack';
import CartScreen from '@screens/CartScreen';
import MeScreen from '@screens/MeScreen';
import {useCartStore} from '@stores/cartStore';

export type MainTabParamList = {
  Shop: undefined;
  Cart: undefined;
  Me: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  const items = useCartStore(state => state.items);

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const shopScreen = (
    <Tab.Screen
      key="Shop"
      name="Shop"
      component={ShopStack}
      options={{
        title: 'Cửa hàng',
        headerShown: false,
        tabBarIcon: ({color}) => (
          <Text style={{color, fontSize: 18}}>🏪</Text>
        ),
      }}
    />
  );

  const cartScreen = (
    <Tab.Screen
      key="Cart"
      name="Cart"
      component={CartScreen}
      options={{
        title: 'Giỏ',
        headerShown: false,
        tabBarBadge: totalQuantity > 0 ? totalQuantity : undefined,
        tabBarIcon: ({color}) => (
          <Text style={{color, fontSize: 18}}>🛒</Text>
        ),
      }}
    />
  );

  const meScreen = (
    <Tab.Screen
      key="Me"
      name="Me"
      component={MeScreen}
      options={{
        title: 'Tôi',
        headerShown: false,
        tabBarIcon: ({color}) => (
          <Text style={{color, fontSize: 18}}>👤</Text>
        ),
      }}
    />
  );

  // Thứ tự Tab theo VARIANT: shopFirst hoặc cartFirst
  const isCartFirst = VARIANT.tabOrder === 'cartFirst';

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
        },
      }}>
      {isCartFirst ? (
        <>
          {cartScreen}
          {shopScreen}
          {meScreen}
        </>
      ) : (
        <>
          {shopScreen}
          {cartScreen}
          {meScreen}
        </>
      )}
    </Tab.Navigator>
  );
}