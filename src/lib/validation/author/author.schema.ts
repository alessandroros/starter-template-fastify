import { z } from "zod";

const AUTHORS_PAGE_DEFAULT_LIMIT = 20;
const AUTHORS_PAGE_MAX_LIMIT = 100;

const authorSchema = z.object({
    id: z.uuidv7(),
    name: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

const createAuthorBodySchema = z.object({
    name: z.string().min(1),
});

type CreateAuthorInput = z.infer<typeof createAuthorBodySchema>;

const fetchAuthorsQuerySchema = z.object({
    cursor: z.uuidv7().optional(),
    limit: z.coerce
        .number()
        .int()
        .positive()
        .max(AUTHORS_PAGE_MAX_LIMIT)
        .default(AUTHORS_PAGE_DEFAULT_LIMIT),
});

type FetchAuthorsQuery = z.infer<typeof fetchAuthorsQuerySchema>;

const createAuthorResponseSchema = z.object({
    message: z.string(),
    data: authorSchema,
});

type CreateAuthorResponse = z.infer<typeof createAuthorResponseSchema>;

const fetchAuthorsResponseSchema = z.object({
    message: z.string(),
    data: z.object({
        authors: z.array(authorSchema),
        nextCursor: z.uuidv7().nullable(),
    }),
});

type FetchAuthorsResponse = z.infer<typeof fetchAuthorsResponseSchema>;

export {
    createAuthorBodySchema,
    fetchAuthorsQuerySchema,
    createAuthorResponseSchema,
    fetchAuthorsResponseSchema,
};

export type {
    CreateAuthorInput,
    FetchAuthorsQuery,
    CreateAuthorResponse,
    FetchAuthorsResponse,
};
