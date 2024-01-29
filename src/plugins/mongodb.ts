import fp from 'fastify-plugin'
import fastifyMongodb, { FastifyMongodbOptions } from '@fastify/mongodb'
import { FastifyInstance } from 'fastify';

/**
 * This plugins adds mongodb support
 *
 * @see https://github.com/fastify/fastify-mongodb
 */
export default fp<FastifyMongodbOptions>(async (fastify) => {
  fastify.register(fastifyMongodb, {
    appName: 'evia-propel-backend',
    database: process.env.MONGO_DB_NAME!,
    forceClose: true,
    url: process.env.MONGO_URI!,
  });

  fastify.ready().then(() => {
    createIndices(fastify);
  });

});


function createIndices(fastify: FastifyInstance) {
  const selectedDatabase = fastify.mongo.client!.db(process.env.MONGO_DB_NAME!);
  selectedDatabase.collection(process.env.PROPEL_STAKE_CHAINS_PREFERRED_VALIDATORS_COLLECTION!).createIndex({ chainConfigId: 1 });
  selectedDatabase.collection(process.env.PROPEL_LP_AUTHZ_GRANTS_COLLECTION!).createIndex({ userId: 1 });
  selectedDatabase.collection(process.env.PROPEL_LP_AUTHZ_GRANTS_COLLECTION!).createIndex({ grantee: 1 });
  selectedDatabase.collection(process.env.PROPEL_STAKE_AUTHZ_GRANTS_COLLECTION!).createIndex({ userId: 1 });
  selectedDatabase.collection(process.env.PROPEL_STAKE_AUTHZ_GRANTS_COLLECTION!).createIndex({ grantee: 1 });
  selectedDatabase.collection(process.env.PROPEL_STAKE_AUTHZ_GRANTS_COLLECTION!).createIndex({ granter: 1 }, { unique: true });
  selectedDatabase.collection(process.env.PROPEL_REWARDS_RECORDS_COLLECTION!).createIndex({ userId: 1 }, { unique: true });
  selectedDatabase.collection(process.env.PROPEL_REWARDS_RECORDS_COLLECTION!).createIndex({ eviaAddress: 1 }, { unique: true });
  selectedDatabase.collection(process.env.PROPEL_STAKE_WEIGHTS_RECORDS_COLLECTION!).createIndex({ bech32Prefix: 1 });
  selectedDatabase.collection(process.env.PROPEL_STAKE_WEIGHTS_RECORDS_COLLECTION!).createIndex({ granter: 1 }, { unique: true });
  selectedDatabase.collection(process.env.PROPEL_STAKE_CHAINS_COLLECTION!).createIndex({ bech32Prefix: 1 }, { unique: true });
  selectedDatabase.collection(process.env.PROPEL_STAKE_CHAINS_COLLECTION!).createIndex({ chainId: 1 }, { name: 'chainIdNonUniqueIndex' });
  selectedDatabase.collection(process.env.PROPEL_STAKE_CHAINS_COLLECTION!).createIndex({ chainName: 1 }, { unique: true });
  selectedDatabase.collection(process.env.PROPEL_JOB_SCHEDULES_COLLECTION!).createIndex({ chainConfigId: 1 });
  selectedDatabase.collection(process.env.PROPEL_UNLOCKING_REWARDS_RECORDS_COLLECTION!).createIndex({ eviaAddress: 1 });
  selectedDatabase.collection(process.env.PROPEL_UNLOCKING_REWARDS_RECORDS_COLLECTION!).createIndex({ chainAddress: 1 });
  selectedDatabase.collection(process.env.PROPEL_USERS_RECORDS_COLLECTION!).createIndex({ eviaAddress: 1 }, { unique: true });
  selectedDatabase.collection(process.env.LP_USER_PREFERENCES_COLLECTION!).createIndex({ bech32Prefix: 1 });
  selectedDatabase.collection(process.env.LP_USER_PREFERENCES_COLLECTION!).createIndex({ userId: 1 });
  selectedDatabase.collection(process.env.LP_USER_PREFERENCES_COLLECTION!).createIndex({ chainAddress: 1 }, { unique: true });
  selectedDatabase.collection(process.env.EARLY_ACCESS_RECORDS_COLLECTION!).createIndex({ eviaAddress: 1, chainAddress: 1 }, { unique: true });
  selectedDatabase.collection(process.env.EARLY_ACCESS_RECORDS_COLLECTION!).createIndex({ eviaAddress: 1 });
  selectedDatabase.collection(process.env.COMPOUNDING_RECORDS_COLLECTION!).createIndex({ eviaAddress: 1 });
  selectedDatabase.collection(process.env.COMPOUNDING_RECORDS_COLLECTION!).createIndex({ chainAddress: 1 }, { unique: true });
}