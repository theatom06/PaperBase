import React from 'react';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import Icons from '@expo/vector-icons/MaterialIcons';

type IconProps = {
  name: React.ComponentProps<typeof Icons>['name'];
  color?: string;
};

function Icon({ name, color = '#666' }: IconProps) {
  return <Icons name={name} size={32} color={color} />;
}

export default function TabLayout() {

  return (
    <Tabs
      
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.tint,
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          borderColor: Colors.border,
          padding: 16,
          margin: 8,
          marginTop: 4,
          height: 64,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
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
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Icon name="settings" color={color} />,
        }}
      />
    </Tabs>
  );
}
