const sql = require("./db");

class Doctor {
  constructor(doctor) {
    this.name = doctor.name;
    this.age = doctor.age;
    this.specialization = doctor.specialization;
    this.status = doctor.status;
  }


  //Create Doctor
  static create(newDoctor, result) {
    const query = "INSERT INTO doctors SET ?";
    sql.query(query, newDoctor, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...newDoctor });
    });
  }


  //Get All Doctors
  static getAll(result) {
    sql.query("SELECT * FROM doctors", (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    });
  }


  //Update Doctor
  static update(doctorId, updatedDoctor, result) {
    const query = "UPDATE doctors SET name = ?, age = ?, specialization = ? WHERE id = ?";
    sql.query(query, [updatedDoctor.name, updatedDoctor.age, updatedDoctor.specialization, doctorId], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    });
  }

  // Get doctor by ID
  static findById(doctorId, result) {
    const query = "SELECT * FROM doctors WHERE id = ?";
    sql.query(query, [doctorId], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
      } else {
        result(null, null);
      }
    });
  }


  //Update Status
  static updateStatus(doctorId, status, result) {
    const query = "UPDATE doctors SET status = ? WHERE id = ?";
    sql.query(query, [status, doctorId], (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    });
  }
}


module.exports = Doctor;
