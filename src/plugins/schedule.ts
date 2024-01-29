import fp from 'fastify-plugin'
import fastifySchedule from '@fastify/schedule'
import { UpdateIPFSDeploymentSchedulerConfig } from '../schedulerConfigs/updateIPFSDeploymentSchedulerConfig.js';

/**
 * This plugins adds mongodb support
 *
 * @see https://github.com/fastify/fastify-schedule
 */

export default fp(async (fastify) => {
  fastify.register(fastifySchedule);

  const updateIPFSDeploymentSchedulerConfig = new UpdateIPFSDeploymentSchedulerConfig(fastify);

  // `fastify.scheduler` becomes available after initialization.
  // Therefore, you need to call `ready` method.
  fastify.ready().then(() => {
    fastify.scheduler.addCronJob(updateIPFSDeploymentSchedulerConfig.updateIPFSDeployments());
  });
});
