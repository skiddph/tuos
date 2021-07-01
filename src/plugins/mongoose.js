const mongoose = require("mongoose");
const fp = require("fastify-plugin");
const Users = require("../schema/db/users");

module.exports = fp(async function (fastify) {
  try {
    await mongoose.connect(process.env.MONGO_DIRECT, {
      useNewUrlParser: true,
      config: {
        autoIndex: true,
      },
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("[SYSTEM] Connected to database",process.env.MONGO_DIRECT);
  } catch (err) {
    console.error(err);
  }

  fastify.decorate("mongoose", { instance: mongoose, Users });
});
