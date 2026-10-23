import type { FastifyInstance } from "fastify";
import type { BookHandler } from "./book.handler.js";
import {
    createBookBodySchema,
    fetchBooksQuerySchema,
    createBookResponseSchema,
    fetchBooksResponseSchema,
} from "@/lib/validation/book/book.schema.js";

const BOOK_TAG = "book";

enum BookRoute {
    Root = "/",
}

export const createBookRoutes = (
    fastify: FastifyInstance,
    bookHandler: BookHandler
): void => {
    fastify.post(
        BookRoute.Root,
        {
            schema: {
                tags: [BOOK_TAG],
                summary: "Create a book",
                body: createBookBodySchema,
                response: {
                    201: createBookResponseSchema,
                },
            },
        },
        bookHandler.createBook
    );

    fastify.get(
        BookRoute.Root,
        {
            schema: {
                tags: [BOOK_TAG],
                summary: "Fetch books",
                querystring: fetchBooksQuerySchema,
                response: {
                    200: fetchBooksResponseSchema,
                },
            },
        },
        bookHandler.getBooks
    );
};
