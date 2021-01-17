const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: false,
    },
    phonenumber: {
      type: String,
      required: false,
    },
    published: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

ContactSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = { Contact: mongoose.model("contact", ContactSchema) };
