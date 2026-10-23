/**
 * Single source of truth for every message returned to the client.
 * Grouped by module.
 */
export const RESPONSE_MESSAGES = {
    message: {
        createQueued: "Message creation has been queued.",
        updateQueued: "Message update has been queued.",
        deleteQueued: "Message deletion has been queued.",
        fetched: "Messages fetched successfully.",
        notFound: "Message not found.",
        unknownJobName: "Unknown message job name",
        updateEmpty: "At least one field must be provided.",
    },
    author: {
        created: "Author created successfully.",
        fetched: "Authors fetched successfully.",
        notFound: "Author not found.",
    },
    book: {
        created: "Book created successfully.",
        fetched: "Books fetched successfully.",
        notFound: "Book not found.",
    },
} as const;
