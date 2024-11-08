
const Doctor = require("../models/model");

//Get All Doctors
exports.getAll = (req, res) => {
  Doctor.getAll((err, data) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving doctors." });
    } else {
      res.send(data);
    }
  });
};


//Create Doctors
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content cannot be empty!" });
  }

  const trimmedBody = {};
  Object.keys(req.body).forEach(key => {
    trimmedBody[key.trim()] = req.body[key];
  });

  const newDoctor = new Doctor({
    name: trimmedBody.name,
    age: trimmedBody.age,
    specialization: trimmedBody.specialization,
    status: trimmedBody.status || true,
  });

  Doctor.create(newDoctor, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while creating the doctor.",
      });
    }
    res.send(data);
  });
};


//Update Doctors
exports.update = (req, res) => {
  const doctorId = req.params.id;
  const updatedDoctor = req.body;

  if (!updatedDoctor) {
    return res.status(400).send({ message: "Content cannot be empty!" });
  }

  const trimmedBody = {};
  Object.keys(updatedDoctor).forEach(key => {
    trimmedBody[key.trim()] = updatedDoctor[key];
  });

  Doctor.update(doctorId, trimmedBody, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while updating the doctor.",
      });
    }

    if (data.affectedRows === 0) {
      return res.status(404).send({
        message: `Doctor with ID ${doctorId} not found.`,
      });
    }

    Doctor.findById(doctorId, (err, updatedDoctorData) => {
      if (err) {
        return res.status(500).send({
          message: err.message || "Some error occurred while retrieving the updated doctor.",
        });
      }

      res.send({
        message: "Doctor updated successfully.",
        updatedDoctor: updatedDoctorData
      });
    });
  });
};



//Delete Doctor
exports.delete = (req, res) => {
  const doctorId = req.params.id;

  Doctor.updateStatus(doctorId, false, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while deleting the doctor.",
      });
    }

    if (data.affectedRows === 0) {
      return res.status(404).send({
        message: `Doctor with ID ${doctorId} not found.`,
      });
    }

    res.send({ message: "Doctor deleted successfully." });
  });
};


// Get doctor by ID
exports.findOne = (req, res) => {
  const doctorId = req.params.id;

  Doctor.findById(doctorId, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving the doctor.",
      });
    }

    if (!data) {
      return res.status(404).send({
        message: `Doctor with ID ${doctorId} not found.`,
      });
    }

    res.send(data);
  });
};
