const sql = require("./db");

class Tutorial {
  constructor(tutorial) {
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
  }

  static create(newTutorial, result) {
    sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Created tutorial: ", { id: res.insertId, ...newTutorial });
      result(null, { id: res.insertId, ...newTutorial });
    });
  }

  static getAll(result) {
    sql.query("SELECT * FROM tutorials", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    });
  }


  static getAll(result) {
    sql.query("SELECT * FROM tutorials", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    });
  }
}

module.exports = Tutorial;
