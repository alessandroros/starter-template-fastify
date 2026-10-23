import type { BookService } from "./book.service.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import type {
    CreateBookInput,
    FetchBooksQuery,
} from "@/lib/validation/book/book.schema.js";

export type BookHandler = {
    createBook: (
        request: FastifyRequest<{
            Body: CreateBookInput;
        }>,
        reply: FastifyReply
    ) => Promise<void>;

    getBooks: (
        request: FastifyRequest<{
            Querystring: FetchBooksQuery;
        }>,
        reply: FastifyReply
    ) => Promise<void>;
};

export const createHandler = (bookService: BookService): BookHandler => ({
    createBook: async (request, reply) => {
        const data = await bookService.createBook(request.body);

        return reply.status(201).send(data);
    },

    getBooks: async (request, reply) => {
        const data = await bookService.getBooks(request.query);

        return reply.status(200).send(data);
    },
});

addDIResolverName(createHandler, "bookHandler");
