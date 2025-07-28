import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import "./styles/global.css";
import {
  HostGrotesk_400Regular,
  HostGrotesk_500Medium,
  HostGrotesk_600SemiBold,
  HostGrotesk_700Bold,
  useFonts,
} from "@expo-google-fonts/host-grotesk";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    HostGrotesk_400Regular,
    HostGrotesk_500Medium,
    HostGrotesk_600SemiBold,
    HostGrotesk_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View className="bg-lime-500 flex-1 items-center justify-center">
      <Text className="font-sans-semibold">
        Open App.tsx to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
