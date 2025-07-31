import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { cn } from '../utils/cn';

interface IButtonProps extends React.ComponentProps<typeof Pressable> {
  loading?: boolean;
  size?: 'default' | 'icon';
  color?: 'default' | 'gray' | 'dark';
}

export function Button({
  children,
  className,
  loading,
  disabled,
  size = 'default',
  color = 'default',
  ...props
}: IButtonProps) {
  const isChildrenString = typeof children === 'string';

  const childEl = !isChildrenString
    ? children
    : (
      <Text className="text-base font-sans-medium">{children}</Text>
    );

  return (
    <View className={cn('rounded-xl overflow-hidden', className)}>
      <Pressable
        className={cn(
          'items-center justify-center ios:active:opacity-85 disabled:opacity-40',
          color === 'default' && 'bg-lime-500',
          color === 'gray' && 'bg-gray-300',
          color === 'dark' && 'bg-lime-500/5',
          size === 'default' && 'px-6 py-3.5 min-h-[52px]',
          size === 'icon' && 'size-12',
          className,
        )}
        android_ripple={{ color: color === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)' }}
        disabled={disabled ?? loading}
        {...props}
      >
        {loading ? <ActivityIndicator color="#000" /> : childEl}
      </Pressable>
    </View>
  );
}