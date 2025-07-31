const db = require("../db");
class projectModel {
  static async getProjects() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM projet", (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async checkTitle(titre) {
    const sql = "SELECT * FROM projet WHERE titre = ?";
    const query = db.format(sql, [titre]);
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async addNewProject(titre, deadline, description) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO `projet` (`titre`, `deadline`, `description`, `etat`) VALUES(?,?,?,?)";
      const query = db.format(sql, [titre, deadline, description, "pending"]);
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async updateProject(id_projet, titre, deadline, description) {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE `projet` SET `titre`=?,`deadline`=?,`description`=? WHERE id_projet=?";
      const query = db.format(sql, [titre, deadline, description , id_projet]);
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async getProjectById(id_projet) {
    const sql = "SELECT * FROM projet WHERE id_projet = ?";
    const query = db.format(sql, [id_projet]);
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async deleteById(id_projet) {
    const sql = "DELETE FROM `projet` WHERE id_projet = ?";
    const query = db.format(sql, [id_projet]);
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async affectUserToProject(id_projet, id_user) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO `user_projet`(`id_user`, `id_projet`) VALUES(?,?)";
      const query = db.format(sql, [id_user, id_projet]);
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async deleteUser_projet(id_projet, id_user) {
    const sql = "DELETE FROM `user_projet` WHERE id_projet = ? and id_user = ?";
    const query = db.format(sql, [id_projet, id_user]);
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  static async usersByProject(id_projet) {
    const sql =
      "SELECT u.id_user, nom, prenom, email, telephone FROM utilisateur u,user_projet t where t.id_user=u.id_user and t.id_projet=?";
    const query = db.format(sql, [id_projet]);
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async notaStaff(id_projet) {
    const sql =
      "SELECT * FROM utilisateur where id_user not in (select id_user FROM user_projet where id_projet=?) and role=?";
    const query = db.format(sql, [id_projet,'user']);
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async updateStatus(id_projet,etat) {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE `projet` SET `etat`=? WHERE id_projet=?";
      const query = db.format(sql, [
        etat,
        id_projet
      ]);
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async searchProject(item) {
    item='%'+item+'%'
    const sql = "SELECT id_projet,titre FROM projet WHERE titre LIKE ?;";
    const query = db.format(sql, [item]);
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async myprojects(id_user) {
    const sql = "select * from projet where id_projet in (select id_projet from user_projet WHERE id_user=? );";
    const query = db.format(sql, [id_user]);
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async searchProjectForUser(item,id_user) {
    item='%'+item+'%'
    const sql = "select * from projet where id_projet in (select id_projet from user_projet WHERE id_user=? ) and titre LIKE ?;";
    const query = db.format(sql, [id_user , item]);
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  

  
}

module.exports = projectModel;
