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
import { HomeHeader } from "./components/HomeHeader";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DateSwitcher } from "./components/DateSwitcher";
import { DailyStats } from "./components/DailyStats";
import { MealsList } from "./components/MealsList";

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
        <HomeHeader />
        <DateSwitcher />
        <View className="mt-2">
          <DailyStats
            calories={{ current: 1500, goal: 2500 }}
            proteins={{ current: 1500, goal: 2500 }}
            fats={{ current: 1500, goal: 2500 }}
            carbohydrates={{ current: 1500, goal: 2500 }}
          />
        </View>
        <View className="h-px bg-gray-200 mt-5"/>
        <MealsList/>
      </SafeAreaProvider>
    </View>
  );
}
