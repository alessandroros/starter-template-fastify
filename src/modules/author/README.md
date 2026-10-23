# Author Module

An author is a person who writes books. Creating a book checks that the author exists.

## Base Path

```
/api/authors
```

## Endpoints

| Method | Path         | Description                    | Auth |
| ------ | ------------ | ------------------------------ | ---- |
| POST   | /api/authors | Create an author               | No   |
| GET    | /api/authors | List authors, cursor-paginated | No   |
