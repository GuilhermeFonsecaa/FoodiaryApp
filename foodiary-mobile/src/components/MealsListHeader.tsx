import { View, Text } from "react-native";
import { DateSwitcher } from "./DateSwitcher";
import { DailyStats } from "./DailyStats";

export function MealsListHeader() {
  return (
    <>
      <DateSwitcher />

      <View className="mt-2 flex-row gap-5">
        <DailyStats
          calories={{ current: 1200, goal: 2500 }}
          proteins={{ current: 1700, goal: 2500 }}
          fats={{ current: 1000, goal: 2500 }}
          carbohydrates={{ current: 900, goal: 2500 }}
        />
      </View>

      <View className="h-px bg-gray-200 mt-5" />

      <Text className="uppercase text-black-700 m-5 text-base font-sans-medium tracking-[1.28px]">
        Refeições
      </Text>
    </>
  );
}
