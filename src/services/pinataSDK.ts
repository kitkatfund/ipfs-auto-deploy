import { Pinata } from "pinata/sdk";
import { FastifyInstance } from "fastify";

const pinata = new pinataSDK({ pinataApiKey: 'yourPinataApiKey', pinataSecretApiKey: 'yourPinataSecretApiKey' });

export class PinataSDK {
    private pinata: Pinata;
    private fastify: FastifyInstance;

    constructor(fastify: FastifyInstance) {
        this.fastify = fastify;
        this.pinata = new Pinata(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);
    }

    
    
    async pinJSONToIPFS(json: any) {
        try {
            const result = await this.pinata.pinJSONToIPFS(json);
            return result;
        } catch (error) {
            this.fastify.log.error(error);
            throw error;
        }
    }

    async pinFileToIPFS(file: any) {
        try {
            const result = await this.pinata.pinFileToIPFS(file);
            return result;
        } catch (error) {
            this.fastify.log.error(error);
            throw error;
        }
    }
}