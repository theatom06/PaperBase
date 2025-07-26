import React from 'react';
import { Tabs } from 'expo-router';
import theme from '@/constants/Colors';
import Icons from '@expo/vector-icons/MaterialIcons';

type IconProps = {
  name: React.ComponentProps<typeof Icons>['name'];
  color?: string;
};

function Icon({ name, color = '#666' }: IconProps) {
  return <Icons name={name} size={26} color={color} style={{ marginBottom: -2 }} />;
}

export default function TabLayout() {
  const Colors = theme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.tint,
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.border,
          paddingBottom: 4,
          paddingTop: 2,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Icon name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="files"
        options={{
          title: 'Files',
          tabBarIcon: ({ color }) => <Icon name="folder" color={color} />,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Icon name="search" color={color} />,
        }}
      />

      <Tabs.Screen
        name="forum"
        options={{
          title: 'Forum',
          tabBarIcon: ({ color }) => <Icon name="forum" color={color} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Icon name="settings" color={color} />,
        }}
      />
    </Tabs>
  );
}
