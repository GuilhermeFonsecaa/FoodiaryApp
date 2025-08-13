import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../Input";
import { signUpSchemaType } from "../../schemas/signupSchema";

export function BirthDateStep() {
  const { control } = useFormContext<signUpSchemaType>();

  return (
    <Controller
      control={control}
      name="birthDate"
      render={({ field, fieldState }) => (
        <Input
          label="Data de nascimento"
          mask="99/99/9999"
          placeholder="DD/MM/AAAA"
          value={field.value}
          onChangeText={field.onChange}
          error={fieldState.error?.message}
          keyboardType="number-pad"
          returnKeyType="done"
        />
      )}
    />
  );
}
