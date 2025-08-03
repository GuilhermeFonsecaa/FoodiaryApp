import { StatusBar } from "expo-status-bar";
import {
  CheckIcon,
  MicIcon,
  PauseIcon,
  PlayIcon,
  SquareIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, Modal, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../styles/colors";
import { cn } from "../utils/cn";
import { Button } from "./Button";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";

interface IAudioModalProps {
  open: boolean;
  onClose: () => void;
}

export function AudioModal({ onClose, open }: IAudioModalProps) {
  const [audioUri, setAudioUri] = useState<null | string>(null);

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const { isRecording } = useAudioRecorderState(audioRecorder);
  const player = useAudioPlayer(audioUri);

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert("Permission to access microphone was denied");
      }
      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, []);

  async function handleStartRecording() {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  }

  async function handleStopRecording() {
    await audioRecorder.stop();
    setAudioUri(audioRecorder.uri);
  }

  function handleDeleteAudio() {
    setAudioUri(null);
  }

  function handleCloseModal() {
    setAudioUri(null);
    onClose();
  }

  return (
    <Modal
      transparent
      statusBarTranslucent
      onRequestClose={handleCloseModal}
      visible={open}
      animationType="slide"
    >
      <StatusBar style="light" />

      <View className="bg-black flex-1">
        <SafeAreaProvider>
          <SafeAreaView className="flex-1">
            <View className="flex-row p-5">
              <Button size="icon" color="dark" onPress={handleCloseModal}>
                <XIcon size={20} color={colors.gray[500]} />
              </Button>
            </View>

            <View className="flex-1 items-center justify-center">
              <View className="size-[265px] border border-gray-700/10 rounded-full items-center justify-center">
                <View
                  className={cn(
                    "size-[227px] border border-gray-700/50 rounded-full items-center justify-center",
                    isRecording && "border-lime-600/50"
                  )}
                >
                  <View
                    className={cn(
                      "size-[179px] bg-gray-700/10 rounded-full",
                      isRecording && "bg-lime-600/10"
                    )}
                  />
                </View>
              </View>

              <Text className="text-white text-base text-center font-sans-regular w-[192px] mt-8">
                Tente dizer algo como: 100g de Arroz, 2 Ovos e 100g de Salada
              </Text>
            </View>

            {!audioUri && (
              <View className="p-5 pt-6 items-center gap-2 pb-20">
                <View className="flex-row">
                  {!isRecording && (
                    <Button
                      size="icon"
                      color="dark"
                      onPress={handleStartRecording}
                    >
                      <MicIcon size={20} color={colors.lime[600]} />
                    </Button>
                  )}

                  {isRecording && (
                    <Button
                      size="icon"
                      color="dark"
                      onPress={handleStopRecording}
                    >
                      <SquareIcon size={20} color={colors.gray[500]} />
                    </Button>
                  )}
                </View>

                <Text className="text-gray-100 text-base font-sans-regular w-[180px] text-center">
                  Toque no microfone para começar a gravar
                </Text>
              </View>
            )}

            {audioUri && (
              <View className="p-5 pt-6 items-center pb-20 flex-row justify-center gap-8">
                <Button size="icon" color="dark" onPress={handleDeleteAudio}>
                  <Trash2Icon size={20} color={colors.gray[500]} />
                </Button>

                {!player.playing && (
                  <Button
                    size="icon"
                    color="dark"
                    onPress={() => player.play()}
                  >
                    <PlayIcon size={20} color={colors.lime[600]} />
                  </Button>
                )}
                {player.playing && (
                  <Button
                    size="icon"
                    color="dark"
                    onPress={() => player.pause()}
                  >
                    <PauseIcon size={20} color={colors.lime[600]} />
                  </Button>
                )}

                <Button size="icon">
                  <CheckIcon size={20} color={colors.black[700]} />
                </Button>
              </View>
            )}
          </SafeAreaView>
        </SafeAreaProvider>
      </View>
    </Modal>
  );
}
