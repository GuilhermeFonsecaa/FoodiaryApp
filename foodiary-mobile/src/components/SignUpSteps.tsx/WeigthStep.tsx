import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../Input";
import { signUpSchemaType } from "../../schemas/signupSchema";

export function WeightStep() {
  const { control } = useFormContext<signUpSchemaType>();

  return (
    <Controller
      control={control}
      name="weight"
      render={({ field, fieldState }) => (
        <Input
          label="Peso"
          placeholder="Ex: 70"
          value={field.value}
          onChangeText={field.onChange}
          error={fieldState.error?.message}
          keyboardType="numeric"
          append="kg"
        />
      )}
    />
  );
}
