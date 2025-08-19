import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../styles/colors';
import { formatDate } from '../utils/formatDate';

interface IDateSwitcherProps {
  currentDate: Date;
  onPreviousDate(): void;
  onNextDate(): void;
}

export function DateSwitcher({ currentDate, onNextDate, onPreviousDate }: IDateSwitcherProps) {
  return (
    <View className="px-2 mt-3 flex-row items-center justify-between">
      <TouchableOpacity
        className="size-12 items-center justify-center"
        onPress={onPreviousDate}
      >
        <ChevronLeftIcon size={20} color={colors.black[700]} />
      </TouchableOpacity>

      <Text className="font-sans-medium text-base text-gray-700 tracking-[1.28px]">
        {formatDate(currentDate)}
      </Text>
      
      <TouchableOpacity
        className="size-12 items-center justify-center"
        onPress={onNextDate}
      >
        <ChevronRightIcon size={20} color={colors.black[700]} />
      </TouchableOpacity>
    </View>
  );
}