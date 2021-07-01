const mongoose = require("mongoose");
const fp = require("fastify-plugin");

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
    console.log("[SYSTEM] Connected to database.");
  } catch (err) {
    console.error(err);
  }

  fastify.decorate("mongoose", {
    instance: mongoose,
    Users: require("../schema/db/users")
  });
});
