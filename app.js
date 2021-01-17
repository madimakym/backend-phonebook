const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const dbConfig = require("./app/config/db.config");
const mongoose = require("mongoose");
const db = {};
const PORT = process.env.PORT || 5000;
require("./app/routes/routes.js")(app);

mongoose.Promise = global.Promise;
db.mongoose = mongoose;
db.url = dbConfig.url;
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
app.use(cors());
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
app.use(express.static("public"));
