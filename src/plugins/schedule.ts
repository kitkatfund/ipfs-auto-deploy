import fp from 'fastify-plugin'
import fastifySchedule from '@fastify/schedule'
import { ActiveChainVaultsUpdateSchedulerConfig } from '../schedulerConfigs/activeChainVaultsCountUpdateSchedulerConfig';
import { AuthzStakeChainsUpdateSchedulerConfig } from '../schedulerConfigs/authzStakeChainsUpdateSchedulerConfig';
import { JobSchedulesUpdateSchedulerConfig } from '../schedulerConfigs/jobScheduleUpdateSchedulerConfig';
import { PriceUpdateSchedulerConfig } from '../schedulerConfigs/priceUpdateSchedulerConfig';
import { PropelRewardUnlockSchedulerConfig } from '../schedulerConfigs/rewardSchedulerConfig';
import { StakeStrategyExecutionJobSchedulerConfig } from '../schedulerConfigs/strategyExecutionSchedulerConfig';
import { MarketCapUpdateSchedulerConfig } from '../schedulerConfigs/marketCapUpdateSchedulerConfig';

/**
 * This plugins adds mongodb support
 *
 * @see https://github.com/fastify/fastify-schedule
 */

export default fp(async (fastify) => {
  fastify.register(fastifySchedule);

  const activeChainVaultsUpdateSchedulerConfig = new ActiveChainVaultsUpdateSchedulerConfig(fastify);
  const authzStakeChainsUpdateSchedulerConfig = new AuthzStakeChainsUpdateSchedulerConfig(fastify);
  const jobSchedulesUpdateSchedulerConfig = new JobSchedulesUpdateSchedulerConfig(fastify);
  const priceUpdateSchedulerConfig = new PriceUpdateSchedulerConfig(fastify);
  const rewardsSchedulerConfig = new PropelRewardUnlockSchedulerConfig(fastify);
  const stakeStrategyScheudler = new StakeStrategyExecutionJobSchedulerConfig(fastify);
  const marketCapUpdateSchedulerConfig = new MarketCapUpdateSchedulerConfig(fastify);

  // `fastify.scheduler` becomes available after initialization.
  // Therefore, you need to call `ready` method.
  fastify.ready().then(() => {
    fastify.scheduler.addCronJob(activeChainVaultsUpdateSchedulerConfig.updateActiveChainVaultCount());
    fastify.scheduler.addCronJob(authzStakeChainsUpdateSchedulerConfig.updateChainListFromCosmosDirectory());
    fastify.scheduler.addCronJob(jobSchedulesUpdateSchedulerConfig.updateJobScheduleByAPR());
    fastify.scheduler.addCronJob(priceUpdateSchedulerConfig.updateLatestPricesFromCoingecko());
    fastify.scheduler.addCronJob(rewardsSchedulerConfig.getPropelUnlockingRewards());
    fastify.scheduler.addCronJob(stakeStrategyScheudler.getStakeJob());
    fastify.scheduler.addCronJob(marketCapUpdateSchedulerConfig.updateLatestMarketCapValuesFromCoingecko());
  });
});
