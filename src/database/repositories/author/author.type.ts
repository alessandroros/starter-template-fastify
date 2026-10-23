export type Author = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};

export type AuthorId = Pick<Author, "id">;

export type AuthorCreate = {
    name: string;
};

export type AuthorPage = {
    cursor?: string;
    limit: number;
};

export type AuthorPageResult = {
    authors: Author[];
    nextCursor: string | null;
};
