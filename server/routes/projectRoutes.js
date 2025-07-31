const router = require("express").Router();
const projectController = require("../controller/projectController");
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyRole } = require("../middlewares/verifyRole");

router.get("/getList",verifyToken,verifyRole(["gestionnaire"]), projectController.getAllProjects);
router.get("/getProjectById",verifyToken,verifyRole(["gestionnaire","user"]), projectController.getProjectById);
router.post("/add",verifyToken,verifyRole(["gestionnaire"]), projectController.addProject);
router.post("/update",verifyToken,verifyRole(["gestionnaire"]), projectController.updateProject);
router.delete("/delete",verifyToken,verifyRole(["gestionnaire"]), projectController.deleteProject);
router.post("/affectuser",verifyToken,verifyRole(["gestionnaire"]), projectController.affectuser);
router.delete("/deleteUserFromProjet",verifyToken,verifyRole(["gestionnaire"]), projectController.deleteUser_projet);
router.get("/usersByProject/:id_projet",verifyToken,verifyRole(["gestionnaire","user"]), projectController.usersByProject);
router.get("/notaStaff/:id_projet",verifyToken,verifyRole(["gestionnaire"]), projectController.notStaff);
router.post("/updateStatus",verifyToken,verifyRole(["gestionnaire"]), projectController.updateStatus);
router.get("/statistics",verifyToken, projectController.statistics);
router.get("/searchItem",verifyToken,verifyRole(["gestionnaire"]), projectController.searchItem);
router.get("/myprojects",verifyToken,verifyRole(["user"]), projectController.myprojects);
router.get("/searchItemForUser",verifyToken,verifyRole(["user"]), projectController.searchItemForUser);

module.exports = router;
