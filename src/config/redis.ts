import { envs } from "./env";

export const redisConfig = {
  host: envs.REDIS_HOST,
  port: envs.REDIS_PORT,
};
