const { nanoid } = require("nanoid");

const books = [];
// === POST /books ===
server.route({
  method: "POST",
  path: "/books",
  handler: (request, h) => {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload;

    // Validasi input
    if (!name) {
      return h
        .response({
          status: "fail",
          message: "Gagal menambahkan buku. Mohon isi nama buku",
        })
        .code(400);
    }

    if (readPage > pageCount) {
      return h
        .response({
          status: "fail",
          message:
            "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400);
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };

    books.push(newBook);

    return h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: id,
        },
      })
      .code(201);
  },
});

// === GET /books ===
server.route({
  method: "GET",
  path: "/books",
  handler: (request, h) => {
    const fields = books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));

    return h
      .response({
        status: "success",
        data: {
          books: fields,
        },
      })
      .code(200);
  },
});

// === GET /books/{bookId} ===
server.route({
  method: "GET",
  path: "/books/{bookId}",
  handler: (request, h) => {
    const { bookId } = request.params;
    const book = books.find((b) => b.id === bookId);

    if (!book) {
      return h
        .response({
          status: "fail",
          message: "Buku tidak ditemukan",
        })
        .code(404);
    }

    return h
      .response({
        status: "success",
        data: {
          book,
        },
      })
      .code(200);
  },
});

// === PUT /books/{bookId} ===
server.route({
  method: "PUT",
  path: "/books/{bookId}",
  handler: (request, h) => {
    const { bookId } = request.params;
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = request.payload;

    // Validasi input
    if (!name) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Mohon isi nama buku",
        })
        .code(400);
    }
    if (readPage > pageCount) {
      return h
        .response({
          status: "fail",
          message:
            "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        })
        .code(400);
    }

    const index = books.findIndex((book) => book.id === bookId);

    if (index === -1) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Id tidak ditemukan",
        })
        .code(404);
    }

    const updatedAt = new Date().toISOString();
    const finished = pageCount === readPage;

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    return h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui",
      })
      .code(200);
  },
});

// === DELETE /books/{bookId} ===
server.route({
  method: "DELETE",
  path: "/books/{bookId}",
  handler: (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex((book) => book.id === bookId);

    if (index === -1) {
      return h
        .response({
          status: "fail",
          message: "Buku gagal dihapus. Id tidak ditemukan",
        })
        .code(404);
    }

    books.splice(index, 1);

    return h
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
      })
      .code(200);
  },
});
