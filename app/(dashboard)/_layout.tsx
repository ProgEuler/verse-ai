import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import CustomDrawerContent from '@/components/CustomDrawerContent';
import colors from '@/constants/colors';

export default function DashboardLayout() {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  return (
    <Drawer
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.dark.cardBackground,
        },
        headerTintColor: colors.dark.text,
        drawerStyle: {
          backgroundColor: colors.dark.sidebarBackground,
          width: isLargeScreen ? 280 : 280,
        },
        overlayColor: 'rgba(0,0,0,0.5)',
        drawerType: isLargeScreen ? 'permanent' : 'front',
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: 'Dashboard',
          title: 'Dashboard',
        }}
      />
      <Drawer.Screen
        name="ai-assistant"
        options={{
          drawerLabel: 'AI Assistant',
          title: 'AI Assistant',
        }}
      />
      <Drawer.Screen
        name="knowledge-base"
        options={{
          drawerLabel: 'Knowledge Base',
          title: 'Knowledge Base',
        }}
      />
      <Drawer.Screen
        name="integrations"
        options={{
          drawerLabel: 'Integrations',
          title: 'Integrations',
        }}
      />
      <Drawer.Screen
        name="appointments"
        options={{
          drawerLabel: 'Appointments',
          title: 'Appointments',
        }}
      />
      <Drawer.Screen
        name="analytics"
        options={{
          drawerLabel: 'Analytics',
          title: 'Analytics',
        }}
      />
      <Drawer.Screen
        name="chat-history"
        options={{
          drawerLabel: 'Chat History',
          title: 'Chat History',
        }}
      />
      <Drawer.Screen
        name="support"
        options={{
          drawerLabel: 'Support',
          title: 'Support',
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          title: 'Settings',
        }}
      />
    </Drawer>
  );
}
