import { z } from "zod";

const BOOKS_PAGE_DEFAULT_LIMIT = 20;
const BOOKS_PAGE_MAX_LIMIT = 100;

const bookAuthorSchema = z.object({
    id: z.uuidv7(),
    name: z.string(),
});

const bookSchema = z.object({
    id: z.uuidv7(),
    title: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    author: bookAuthorSchema,
});

const createBookBodySchema = z.object({
    title: z.string().min(1),
    authorId: z.uuidv7(),
});

type CreateBookInput = z.infer<typeof createBookBodySchema>;

const fetchBooksQuerySchema = z.object({
    cursor: z.uuidv7().optional(),
    limit: z.coerce
        .number()
        .int()
        .positive()
        .max(BOOKS_PAGE_MAX_LIMIT)
        .default(BOOKS_PAGE_DEFAULT_LIMIT),
});

type FetchBooksQuery = z.infer<typeof fetchBooksQuerySchema>;

const createBookResponseSchema = z.object({
    message: z.string(),
    data: bookSchema,
});

type CreateBookResponse = z.infer<typeof createBookResponseSchema>;

const fetchBooksResponseSchema = z.object({
    message: z.string(),
    data: z.object({
        books: z.array(bookSchema),
        nextCursor: z.uuidv7().nullable(),
    }),
});

type FetchBooksResponse = z.infer<typeof fetchBooksResponseSchema>;

export {
    createBookBodySchema,
    fetchBooksQuerySchema,
    createBookResponseSchema,
    fetchBooksResponseSchema,
};

export type {
    CreateBookInput,
    FetchBooksQuery,
    CreateBookResponse,
    FetchBooksResponse,
};
