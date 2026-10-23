import type { FastifyInstance } from "fastify";
import type { AuthorHandler } from "./author.handler.js";
import {
    createAuthorBodySchema,
    fetchAuthorsQuerySchema,
    createAuthorResponseSchema,
    fetchAuthorsResponseSchema,
} from "@/lib/validation/author/author.schema.js";

const AUTHOR_TAG = "author";

enum AuthorRoute {
    Root = "/",
}

export const createAuthorRoutes = (
    fastify: FastifyInstance,
    authorHandler: AuthorHandler
): void => {
    fastify.post(
        AuthorRoute.Root,
        {
            schema: {
                tags: [AUTHOR_TAG],
                summary: "Create an author",
                body: createAuthorBodySchema,
                response: {
                    201: createAuthorResponseSchema,
                },
            },
        },
        authorHandler.createAuthor
    );

    fastify.get(
        AuthorRoute.Root,
        {
            schema: {
                tags: [AUTHOR_TAG],
                summary: "Fetch authors",
                querystring: fetchAuthorsQuerySchema,
                response: {
                    200: fetchAuthorsResponseSchema,
                },
            },
        },
        authorHandler.getAuthors
    );
};
