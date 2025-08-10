import { OptionsSelector } from "../OptionsSelector";
import { Controller, useFormContext } from "react-hook-form";
import { signupSchemaType } from "../../schemas/signupSchema";

export function GoalStep() {
  const form = useFormContext<signupSchemaType>();

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
