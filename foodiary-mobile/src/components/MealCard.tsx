import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

interface MealCardProps {
  id: string;
  name: string;
}

export function MealCard({ id, name }: MealCardProps) {
  return (
    <Link href={`/meals/${id}`} asChild>
      <TouchableOpacity>
        <Text className="text-gray-700 font-sans-regular text-base">
          Hoje, 12h25
        </Text>

        <View className="flex-row px-4 py-5 mt-2 gap-3 border border-gray-400 bg-white rounded-2xl">
          <View className="size-12 bg-gray-200 rounded-full items-center justify-center">
            <Text>a</Text>
          </View>

          <View>
            <Text className="text-base text-gray-700 font-sans-regular">
              {name}
            </Text>
            <Text className="font-sans-medium text-black-700 text-base">
              Pão, manteiga e café
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
