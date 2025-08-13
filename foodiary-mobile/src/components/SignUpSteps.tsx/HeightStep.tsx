import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '../Input';
import { signUpSchemaType } from '../../schemas/signupSchema';


export function HeightStep() {
  const { control } = useFormContext<signUpSchemaType>();

  return (
    <Controller
      control={control}
      name="height"
      render={({ field, fieldState }) => (
        <Input
          label="Altura"
          placeholder="Ex: 175"
          value={field.value}
          onChangeText={field.onChange}
          error={fieldState.error?.message}
          keyboardType="number-pad"
          returnKeyType="done"
          append="cm"
        />
      )}
    />
  );
}