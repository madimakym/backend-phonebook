const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload");
const dbConfig = require("./app/config/db.config");
const db = {};
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

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
app.use(fileUpload());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
require("./app/routes/routes.js")(app);
app.use(express.static("public"));
