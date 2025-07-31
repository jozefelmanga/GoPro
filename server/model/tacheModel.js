const db = require("../db");
class tacheModel {
  static async gettaches(id_projet) {
    const sql = "SELECT * FROM tache WHERE id_projet=?";
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

  static async checkDes(designation, id_projet) {
    const sql = "SELECT * FROM tache WHERE designation = ? and id_projet=?";
    const query = db.format(sql, [designation, id_projet]);
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

  static async addNewtache(designation, description, deadline, id_projet) {
    return new Promise((resolve, reject) => {
      const sql =
        "INSERT INTO `tache`( `designation`, `description`, `deadline`, `id_projet`, `etat`) VALUES(?,?,?,?,?)";
      const query = db.format(sql, [
        designation,
        description,
        deadline,
        id_projet,
        "pending"
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

  static async updatetache(id_tache, designation, deadline, description ,etat) {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE `tache` SET `designation`=?,`deadline`=?,`description`=? ,`etat`=? WHERE id_tache=?";
      const query = db.format(sql, [
        designation,
        deadline,
        description,
        etat,
        id_tache
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

  static async gettacheById(id_tache) {
    const sql = "SELECT * FROM tache WHERE id_tache = ?";
    const query = db.format(sql, [id_tache]);
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

  static async deleteById(id_tache) {
    const sql = "DELETE FROM `tache` WHERE id_tache = ?";
    const query = db.format(sql, [id_tache]);
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

  static async deleteUser_tache(id_tache, id_user) {
    const sql = "DELETE FROM `user_tache` WHERE id_tache = ? and id_user = ?";
    const query = db.format(sql, [id_tache, id_user]);
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

  static async affectUserToTache(id_tache, id_user) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO `user_tache`(`id_user`, `id_tache`) VALUES(?,?)";
      const query = db.format(sql, [id_user, id_tache]);
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

  static async usersByTask(id_tache) {
    const sql =
      "SELECT u.id_user, nom, prenom, email, telephone FROM utilisateur u,user_tache t where t.id_user=u.id_user and t.id_tache=?";
    const query = db.format(sql, [id_tache]);
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

  static async usersInProNoTask(id_tache,id_projet) {
    const sql =
      "SELECT id_user,nom,prenom,email,telephone FROM utilisateur WHERE id_user IN( SELECT id_user from user_projet where id_user NOT IN ( SELECT id_user from user_tache where id_tache=?) and id_projet=?);";
    const query = db.format(sql, [id_tache,id_projet]);
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

  static async updateStatus(id_tache,etat) {
    return new Promise((resolve, reject) => {
      const sql =
        "UPDATE `tache` SET `etat`=? WHERE id_tache=?";
      const query = db.format(sql, [
        etat,
        id_tache
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

  static async getnbtaches(id_projet) {
    const sql = "SELECT * FROM tache";
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

  static async searchTask(item) {
    item='%'+item+'%'
    const sql = "SELECT id_tache,designation,id_projet FROM tache where designation LIKE ?";
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

  static async myTaskInProject(id_user,id_projet) {
    const sql = "select * from tache where id_tache in (select id_tache from user_tache WHERE id_user=? ) and id_projet =?";
    const query = db.format(sql, [id_user,id_projet]);
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

  static async notMyTaskInProject(id_user,id_projet) {
    const sql = "select * from tache where id_tache not in (select id_tache from user_tache WHERE id_user=? ) and id_projet =?";
    const query = db.format(sql, [id_user,id_projet]);
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

  static async searchTaskForUser(item , id_user) {
    item='%'+item+'%'
    const sql = "SELECT id_tache,designation,id_projet FROM tache where id_projet IN ( SELECT id_projet FROM user_projet WHERE id_user = ? ) and designation LIKE ?";
    const query = db.format(sql, [id_user ,item]);
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

  static async deleteAllTasksForUser(id_user) {
    const sql = "DELETE FROM `user_tache` WHERE id_user = ? ";
    const query = db.format(sql, [id_user]);
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



}

module.exports = tacheModel;
