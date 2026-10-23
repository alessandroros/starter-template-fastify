import { NotFoundError } from "@/lib/errors/errors.js";
import type { Prisma, PrismaClient } from "@prisma/client";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { RESPONSE_MESSAGES } from "@/lib/messages/messages.constant.js";
import type {
    Book,
    BookId,
    BookPage,
    BookCreate,
    BookPageResult,
} from "./book.type.js";

const bookAuthorSelect = {
    id: true,
    name: true,
} satisfies Prisma.AuthorSelect;

const bookSelect = {
    id: true,
    title: true,
    createdAt: true,
    updatedAt: true,
    author: { select: bookAuthorSelect },
} satisfies Prisma.BookSelect;

export type BookRepository = {
    findByIdOrFail: (book: BookId) => Promise<Book>;
    create: (book: BookCreate) => Promise<Book>;
    findPage: (page: BookPage) => Promise<BookPageResult>;
};

export const createBookRepository = (prisma: PrismaClient): BookRepository => ({
    findByIdOrFail: async ({ id }) => {
        const book = await prisma.book.findUnique({
            where: { id },
            select: bookSelect,
        });

        if (!book) {
            throw new NotFoundError(RESPONSE_MESSAGES.book.notFound);
        }

        return book;
    },

    create: async ({ title, authorId }) => {
        const book = await prisma.book.create({
            data: { title, authorId },
            select: bookSelect,
        });

        return book;
    },

    findPage: async ({ cursor, limit }) => {
        const books = await prisma.book.findMany({
            take: limit,
            orderBy: { id: "desc" },
            ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
            select: bookSelect,
        });

        const nextCursor =
            books.length === limit ? (books.at(-1)?.id ?? null) : null;

        return { books, nextCursor };
    },
});

addDIResolverName(createBookRepository, "bookRepository");
