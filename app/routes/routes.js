module.exports = (app) => {
  const contact = require("../controllers/contact.controller");
  var router = require("express").Router();

  router.post("/contact/", contact.create);
  router.get("/contact/", contact.findAll);
  router.get("/contact/:id", contact.findOne);
  router.get("/contact/search/:key", contact.findAllPublished);
  router.put("/contact/:id", contact.update);
  router.delete("/contact/:id", contact.delete);
  app.use("/api", router);
};
