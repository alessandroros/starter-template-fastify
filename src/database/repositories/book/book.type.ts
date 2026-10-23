export type Book = {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    author: {
        id: string;
        name: string;
    };
};

export type BookId = Pick<Book, "id">;

export type BookCreate = {
    title: string;
    authorId: string;
};

export type BookPage = {
    cursor?: string;
    limit: number;
};

export type BookPageResult = {
    books: Book[];
    nextCursor: string | null;
};
