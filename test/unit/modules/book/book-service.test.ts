import { describe, expect, it, vi } from "vitest";
import { NotFoundError } from "@/lib/errors/errors.js";
import { createService } from "@/modules/book/book.service.js";
import type { Book } from "@/database/repositories/book/book.type.js";
import { RESPONSE_MESSAGES } from "@/lib/messages/messages.constant.js";
import type { BookRepository } from "@/database/repositories/book/book.repository.js";
import type { AuthorRepository } from "@/database/repositories/author/author.repository.js";

const authorId = "0190a1b2-c3d4-7e5f-8a6b-7c8d9e0f1a2b";
const missingAuthorId = "0190a1b2-c3d4-7e5f-9a6b-000000000000";
const bookId = "0190a1b2-c3d4-7e5f-8a6b-7c8d9e0f1a2c";

const book: Book = {
    id: bookId,
    title: "Dune",
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    updatedAt: new Date("2026-01-01T00:00:00.000Z"),
    author: { id: authorId, name: "Frank Herbert" },
};

const createFakeBooks = (): BookRepository =>
    ({
        create: vi.fn(async () => book),
        findPage: vi.fn(async () => ({ books: [book], nextCursor: null })),
    }) as unknown as BookRepository;

const createFakeAuthors = (): AuthorRepository =>
    ({
        findByIdOrFail: vi.fn(async () => ({
            id: authorId,
            name: "Frank Herbert",
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
        })),
    }) as unknown as AuthorRepository;

describe("book.service - createBook", () => {
    it("checks the author, stores the book and returns it with the author", async () => {
        const books = createFakeBooks();
        const authors = createFakeAuthors();
        const service = createService(books, authors);

        const result = await service.createBook({
            title: "Dune",
            authorId,
        });

        expect(authors.findByIdOrFail).toHaveBeenCalledWith({ id: authorId });

        expect(books.create).toHaveBeenCalledWith({
            title: "Dune",
            authorId,
        });

        expect(result).toEqual({
            message: RESPONSE_MESSAGES.book.created,
            data: book,
        });
    });

    it("does not store a book when the author is missing", async () => {
        const books = createFakeBooks();
        const authors = createFakeAuthors();

        authors.findByIdOrFail = vi.fn(async () => {
            throw new NotFoundError(RESPONSE_MESSAGES.author.notFound);
        });

        const service = createService(books, authors);

        await expect(
            service.createBook({ title: "Dune", authorId: missingAuthorId })
        ).rejects.toThrow(RESPONSE_MESSAGES.author.notFound);

        expect(books.create).not.toHaveBeenCalled();
    });
});

describe("book.service - getBooks", () => {
    it("returns one page of books", async () => {
        const books = createFakeBooks();
        const authors = createFakeAuthors();
        const service = createService(books, authors);

        const result = await service.getBooks({ cursor: undefined, limit: 20 });

        expect(books.findPage).toHaveBeenCalledWith({
            cursor: undefined,
            limit: 20,
        });

        expect(result).toEqual({
            message: RESPONSE_MESSAGES.book.fetched,
            data: { books: [book], nextCursor: null },
        });
    });
});
