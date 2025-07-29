import { SQSEvent } from "aws-lambda";
import { ProcessMeal } from "../controllers/ProcessMeal";

export async function handler(event: SQSEvent) {
  await Promise.all(
    event.Records.map(async (record) => {
      const { fileKey } = JSON.parse(record.body);
      await ProcessMeal.process({ fileKey });
    })
  );
}
