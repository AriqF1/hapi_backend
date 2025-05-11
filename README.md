# 📚 Bookshelf API

This is a simple **Bookshelf RESTful API** built using [Hapi.js](https://hapi.dev/) and Node.js. It allows users to manage a collection of books, including adding, reading, updating, deleting, and filtering them via query parameters.

## 🚀 Features

- **Add a book** to the collection (`POST /books`)
- **View all books** (`GET /books`)
- **View book details** by ID (`GET /books/{bookId}`)
- **Update book** details by ID (`PUT /books/{bookId}`)
- **Delete a book** by ID (`DELETE /books/{bookId}`)
- **Filter books** by:
  - Name (case-insensitive): `?name=<query>`
  - Reading status: `?reading=1` (reading) / `?reading=0` (not reading)
  - Finished status: `?finished=1` (finished) / `?finished=0` (not finished)

## 📦 Installation

1. **Clone this repository**

   ```bash
   git clone https://github.com/your-username/bookshelf-api.git
   cd bookshelf-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the server**

   ```bash
   node server.js
   ```

4. Server will start at:

   ```
   http://localhost:9000
   ```

## 📌 Project Structure

```
.
├── routes/
│   └── booksRoutes.js     # Defines the route configurations
├── handlers/
│   └── booksHandler.js    # Contains the logic for handling each endpoint
├── books.js               # In-memory data storage
├── server.js              # Entry point
└── package.json
```

> ⚠️ Note: This project uses **in-memory storage**, so all book data will reset when the server restarts. For production, consider integrating a database like MongoDB or PostgreSQL.

## 🧪 Sample Request

### Add a Book

```http
POST /books
Content-Type: application/json

{
  "name": "Learn Node.js",
  "year": 2023,
  "author": "John Doe",
  "summary": "A complete Node.js guide.",
  "publisher": "TechBooks",
  "pageCount": 300,
  "readPage": 50,
  "reading": true
}
```

### Get All Books with Query

```http
GET /books?name=node&reading=1&finished=0
```

## 👨‍💻 Author

Developed by [Your Name] — a passionate backend developer learning RESTful APIs and Hapi.js.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
