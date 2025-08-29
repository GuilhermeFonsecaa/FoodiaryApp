import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../../services/httpClient";
import { Logo } from "../../../components/Logo";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { useAuth } from "../../../hooks/useAuth";
import { useMemo } from "react";
import { MacrosBar } from "../../../components/MacrosBar";

type Meal = {
  id: string;
  createdAt: string;
  icon: string;
  name: string;
  status: "uploading" | "processing" | "success" | "failed";
  foods: {
    name: string;
    quantity: string;
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
  }[];
};

export default function MealDetails() {
  const { mealId } = useLocalSearchParams();
  const { user } = useAuth();

  const { data: meal, isFetching } = useQuery<Meal>({
    queryKey: ["meal", mealId],
    queryFn: async () => {
      const { data } = await httpClient.get(`/meals/${mealId}`);
      return data.meal as Meal;
    },
    refetchInterval: (query) => {
      if (query.state.data?.status === "success") return false;
      return 2000;
    },
  });

  const totals = useMemo(() => {
    let calories = 0;
    let proteins = 0;
    let carbohydrates = 0;
    let fats = 0;

    if (meal?.foods) {
      for (const food of meal.foods) {
        calories += food.calories;
        proteins += food.proteins;
        carbohydrates += food.carbohydrates;
        fats += food.fats;
      }
    }

    return { calories, proteins, carbohydrates, fats };
  }, [meal]);

  if (isFetching || meal?.status !== "success") {
    return (
      <View className="bg-lime-700 flex-1 items-center justify-center gap-12">
        <Logo width={187} height={60} />
        <ActivityIndicator color="#fff" />
      </View>
    );
  }

  const caloriesPercentage = (totals.calories / user!.calories) * 100;

  const carbsPercent = user!.carbohydrates > 0
    ? ((totals.carbohydrates / user!.carbohydrates) * 100).toFixed(1)
    : "0.0";

  const proteinsPercent = user!.proteins > 0
    ? ((totals.proteins / user!.proteins) * 100).toFixed(1)
    : "0.0";

  const fatsPercent = user!.fats > 0
    ? ((totals.fats / user!.fats) * 100).toFixed(1)
    : "0.0";

  return (
    <View className="w-full h-full">
      {/*Header*/}
      <View className="bg-[#18181B] h-[115px] py-1.5 w-full px-4">
        <SafeAreaView className="flex-row items-center w-full justify-between">
          <View className="items-center flex-row">
            <TouchableOpacity
              className="size-12 items-center flex-row"
              onPress={router.back}
            >
              <ChevronLeft size={30} color={"white"} />
            </TouchableOpacity>
            <Text className="text-white font-medium text-lg">
              Macros Totais
            </Text>
          </View>

          <View className="items-center flex-row gap-2">
            <Text className="text-gray-300 text-lg font-sans-regular opacity-80">
              Calorias
            </Text>
            <View className="w-[100px] h-5 bg-gray-700 rounded-full overflow-hidden">
              <View className="h-full bg-support-tomato items-center justify-center">
                <Text className="text-xs text-white font-semibold">
                  {totals.calories}g ({caloriesPercentage.toFixed(1)}%)
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <View className="p-5">
        <MacrosBar
          carbohydrates={totals.carbohydrates}
          proteins={totals.proteins}
          fats={totals.fats}
          carbsPercent={carbsPercent}
          proteinsPercent={proteinsPercent}
          fatsPercent={fatsPercent}
        />
      </View>

      <View className="p-5">
        <Text className="text-2xl font-sans-semibold">{meal.name}</Text>
        <View className="pt-6 flex flex-col gap-6">
          <Text className="text-gray-700 text-base font-medium">Itens</Text>
          {meal.foods.map((food, index) => {
            const key = `${food.name}-${food.quantity}-${index}`;
            return (
              <View
                key={key}
                className="flex px-[14px] pb-[14px] border-b border-gray-500"
              >
                <Text className="font-sans-regular text-base">{food.name}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
