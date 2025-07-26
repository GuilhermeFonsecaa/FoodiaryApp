import { db } from "../db";
import { mealsTable } from "../db/schema";
import { HttpResponse, ProtectedHttpRequest } from "../types/Http";
import { badRequest, created, ok } from "../utils/https";
import { createMealSchema } from "../schemas/createMealSchema";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "../clients/s3Clients";

export class CreateMealController {
  static async handle({
    body,
    userId,
  }: ProtectedHttpRequest): Promise<HttpResponse> {
    const { success, error, data } = createMealSchema.safeParse(body);

    if (!success) {
      return badRequest({ errors: error.issues });
    }

    const fileId = randomUUID();
    const ext = data.fileType === "audio/m4a" ? ".m4a" : ".jpg";
    const fileKey = `${fileId}${ext}`;

    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: fileKey,
    });

    const presignedURL = await getSignedUrl(s3Client, command, {
      expiresIn: 600,
    });

    const [meal] = await db
      .insert(mealsTable)
      .values({
        userId,
        inputFileKey: "input_file_key",
        inputType: data?.fileType === "audio/m4a" ? "audio" : "picture",
        status: "uploading",
        icon: "",
        name: "",
        foods: [],
      })
      .returning({ id: mealsTable.id });

    return created({ mealId: meal.id, uploadURL: presignedURL });
  }
}
