require("dotenv").config();
const Hapi = require("@hapi/hapi");
const mongoose = require("mongoose");
const booksRoutes = require("./routes/booksRoutes");

const init = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected to MongoDB Atlas");

  const server = Hapi.server({
    port: process.env.port || 9000,
    host: "localhost",
  });

  server.route(booksRoutes);

  await server.start();
  console.log("Server berjalan di:", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
