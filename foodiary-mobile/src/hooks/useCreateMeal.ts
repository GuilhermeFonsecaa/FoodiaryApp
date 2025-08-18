import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as FileSystem from 'expo-file-system';

import { httpClient } from '../services/httpClient';

type CreateMealResponse = {
  uploadURL: string;
  mealId: string;
}

type CreateMealParams = {
  fileType: 'image/jpeg' | 'audio/m4a';
  onSuccess(mealId: string): void;
}

export function useCreateMeal({ fileType, onSuccess }: CreateMealParams) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (uri: string) => {
      const { data } = await httpClient.post<CreateMealResponse>('/meals', {
        fileType,
      });

      await FileSystem.uploadAsync(data.uploadURL, uri, {
        httpMethod: 'PUT',
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      });

      return { mealId: data.mealId };
    },
    onSuccess: ({ mealId }) => {
      onSuccess(mealId);
      queryClient.refetchQueries({ queryKey: ['meals'] });
    },
  });

  return {
    createMeal: mutateAsync,
    isLoading: isPending,
  };
}