const router = require("express").Router();
const tacheController = require("../controller/tacheController");
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyRole } = require("../middlewares/verifyRole");

router.get("/tachesByProject/:id_projet",verifyToken,verifyRole(["gestionnaire"]), tacheController.getTachesByProject);
router.post("/add",verifyToken,verifyRole(["gestionnaire"]), tacheController.addtache);
router.post("/update",verifyToken,verifyRole(["gestionnaire"]), tacheController.updatetache);
router.delete("/delete",verifyToken,verifyRole(["gestionnaire"]), tacheController.deletetache);
router.post("/affectuser",verifyToken,verifyRole(["gestionnaire"]), tacheController.affectuser);
router.get("/usersBytaches",verifyToken,verifyRole(["gestionnaire","user"]), tacheController.usersByTask);
router.delete("/deleteUserTache",verifyToken,verifyRole(["gestionnaire"]), tacheController.deleteUser_tache);
router.get("/usersInProNoTask",verifyToken,verifyRole(["gestionnaire"]), tacheController.usersInProNoTask);
router.post("/updateStatus",verifyToken,verifyRole(["gestionnaire","user"]), tacheController.updateStatus);
router.get("/gettacheById",verifyToken,verifyRole(["gestionnaire","user"]), tacheController.gettacheById);
router.get("/myTaskInProject",verifyToken,verifyRole(["user"]), tacheController.myTaskInProject);
router.get("/notMyTaskInProject",verifyToken,verifyRole(["user"]), tacheController.notMyTaskInProject);

module.exports = router;
