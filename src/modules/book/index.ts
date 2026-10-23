import type { FastifyInstance } from "fastify";
import { createBookRoutes } from "./book.route.js";

// Define the endpoint prefix by providing autoPrefix module property.
export const autoPrefix = "/api/books";

export default async function (fastify: FastifyInstance): Promise<void> {
    const bookHandler = fastify.di.resolve("bookHandler");
    createBookRoutes(fastify, bookHandler);
}
