import { View, Text } from "react-native";
import { DateSwitcher } from "./DateSwitcher";
import { DailyStats } from "./DailyStats";
import { useAuth } from "../hooks/useAuth";

export function MealsListHeader() {
  const { user } = useAuth();

  return (
    <>
      <DateSwitcher />

      <View className="mt-2 flex-row gap-5">
        <DailyStats
          calories={{ current: 0, goal: user!.calories }}
          proteins={{ current: 0, goal: user!.proteins }}
          fats={{ current: 0, goal: user!.fats }}
          carbohydrates={{ current: 0, goal: user!.carbohydrates }}
        />
      </View>

      <View className="h-px bg-gray-200 mt-5" />

      <Text className="uppercase text-black-700 m-5 text-base font-sans-medium tracking-[1.28px]">
        Refeições
      </Text>
    </>
  );
}
