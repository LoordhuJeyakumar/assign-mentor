const { default: mongoose } = require("mongoose");
const app = require("./server");
const config = require("./utils/config");

console.log("Connecting to DB");
mongoose
  .connect(`${config.MONGODB_URI}${config.DB_NAME}`)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(config.PORT, () => {
      console.log(`Server running at http://${config.HOSTNAME}:${config.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB...", err);
  });
