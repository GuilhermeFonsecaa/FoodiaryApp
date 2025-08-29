import { View, Text } from "react-native";

export function MacrosBar({
  carbohydrates,
  proteins,
  fats,
  carbsPercent,
  proteinsPercent,
  fatsPercent,
}: {
  carbohydrates: number;
  proteins: number;
  fats: number;
  carbsPercent: string; // formato com 1 casa decimal já formatado
  proteinsPercent: string;
  fatsPercent: string;
}) {
  return (
    <View className="mb-4">
      {/* Labels e valores */}
      <View className="flex-row justify-between items-end px-2">
        <View className="items-center">
          <Text className="text-gray-700 text-base font-sans-regular pb-2">
            Carboidratos
          </Text>
          <Text className="text-base font-sans-medium text-support-yellow ">
            <Text>{carbohydrates}g </Text>
            <Text>({carbsPercent}%)</Text>
          </Text>
        </View>

        <View className="items-center">
          <Text className="text-gray-700 text-base font-sans-regular pb-2">
            Proteínas
          </Text>
          <Text className="text-base font-sans-medium text-support-teal">
            <Text>{proteins}g </Text>
            <Text>({proteinsPercent}%)</Text>
          </Text>
        </View>

        <View className="items-center">
          <Text className="text-gray-700 text-base font-sans-regular pb-2">
            Gorduras
          </Text>
          <Text className="text-base font-sans-medium text-support-orange">
            <Text>{fats}g </Text>
            <Text>({fatsPercent}%)</Text>
          </Text>
        </View>
      </View>

      {/* Barra de proporção (proporcional a gramas) */}
      <View className="mt-3 px-2">
        <View className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          {carbohydrates + proteins + fats === 0 ? (
            <View className="w-full h-full items-center justify-center">
              <Text className="text-gray-400 text-xs">Sem macros</Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", height: "100%" }}>
              {carbohydrates > 0 && (
                <View
                  className="bg-support-yellow"
                  style={{
                    flex: carbohydrates,
                    borderTopLeftRadius: 999,
                    borderBottomLeftRadius: 999,
                  }}
                />
              )}

              {proteins > 0 && (
                <View
                  className="bg-support-teal"
                  style={{
                    flex: proteins,
                  }}
                />
              )}

              {fats > 0 && (
                <View
                  className="bg-support-orange"
                  style={{
                    flex: fats,
                    borderTopRightRadius: 999,
                    borderBottomRightRadius: 999,
                  }}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
