# Book Module

A book belongs to one author. The list includes the author's id and name.

## Base Path

```
/api/books
```

## Endpoints

| Method | Path       | Description                          | Auth |
| ------ | ---------- | ------------------------------------ | ---- |
| POST   | /api/books | Create a book for an existing author | No   |
| GET    | /api/books | List books, cursor-paginated         | No   |
