import { describe, expect, it, vi } from "vitest";
import { createService } from "@/modules/author/author.service.js";
import { RESPONSE_MESSAGES } from "@/lib/messages/messages.constant.js";
import type { Author } from "@/database/repositories/author/author.type.js";
import type { AuthorRepository } from "@/database/repositories/author/author.repository.js";

const authorId = "0190a1b2-c3d4-7e5f-8a6b-7c8d9e0f1a2b";

const author: Author = {
    id: authorId,
    name: "Frank Herbert",
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    updatedAt: new Date("2026-01-01T00:00:00.000Z"),
};

const createFakeRepository = (): AuthorRepository =>
    ({
        create: vi.fn(async () => author),
        findPage: vi.fn(async () => ({ authors: [author], nextCursor: null })),
    }) as unknown as AuthorRepository;

describe("author.service - createAuthor", () => {
    it("stores the name and returns the author", async () => {
        const repository = createFakeRepository();
        const service = createService(repository);

        const result = await service.createAuthor({ name: "Frank Herbert" });

        expect(repository.create).toHaveBeenCalledWith({
            name: "Frank Herbert",
        });

        expect(result).toEqual({
            message: RESPONSE_MESSAGES.author.created,
            data: author,
        });
    });
});

describe("author.service - getAuthors", () => {
    it("returns one page of authors", async () => {
        const repository = createFakeRepository();
        const service = createService(repository);

        const result = await service.getAuthors({
            cursor: undefined,
            limit: 20,
        });

        expect(repository.findPage).toHaveBeenCalledWith({
            cursor: undefined,
            limit: 20,
        });

        expect(result).toEqual({
            message: RESPONSE_MESSAGES.author.fetched,
            data: { authors: [author], nextCursor: null },
        });
    });
});
