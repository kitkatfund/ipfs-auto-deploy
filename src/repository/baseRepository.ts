import { FastifyInstance } from "fastify";
import { Collection, Document, DeleteResult, InsertOneResult, InsertManyResult, UpdateResult } from "mongodb";

export class BaseRepository {
    fastify: FastifyInstance;
    constructor(fastify: FastifyInstance) {
        this.fastify = fastify;
    }

    async getCollection(collectionName: string): Promise<Collection> {
        return this.fastify.mongo.db!.collection(collectionName);
    }

    getObjectId(id: string) {
        return new this.fastify.mongo.ObjectId(id);
    }


    async getAllObjects(collectionName: string): Promise<any[]> {
        const collection = await this.getCollection(collectionName);
        return collection.find({}).toArray();
    }

    async getAllObjectsByQuery(collectionName: string, query: any): Promise<any[]> {
        const collection = await this.getCollection(collectionName);
        return collection.find(query).toArray();
    }

    async getObjectById(collectionName: string, id: string): Promise<any> {
        const collection = await this.getCollection(collectionName);
        return collection.findOne({ _id: this.getObjectId(id) });
    }

    async insertObject(collectionName: string, object: any): Promise<InsertOneResult> {
        const collection = await this.getCollection(collectionName);
        return collection.insertOne(object);
    }

    async insertObjects(collectionName: string, objects: any[]): Promise<InsertManyResult> {
        const collection = await this.getCollection(collectionName);
        return collection.insertMany(objects);
    }

    async updateObject(collectionName: string, id: string, object: any): Promise<UpdateResult> {
        const collection = await this.getCollection(collectionName);
        return collection.updateOne({ _id: this.getObjectId(id) }, { $set: object });
    }

    async updateObjects(collectionName: string, objects: any[]): Promise<UpdateResult | Document> {
        const collection = await this.getCollection(collectionName);
        return collection.updateMany({}, { $set: objects });
    }

    async deleteObject(collectionName: string, id: string): Promise<DeleteResult> {
        const collection = await this.getCollection(collectionName);
        return collection.deleteOne({ _id: this.getObjectId(id) });
    }

    async deleteAllObjects(collectionName: string): Promise<DeleteResult> {
        const collection = await this.getCollection(collectionName);
        return collection.deleteMany({});
    }

    async deleteObjectsByQuery(collectionName: string, query: any): Promise<DeleteResult> {
        const collection = await this.getCollection(collectionName);
        return collection.deleteMany(query);
    }

    async getObjectsByQuery(collectionName: string, query: any): Promise<any[]> {
        const collection = await this.getCollection(collectionName);
        return collection.find(query).toArray();
    }

    async getObjectByQuery(collectionName: string, query: any): Promise<any> {
        const collection = await this.getCollection(collectionName);
        return collection.findOne(query);
    }

    async updateObjectsByQuery(collectionName: string, query: any, object: any): Promise<Document | UpdateResult> {
        const collection = await this.getCollection(collectionName);
        return collection.updateMany(query, { $set: object });
    }

    async updateObjectByQuery(collectionName: string, query: any, object: any): Promise<UpdateResult> {
        const collection = await this.getCollection(collectionName);
        return collection.updateOne(query, { $set: object });
    }

    async countObjects(collectionName: string): Promise<number> {
        const collection = await this.getCollection(collectionName);
        return collection.countDocuments();
    }

    async countObjectsByQuery(collectionName: string, query: any): Promise<number> {
        const collection = await this.getCollection(collectionName);
        return collection.countDocuments(query);
    }

    async getObjectsByQueryWithPagination(collectionName: string, query: any, page: number, pageSize: number): Promise<any[]> {
        const collection = await this.getCollection(collectionName);
        return collection.find(query).skip(page * pageSize).limit(pageSize).toArray();
    }

    async getObjectsByQueryWithSort(collectionName: string, query: any, sort: any): Promise<any[]> {
        const collection = await this.getCollection(collectionName);
        return collection.find(query).sort(sort).toArray();
    }

    async getObjectsByQueryWithSortAndPagination(collectionName: string, query: any, sort: any, page: number, pageSize: number): Promise<any[]> {
        const collection = await this.getCollection(collectionName);
        return collection.find(query).sort(sort).skip(page * pageSize).limit(pageSize).toArray();
    }
}
