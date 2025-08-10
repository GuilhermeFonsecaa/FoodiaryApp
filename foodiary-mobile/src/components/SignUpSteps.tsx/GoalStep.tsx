import { OptionsSelector } from "../OptionsSelector";
import { Controller, useFormContext } from "react-hook-form";
import { signUpSchema, signUpSchemaType } from "../../schemas/signupSchema";

export function GoalStep() {
  const form = useFormContext<signUpSchemaType>();

  return (
    <Controller
      control={form.control}
      name="goal"
      render={({ field }) => (
       
        <OptionsSelector
          value={field.value}
          onChange={field.onChange}
          options={[
            {
              icon: "🥦",
              title: "Perder Peso",
              value: "lose",
            },

            {
              icon: "🍍",
              title: "Manter Peso",
              value: "maintain",
            },

            {
              icon: "🥩",
              title: "Ganhar Peso",
              value: "gain",
            },
          ]}
        />

      )}
    />
  );
}
