import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IAuthLayoutProps {
  icon: string;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export function AuthLayout({ icon, title, subtitle, children }: IAuthLayoutProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View className="flex-1">
      <View className="flex-1 bg-white">
        <View className="h-[98px] bg-lime-400" />

        <View className="size-12 bg-white items-center justify-center rounded-xl -mt-6 mx-auto border-2 border-lime-400">
          <Text>{icon}</Text>
        </View>

        <View className="mx-auto mt-6 items-center">
          <Text className="text-black-700 font-sans-semibold tracking-[-0.32px] text-[32px] text-center">
            {title}
          </Text>
          <Text className="mt-1 text-gray-700 text-base font-sans-regular">
            {subtitle}
          </Text>
        </View>

        <View className="flex-1 mt-10 px-6" style={{ marginBottom: bottom }}>
          {children}
        </View>
      </View>
    </View>
  );
}