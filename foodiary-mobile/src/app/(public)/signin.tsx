import { View, Text } from "react-native";
import { AuthLayout } from "../../components/AuthLayout";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { router } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { colors } from "../../styles/colors";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../../schemas/signinSchema";
import { Controller, useForm } from "react-hook-form";

export default function SignIn() {
  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit((formData) => {
    console.log(JSON.stringify(formData, null, 2));
  });

  return (
    <AuthLayout
      icon="👤"
      title="Entre em sua conta"
      subtitle="Acesse sua conta para continuar"
    >
      <View className="justify-between flex-1">
        <View className="gap-6">
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Input
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                value={field.value}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Input
                label="Senha"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password"
                secureTextEntry
                value={field.value}
                onChangeText={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        </View>
        <View className="flex-row gap-4">
          <Button onPress={router.back} size="icon" color="gray">
            <ArrowLeftIcon size={20} color={colors.black[700]} />
          </Button>
          <Button onPress={handleSubmit} className="flex-1">Entrar</Button>
        </View>
      </View>
    </AuthLayout>
  );
}
