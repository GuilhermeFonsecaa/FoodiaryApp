import { Text, TouchableOpacity, View } from 'react-native';
import { cn } from '../utils/cn';

interface IOptionSelectorProps {
  value?: string;
  onChange?: (value: string) => void;
  options: {
    value: string;
    icon: string;
    title: string;
    description?: string;
  }[];
}

export function OptionsSelector({ options, onChange, value }: IOptionSelectorProps) {
  return (
    <View className="gap-4 w-full">
      {options.map(option => (
        <TouchableOpacity
          key={option.value}
          className={cn(
            'border border-gray-500 rounded-2xl py-3 px-4 flex-row gap-4 items-center',
            value === option.value && 'bg-lime-700/10 border-lime-700',
          )}
          onPress={() => onChange?.(option.value)}
        >
          <View
            className={cn(
              'size-12 bg-gray-400 items-center justify-center rounded-xl',
              value === option.value && 'bg-white/40',
            )}
          >
            <Text>{option.icon}</Text>
          </View>

          <View>
            <Text className="text-black-700 text-base font-sans-semibold">
              {option.title}
            </Text>

            {option.description && (
              <Text className="text-sm font-sans-regular text-gray-700">
                {option.description}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}