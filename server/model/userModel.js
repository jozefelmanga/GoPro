const db = require("../db");
class userModel {
  static async getusers() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT `id_user`, `nom`, `prenom`, `email`, `role`, `telephone` FROM utilisateur where role='user'",
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  static async checkLogin(login) {
    const sql = "SELECT * FROM utilisateur WHERE login = ?";
    const query = db.format(sql, [login]);
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

  static async checkEmail(email) {
    const sql = "SELECT * FROM utilisateur WHERE email = ?";
    const query = db.format(sql, [email]);
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

  static async checkTelephone(telephone) {
    const sql = "SELECT * FROM utilisateur WHERE telephone = ?";
    const query = db.format(sql, [telephone]);
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

  static async checkManager() {
    const sql = "SELECT * FROM utilisateur WHERE role = ?";
    const query = db.format(sql, "gestionnaire");
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

  static async addNewUser(
    nom,
    prenom,
    email,
    login,
    hashedPwd,
    role,
    telephone
  ) {
    const sql =
      "INSERT INTO utilisateur(nom, prenom, email, login, mdp, role, telephone) VALUES(?,?,?,?,?,?,?)";
    const query = db.format(sql, [
      nom,
      prenom,
      email,
      login,
      hashedPwd,
      role,
      telephone,
    ]);
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  static async updateUser(id_user, nom, prenom, email, telephone ,role) {
    const sql =
      "UPDATE `utilisateur` SET `nom`=?,`prenom`=?,`email`=?,`telephone`=? ,`role`=? WHERE `id_user`=?";
    const query = db.format(sql, [nom, prenom, email, telephone,role , id_user]);
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  static async getUserById(id_user) {
    const sql = "SELECT * FROM utilisateur WHERE id_user = ?";
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

  static async deleteById(id_user) {
    const sql = "DELETE FROM `utilisateur` WHERE id_user = ?";
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

  static async getsingleUser(id_user) {
    const sql = "SELECT id_user ,nom, prenom ,email ,telephone,role FROM utilisateur WHERE id_user = ?";
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

  static async searchUser(item) {
    item='%'+item+'%'
    const sql = "SELECT id_user,nom,prenom FROM utilisateur WHERE (nom LIKE ? OR prenom LIKE ?) and role in(?,?);";
    const query = db.format(sql, [item,item,'user','gestionnaire']);
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

  static async changeCredentials(id_user,pwd , login) {
    const sql =
      "UPDATE `utilisateur` SET `mdp`=?,`login`=? WHERE `id_user`=?";
    const query = db.format(sql, [pwd , login, id_user]);
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  static async getAllAcounts() {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT `id_user`, `nom`, `prenom`, `email`, `role`, `telephone` FROM utilisateur where role!='admin'",
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }


}

module.exports = userModel;
