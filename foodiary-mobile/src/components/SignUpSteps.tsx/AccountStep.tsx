import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { Input } from '../Input';
import { signUpSchemaType } from '../../schemas/signupSchema';

export function AccountStep() {
  const { control } = useFormContext<signUpSchemaType>();

  return (
    <View className="gap-4">
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <Input
            label="Nome completo"
            placeholder="Digite seu nome"
            value={field.value}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
            autoCapitalize="words"
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <Input
            label="Email"
            placeholder="Digite seu email"
            value={field.value}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <Input
            label="Senha"
            placeholder="Digite sua senha (min. 8 caracteres)"
            value={field.value}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
      />
    </View>
  );
}