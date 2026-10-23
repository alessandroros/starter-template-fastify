import { addDIResolverName } from "@/lib/awilix/awilix.js";
import { RESPONSE_MESSAGES } from "@/lib/messages/messages.constant.js";
import type { AuthorRepository } from "@/database/repositories/author/author.repository.js";
import type {
    CreateAuthorInput,
    FetchAuthorsQuery,
    CreateAuthorResponse,
    FetchAuthorsResponse,
} from "@/lib/validation/author/author.schema.js";

export type AuthorService = {
    createAuthor: (input: CreateAuthorInput) => Promise<CreateAuthorResponse>;
    getAuthors: (query: FetchAuthorsQuery) => Promise<FetchAuthorsResponse>;
};

export const createService = (
    authorRepository: AuthorRepository
): AuthorService => ({
    createAuthor: async ({ name }) => {
        const author = await authorRepository.create({ name });

        return {
            message: RESPONSE_MESSAGES.author.created,
            data: author,
        };
    },

    getAuthors: async ({ cursor, limit }) => {
        const data = await authorRepository.findPage({ cursor, limit });

        return {
            message: RESPONSE_MESSAGES.author.fetched,
            data,
        };
    },
});

addDIResolverName(createService, "authorService");
