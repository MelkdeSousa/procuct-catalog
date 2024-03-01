import { Topic, TopicPayload } from "@/config/messaging-topics";
import * as jobs from "@/jobs";
import { makeBeeQueue } from "@/utils/make-bee-queue";

const queues = Object.values(jobs as object).map((job) => ({
  queue: makeBeeQueue(job.key),
  name: job.key,
  handle: job.handler,
  options: job.options,
}));

export default {
  queues,

  async add<const D extends Topic>(name: D, data: TopicPayload<D>) {
    const queue = this.queues.find((queue) => queue.name === name);

    return await queue?.queue.createJob(data).save();
  },
  /**
   * Process the queues and handle any failed jobs.
   */
  process() {
    for (const queue of this.queues) {
      queue.queue.process(queue.handle);
      queue.queue.on("failed", (job, err) => {
        console.log("Job failed", queue.name, job.data);
        console.log(err);
      });
    }
  },
};
