import { NotFoundError } from "@/lib/errors/errors.js";
import type { Prisma, PrismaClient } from "@prisma/client";
import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { RESPONSE_MESSAGES } from "@/lib/messages/messages.constant.js";
import type {
    Author,
    AuthorId,
    AuthorPage,
    AuthorCreate,
    AuthorPageResult,
} from "./author.type.js";

const authorSelect = {
    id: true,
    name: true,
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.AuthorSelect;

export type AuthorRepository = {
    findByIdOrFail: (author: AuthorId) => Promise<Author>;
    create: (author: AuthorCreate) => Promise<Author>;
    findPage: (page: AuthorPage) => Promise<AuthorPageResult>;
};

export const createAuthorRepository = (
    prisma: PrismaClient
): AuthorRepository => ({
    findByIdOrFail: async ({ id }) => {
        const author = await prisma.author.findUnique({
            where: { id },
            select: authorSelect,
        });

        if (!author) {
            throw new NotFoundError(RESPONSE_MESSAGES.author.notFound);
        }

        return author;
    },

    create: async ({ name }) => {
        const author = await prisma.author.create({
            data: { name },
            select: authorSelect,
        });

        return author;
    },

    findPage: async ({ cursor, limit }) => {
        const authors = await prisma.author.findMany({
            take: limit,
            orderBy: { id: "desc" },
            ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
            select: authorSelect,
        });

        const nextCursor =
            authors.length === limit ? (authors.at(-1)?.id ?? null) : null;

        return { authors, nextCursor };
    },
});

addDIResolverName(createAuthorRepository, "authorRepository");
