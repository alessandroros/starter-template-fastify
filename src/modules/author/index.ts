import type { FastifyInstance } from "fastify";
import { createAuthorRoutes } from "./author.route.js";

// Define the endpoint prefix by providing autoPrefix module property.
export const autoPrefix = "/api/authors";

export default async function (fastify: FastifyInstance): Promise<void> {
    const authorHandler = fastify.di.resolve("authorHandler");
    createAuthorRoutes(fastify, authorHandler);
}
