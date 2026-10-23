import type { AuthorService } from "./author.service.js";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import type { FastifyReply, FastifyRequest } from "fastify";
import type {
    CreateAuthorInput,
    FetchAuthorsQuery,
} from "@/lib/validation/author/author.schema.js";

export type AuthorHandler = {
    createAuthor: (
        request: FastifyRequest<{
            Body: CreateAuthorInput;
        }>,
        reply: FastifyReply
    ) => Promise<void>;

    getAuthors: (
        request: FastifyRequest<{
            Querystring: FetchAuthorsQuery;
        }>,
        reply: FastifyReply
    ) => Promise<void>;
};

export const createHandler = (authorService: AuthorService): AuthorHandler => ({
    createAuthor: async (request, reply) => {
        const data = await authorService.createAuthor(request.body);

        return reply.status(201).send(data);
    },

    getAuthors: async (request, reply) => {
        const data = await authorService.getAuthors(request.query);

        return reply.status(200).send(data);
    },
});

addDIResolverName(createHandler, "authorHandler");
