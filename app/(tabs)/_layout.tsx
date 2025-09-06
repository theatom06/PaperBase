import React from 'react';
import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
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
        tabBarInactiveTintColor: '#333',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderColor: Colors.border,
          borderWidth: 1,
          elevation: 0,
          margin: 4,
          borderRadius: 16,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: 32,
        },

        tabBarBackground: () => (
          <BlurView
            intensity={100}
            tint="light" 
            style={{ flex: 1 }}
          />
        ),

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
111
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
