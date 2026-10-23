import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { RESPONSE_MESSAGES } from "@/lib/messages/messages.constant.js";
import type { BookRepository } from "@/database/repositories/book/book.repository.js";
import type { AuthorRepository } from "@/database/repositories/author/author.repository.js";
import type {
    CreateBookInput,
    FetchBooksQuery,
    CreateBookResponse,
    FetchBooksResponse,
} from "@/lib/validation/book/book.schema.js";

export type BookService = {
    createBook: (input: CreateBookInput) => Promise<CreateBookResponse>;
    getBooks: (query: FetchBooksQuery) => Promise<FetchBooksResponse>;
};

export const createService = (
    bookRepository: BookRepository,
    authorRepository: AuthorRepository
): BookService => ({
    createBook: async ({ title, authorId }) => {
        // A missing author would surface as a foreign-key error. Resolve it
        // first so the client gets the author not-found message instead.
        await authorRepository.findByIdOrFail({ id: authorId });

        const book = await bookRepository.create({ title, authorId });

        return {
            message: RESPONSE_MESSAGES.book.created,
            data: book,
        };
    },

    getBooks: async ({ cursor, limit }) => {
        const data = await bookRepository.findPage({ cursor, limit });

        return {
            message: RESPONSE_MESSAGES.book.fetched,
            data,
        };
    },
});

addDIResolverName(createService, "bookService");
