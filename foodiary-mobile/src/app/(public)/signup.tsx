import { useState } from "react";
import { AuthLayout } from "../../components/AuthLayout";
import { GoalStep } from "../../components/SignUpSteps.tsx/GoalStep";
import { GenderStep } from "../../components/SignUpSteps.tsx/GenderStep";
import { View } from "react-native";
import { colors } from "../../styles/colors";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react-native";
import { Button } from "../../components/Button";
import { router } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../schemas/signupSchema";
import { BirthDateStep } from "../../components/SignUpSteps.tsx/BirthDate";
import { HeightStep } from "../../components/SignUpSteps.tsx/HeightStep";
import { WeightStep } from "../../components/SignUpSteps.tsx/WeigthStep";
import { ActivityLevelStep } from "../../components/SignUpSteps.tsx/ActivityLevelStep";
import { AccountStep } from "../../components/SignUpSteps.tsx/AccountStep";

export default function SignUp() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const form = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const steps = [
    {
      icon: "🎯",
      title: "Qual é o seu objetivo?",
      subtitle: "O que você pretende alcançar com a dieta?",
      Component: GoalStep,
    },
    {
      icon: "👥",
      title: "Qual é seu gênero",
      subtitle: "Seu gênero influencia no tipo da dieta",
      Component: GenderStep,
    },
    {
      icon: "📅",
      title: "Qual é sua data de nascimento?",
      subtitle: "Sua idade ajuda a personalizar sua dieta",
      Component: BirthDateStep,
    },
    {
      icon: "📏",
      title: "Qual é sua altura?",
      subtitle: "Sua altura é importante para o cálculo do IMC",
      Component: HeightStep,
    },
    {
      icon: "⚖️",
      title: "Qual é seu peso atual?",
      subtitle: "Seu peso atual nos ajuda a criar sua dieta",
      Component: WeightStep,
    },
    {
      icon: "🏃",
      title: "Qual é seu nível de atividade?",
      subtitle: "Isso nos ajuda a calcular suas necessidades calóricas",
      Component: ActivityLevelStep,
    },
    {
      icon: "📝",
      title: "Crie sua conta",
      subtitle: "Finalize seu cadastro para começar sua jornada",
      Component: AccountStep,
    },
  ];

  function handlePreviousStep() {
    if (currentStepIndex === 0) {
      router.back();
      return;
    }
    setCurrentStepIndex((prevState) => prevState - 1);
  }

  function handleNextStep() {
    setCurrentStepIndex((prevState) => prevState + 1);
  }

  const currentStep = steps[currentStepIndex];

  return (
    <AuthLayout
      icon={currentStep.icon}
      title={currentStep.title}
      subtitle={currentStep.subtitle}
    >
      <View className="justify-between flex-1">
        <FormProvider {...form}>
          <currentStep.Component />
        </FormProvider>
        <View className="flex-row gap-6 justify-between">
          <Button size="icon" color="gray" onPress={handlePreviousStep}>
            <ArrowLeftIcon size={20} color={colors.black[700]} />
          </Button>
          <Button size="icon" onPress={handleNextStep}>
            <ArrowRightIcon size={20} color={colors.black[700]} />
          </Button>
        </View>
      </View>
    </AuthLayout>
  );
}
