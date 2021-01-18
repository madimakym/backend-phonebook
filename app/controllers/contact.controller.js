const Contact = require("../models/contact.model").Contact;

exports.create = (req, res, _next) => {
  if (!req.body.firstname) {
    res.status(400).send({
      message: "firstname can not be empty!",
    });
    return;
  }
  const contact = new Contact({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phonenumber: req.body.phonenumber,
    published: req.body.published ? req.body.published : false,
  });
  contact
    .save(contact)
    .then((_data) => {
      res.send({
        status: 200,
        message: "contact was created successfully.",
      });
    })
    .catch((_err) => {
      res.send({
        status: 500,
        error: "Something failed!",
      });
    });
};

exports.findAll = (req, res) => {
  const firstname = req.query.firstname;
  var condition = firstname
    ? {
        firstname: {
          $regex: new RegExp(title),
          $options: "i",
        },
      }
    : {};
  Contact.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categorys.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Contact.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: "Not found data with id " + id,
        });
      else res.send(data);
    })
    .catch((_err) => {
      res.status(500).send({
        message: "Error retrieving data with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Contact.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Contact with id=${id}. Maybe Contact was not found!`,
        });
      } else
        res.send({
          message: "Contact was updated successfully.",
        });
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating Contact with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Contact.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`,
        });
      } else {
        res.send({
          status: 200,
          message: "Contact was deleted successfully!",
        });
      }
    })
    .catch((_err) => {
      res.status(500).send({
        message: "Could not delete Contact with id=" + id,
      });
    });
};

exports.findAllPublished = (req, res) => {
  const key = req.params.key;
  Contact.find({
    $or: [
      { firstname: { $regex: new RegExp(key, "i") } },
      { phonenumber: key },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
