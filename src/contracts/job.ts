import { Topic, TopicPayload } from "@/config/messaging-topics";

/**
 * A job to be processed by the background worker.
 * @template D The topic's payload data type
 */
export type Job<D extends Topic> = {
  /** The topic that this job is subscribed to */
  key: Topic;
  /** Options to be passed to the underlying job queue */
  options?: Record<string, unknown>;
  /**
   * The function that will be called when a message is received on the
   * {@link key} topic. It will be passed the payload of the message.
   * @param data The payload data of the message
   */
  handler: (data: { data: TopicPayload<D> }) => Promise<void> | void;
};
