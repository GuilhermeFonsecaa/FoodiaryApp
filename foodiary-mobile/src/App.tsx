import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import "./styles/global.css";
import {
  HostGrotesk_400Regular,
  HostGrotesk_500Medium,
  HostGrotesk_600SemiBold,
  HostGrotesk_700Bold,
  useFonts,
} from "@expo-google-fonts/host-grotesk";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Home } from "./screens/Home";

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
    <View className="bg-white flex-1">
      <SafeAreaProvider>
        <Home />
      </SafeAreaProvider>
    </View>
  );
}
