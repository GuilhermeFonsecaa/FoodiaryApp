import { FlatList, View, Text } from "react-native";
import { MealCard } from "./MealCard";
import { MealsListHeader } from "./MealsListHeader";
import { Separator } from "./Separator";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../services/httpClient";

type Meals = {
  name: string;
  id: string;
  icon: string;
  foods: {
    name: string;
    quantity: string;
    calories: number;
    proteins: number;
    carbohydraters: number;
    fasts: number;
  }[];
  createdAt: Date;
};

export function MealsList() {
  const { bottom } = useSafeAreaInsets(); //retorna as margens seguras da tela

  const { data: meals } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const { data } = await httpClient.get<{ meals: Meals[] }>("/meals", {
        params: {
          date: "2025-08-19",
        },
      });

      return data.meals;
    },
  });

  return (
    <FlatList
      data={meals}
      keyExtractor={(meal) => meal.id}
      contentContainerStyle={{ paddingBottom: 80 + bottom + 16 }} //somado para garantir que o conteúdo da lista não fique colado ou escondido na parte inferior da tela
      ListHeaderComponent={MealsListHeader} //componente React que será renderizado no topo da lista, antes do primeiro item
      ItemSeparatorComponent={Separator} //componente React que será renderizado entre os itens da lista, funcionando como um separador visual.
      ListEmptyComponent={<Text className="mx-5">Nenhuma refeição cadastrada...</Text>}
      renderItem={({ item: meal }) => (
        <View className="mx-5">
          <MealCard id={meal.id} name={meal.name} />
        </View>
      )}
    />
  );
}
