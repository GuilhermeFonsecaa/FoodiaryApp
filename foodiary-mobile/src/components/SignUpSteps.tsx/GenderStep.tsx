import { Controller, useFormContext } from "react-hook-form";
import { OptionsSelector } from "../OptionsSelector";
import { signUpSchemaType } from "../../schemas/signupSchema";

export function GenderStep() {
  const form = useFormContext<signUpSchemaType>();

  return (
    <Controller
      control={form.control}
      name="gender"
      render={({ field }) => (
        <OptionsSelector
          value={field.value}
          onChange={field.onChange}
          options={[
            {
              icon: "👨",
              title: "Masculino",
              value: "male",
            },
            {
              icon: "👩",
              title: "Feminino",
              value: "female",
            },
          ]}
        />
      )}
    />
  );
}
