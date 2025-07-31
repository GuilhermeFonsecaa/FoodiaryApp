import { FlatList, View } from "react-native";
import { MealCard } from "./MealCard";
import { MealsListHeader } from "./MealsListHeader";
import { Separator } from "./Separator";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const meals = [
  {
    id: String(Math.random()),
    name: "Café da manhã",
  },
  {
    id: String(Math.random()),
    name: "Almoço",
  },
  {
    id: String(Math.random()),
    name: "Janta",
  },

  {
    id: String(Math.random()),
    name: "Café da manhã",
  },
  {
    id: String(Math.random()),
    name: "Almoço",
  },
  {
    id: String(Math.random()),
    name: "Janta",
  },
];

export function MealsList() {
  const { bottom } = useSafeAreaInsets(); //retorna as margens seguras da tela
  return (
    <FlatList
      data={meals}
      keyExtractor={(meal) => meal.id}
      contentContainerStyle={{ paddingBottom: 80 + bottom + 16}} //somado para garantir que o conteúdo da lista não fique colado ou escondido na parte inferior da tela
      ListHeaderComponent={MealsListHeader} //componente React que será renderizado no topo da lista, antes do primeiro item
      ItemSeparatorComponent={Separator} //componente React que será renderizado entre os itens da lista, funcionando como um separador visual.
      renderItem={({ item: meal }) => (
        <View className="mx-5">
          <MealCard id={meal.id} name={meal.name} />
        </View>
      )}
    />
  );
}
