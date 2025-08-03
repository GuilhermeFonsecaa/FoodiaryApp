import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "./Button";
import { CameraIcon, MicIcon } from "lucide-react-native";
import { useState } from "react";
import { AudioModal } from "./AudioModal";

export function CreateMealBottomBar() {
  const { bottom } = useSafeAreaInsets();
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);

  return (
    <View
      className="absolute bg-white bottom-0 w-full z-10 h-20 border-t border-gray-400"
      style={{ height: 80 + bottom }}
    >
      <View className="flex-row mx-auto gap-4 mt-5">
        <Button
          size="icon"
          color="gray"
          onPress={() => setIsAudioModalOpen(true)}
        >
          <MicIcon />
        </Button>

        <Button size="icon" color="gray">
          <CameraIcon />
        </Button>
      </View>

      <AudioModal
        open={isAudioModalOpen}
        onClose={() => setIsAudioModalOpen(false)}
      />
    </View>
  );
}
