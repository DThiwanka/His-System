const Tutorial = require("../models/model");

//Create Tute
exports.create = (req, res) => {
  if (!req.body.title) {
    return res.status(400).send({ message: "Content cannot be empty!" });
  }

  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false,
  });

  Tutorial.create(tutorial, (err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred." });
    } else {
      res.send(data);
    }
  });
};


//GetAll Tute
exports.getAll = (req, res) => {
  Tutorial.getAll((err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred." });
    } else {
      res.send(data);
    }
  });
};
