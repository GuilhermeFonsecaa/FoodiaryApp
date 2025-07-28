import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../styles/colors";

export function DateSwitcher() {
  return (
    <View className="px-2 mt-3 flex-row items-center justify-between">
      <TouchableOpacity className="size-12 items-center justify-center">
        <ChevronLeftIcon size={20} color={colors.black[700]} />
      </TouchableOpacity>

      <Text className="uppercase font-sans-medium text-base text-gray-700 tracking-[1.28px]">
        Hoje, 20 de Julho
      </Text>

      <TouchableOpacity className="size-12 items-center justify-center">
        <ChevronRightIcon size={20} color={colors.black[700]} />
      </TouchableOpacity>
    </View>
  );
}
