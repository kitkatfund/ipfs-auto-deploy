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
  selectedDatabase.collection(process.env.IPFS_DEPLOYMENT_DETAILS_COLLECTION!).createIndex({ chainConfigId: 1 });
}