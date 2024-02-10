import { FastifyPluginAsync } from 'fastify'
import { IPFSAutoDeployService } from '../services/ipfsAutoDeployService.js'


const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

  const ipfsAutoDeployService: IPFSAutoDeployService = new IPFSAutoDeployService(fastify);

  fastify.get('/check', async function (request, reply) {
    await ipfsAutoDeployService.checkForIPFSDeplymentUpdates();
    return { root: true }
  })
}

export default root;
