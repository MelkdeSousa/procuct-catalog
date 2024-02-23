import { SNSClient } from "@aws-sdk/client-sns";
import { envs } from "./env";

export const snsClient = new SNSClient({
    credentials: {
        accessKeyId: envs.AWS_ACCESS_KEY_ID,
        secretAccessKey: envs.AWS_SECRET_ACCESS_KEY,
    },
    region: envs.AWS_REGION,
});
