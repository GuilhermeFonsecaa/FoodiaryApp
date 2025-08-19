import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { formatMealDate } from '../utils/formatMealDate';

interface IMealCardProps {
  id: string;
  createdAt: Date;
  icon: string;
  name: string;
  foods: { name: string }[];
}

export function MealCard({
  createdAt,
  foods,
  icon,
  id,
  name,
}: IMealCardProps) {
  return (
    <Link href={`/meals/${id}`} asChild>
      <TouchableOpacity>
        <Text className="text-base font-sans-regular text-gray-700">
          {formatMealDate(createdAt)}
        </Text>

        <View className="mt-2 px-4 py-5 flex-row gap-3 items-center border border-gray-400 rounded-2xl">
          <View className="size-12 bg-gray-200 rounded-full items-center justify-center">
            <Text>{icon}</Text>
          </View>

          <View>
            <Text className="text-base font-sans-regular text-gray-700">
              {name}
            </Text>
            <Text className="text-base font-sans-medium text-black-700">
              {foods.map(({ name }) => name).join(', ')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}