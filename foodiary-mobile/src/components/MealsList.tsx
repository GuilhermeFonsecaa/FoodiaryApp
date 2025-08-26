import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../hooks/useAuth";
import { httpClient } from "../services/httpClient";
import { DailyStats } from "./DailyStats";
import { DateSwitcher } from "./DateSwitcher";
import { MealCard } from "./MealCard";

type Meal = {
  name: string;
  id: string;
  icon: string;
  foods: {
    name: string;
    quantity: string;
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
  }[];
  createdAt: string;
};

interface IMealsListHeaderProps {
  currentDate: Date;
  meals: Meal[];
  onPreviousDate(): void;
  onNextDate(): void;
}

function MealsListHeader({
  meals,
  currentDate,
  onNextDate,
  onPreviousDate,
}: IMealsListHeaderProps) {
  const { user } = useAuth();

  const totals = useMemo(() => {
    let calories = 0;
    let proteins = 0;
    let carbohydrates = 0;
    let fats = 0;

    for (const meal of meals) {
      for (const food of meal.foods) {
        calories += food.calories;
        proteins += food.proteins;
        carbohydrates += food.carbohydrates;
        fats += food.fats;
      }
    }

    return {
      calories,
      proteins,
      carbohydrates,
      fats,
    };
  }, [meals]);

  return (
    <View>
      <DateSwitcher
        currentDate={currentDate}
        onNextDate={onNextDate}
        onPreviousDate={onPreviousDate}
      />

      <View className="mt-2">
        <DailyStats
          calories={{
            current: totals.calories,
            goal: user!.calories,
          }}
          proteins={{
            current: totals.proteins,
            goal: user!.proteins,
          }}
          carbohydrates={{
            current: totals.carbohydrates,
            goal: user!.carbohydrates,
          }}
          fats={{
            current: totals.fats,
            goal: user!.fats,
          }}
        />
      </View>

      <View className="h-px bg-gray-200 mt-7" />

      <Text className="text-black-700 m-5 text-base font-sans-medium tracking-[1.28px]">
        REFEIÇÕES
      </Text>
    </View>
  );
}

function Separator() {
  return <View className="h-8" />;
}

export function MealsList() {
  const { bottom } = useSafeAreaInsets();

  const [currentDate, setCurrentDate] = useState(new Date());

  const dateParam = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }, [currentDate]);

  const { data: meals, refetch } = useQuery({
    queryKey: ["meals", dateParam],
    staleTime: 15_000,
    queryFn: async () => {
      const { data } = await httpClient.get<{ meals: Meal[] }>("/meals", {
        params: {
          date: dateParam,
        },
      });

      return data.meals;
    },
  });

  //sempre que voltar ao foco nesta página faz o refetch
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  function handlePreviousDate() {
    setCurrentDate((prevState) => {
      const newDate = new Date(prevState);
      newDate.setDate(newDate.getDate() - 1);

      return newDate;
    });
  }

  function handleNextDate() {
    setCurrentDate((prevState) => {
      const newDate = new Date(prevState);
      newDate.setDate(newDate.getDate() + 1);

      return newDate;
    });
  }

  return (
    <FlatList
      data={meals}
      contentContainerStyle={{ paddingBottom: 80 + bottom + 16 }}
      keyExtractor={(meal) => meal.id}
      ListEmptyComponent={<Text className="px-5">Nenhuma refeição cadastrada...</Text>}
      ListHeaderComponent={
        <MealsListHeader
          currentDate={currentDate}
          meals={meals ?? []}
          onNextDate={handleNextDate}
          onPreviousDate={handlePreviousDate}
        />
      }
      ItemSeparatorComponent={Separator}
      renderItem={({ item: meal }) => (
        <View className="mx-5">
          <MealCard
            id={meal.id}
            name={meal.name}
            icon={meal.icon}
            foods={meal.foods}
            createdAt={new Date(meal.createdAt)}
          />
        </View>
      )}
    />
  );
}
