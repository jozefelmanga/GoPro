const router = require('express').Router()
const userController=require('../controller/userController')
const {verifyToken}=require('../middlewares/verifyToken')
const {verifyRole}=require('../middlewares/verifyRole')

router.post("/add",verifyToken,verifyRole(["admin"]), userController.addUser);
router.post("/update",verifyToken,verifyRole(["admin"]), userController.UpdateUser);
router.delete("/delete",verifyToken,verifyRole(["admin"]), userController.deleteUser);
router.post("/login", userController.login);
router.get("/list",verifyToken,verifyRole(["admin","gestionnaire"]), userController.getAllusers);
router.get("/getUserById",verifyToken, userController.getUserById);
router.get("/searchUser",verifyToken,verifyRole(["admin"]), userController.searchItem);
router.get("/oldpwd",verifyToken,verifyRole(["admin"]), userController.oldPwd);
router.post("/changeCredentials",verifyToken,verifyRole(["admin"]), userController.changeCredentials);
router.get("/getAllAcounts",verifyToken,verifyRole(["admin"]), userController.getAllAcounts);


module.exports=router;