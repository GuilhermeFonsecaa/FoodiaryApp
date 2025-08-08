import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { cn } from '../utils/cn';

interface IInputProps extends React.ComponentProps<typeof TextInput> {
  mask?: string;
  label?: string;
  append?: string;
  error?: string;
}

export function Input({ className, mask, onChangeText, label, append, error, ...props }: IInputProps) {
  const [maskedValue, setMaskedValue] = useState('');

  function handleChangeText(text: string) {
    const value = mask ? applyMask(text, mask) : text;

    setMaskedValue(value);
    onChangeText?.(value);
  }

  return (
    <View className="gap-2">
      {label && (
        <Text className="text-base font-sans-medium to-black-700">{label}</Text>
      )}

      <View className="gap-2 flex-row">
        <TextInput
          className={cn(
            'h-[52px] p-3.5 flex-1 border border-gray-400 rounded-[10px] text-black-700 focus:border-black-700',
            !!error && 'border-support-red',
            className,
          )}
          value={mask ? maskedValue : props.value}
          onChangeText={handleChangeText}
          {...props}
        />

        {append && (
          <View className="size-[52px] items-center justify-center text-center rounded-[10px] bg-gray-400">
            <Text className="text-base font-sans-regular text-gray-700">{append}</Text>
          </View>
        )}
      </View>
      {error && <Text className="text-support-red font-sans-regular text-sm">{error}</Text>}
    </View>
  );
}

function applyMask(value: string, mask: string): string {
  const cleanValue = value.replace(/\D/g, '');
  let result = '';
  let j = 0;

  for (let i = 0; i < mask.length && j < cleanValue.length; i++) {
    if (mask[i] === '9') {
      result += cleanValue[j++];
    } else {
      result += mask[i];
    }
  }

  return result;
}