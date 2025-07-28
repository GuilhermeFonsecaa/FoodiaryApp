import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./styles/global.css"

export default function App() {
  return (
    <View className='bg-lime-500 flex-1 items-center justify-center'>
      <Text className='text-base'>Open App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

