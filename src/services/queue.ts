import { Topics } from "@/config/messaging-topics";
import { snsClient } from "@/config/sns";
import { PublishCommand } from "@aws-sdk/client-sns";


export const queue = {
  async publish<const D>(queueName: Topics, data: D) {
    await snsClient.send(
      new PublishCommand({
        TopicArn: queueName,
        Message: JSON.stringify(data),
      }),
    );
  }
}