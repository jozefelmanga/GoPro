const userModel=require("../model/userModel")
const bcrypt = require('bcrypt');
const validator = require('email-validator');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

class userController{

    static async getAllusers(req,res){
        try {
            var users=await userModel.getusers();
            users?res.status(200).json({ success: true, users}):res.status(404).json({ success: false, message: "Account doesn't exists" })
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
      }

     static async addUser(req, res) { 
        try {
          const { nom, prenom, email, login, pwd, role, telephone } = req.body;
          const salt = 10;

          if (!nom || !prenom || !email || !login || !pwd || !role || !telephone) return res.json({ success: false, message: "All fields are required" })

          if (!validator.validate(email)) {
            return res.json({ success: false, message: "not a valid email" });
          }
          
          const hashedPwd = await bcrypt.hash(pwd, salt);
          
          const existingLogin = await userModel.checkLogin(login)
          if (existingLogin.length > 0) return res.json({ success: false, message: "login already exists" });
          

          const existingEmail = await userModel.checkEmail(email)
          if (existingEmail.length > 0) return res.json({ success: false, message: "email already exists" });
          
          
          const existingTelephone = await userModel.checkTelephone(telephone)
          if (existingTelephone.length > 0) return res.json({ success: false, message: "phone number already exists" });
          
          if (role==="gestionnaire") {
            const existingManager = await userModel.checkManager()
             if (existingManager.length > 0) return res.json({ success: false, message: "there is already a manager" });
          
          }
          
          
        
          const result = await userModel.addNewUser(nom, prenom, email, login, hashedPwd, role, telephone);
          result?res.status(200).json({ success: true, message: "user added successfully"}):res.json({ success: false, message: "something went wrong" })
          
        } catch (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
      }

    static async UpdateUser(req, res) {
        try {
          const {id_user, nom, prenom, email , telephone ,role} = req.body;

          const user = await userModel.getUserById(id_user)
          if (user.length == 0) return res.json({ success: false, message: 'the user with the provided id doesn\'t exist'});

          if (!validator.validate(email)) {
            return res.json({ success: false, message: "not a valid email" });
          }
          
          if (email!=user[0].email) {
            const existingEmail = await userModel.checkEmail(email)
            if (existingEmail.length > 0) return res.json({ success: false, message: "email already exists" });
          }
          
          
          if (telephone!=user[0].telephone) {
            const existingTelephone = await userModel.checkTelephone(telephone)
            if (existingTelephone.length > 0) return res.json({ success: false, message: "phone number already exists" });
          }
          
          if (role==="gestionnaire" && user[0].role!="gestionnaire") {
            const existingManager = await userModel.checkManager()
             if (existingManager.length > 0) return res.json({ success: false, message: "there is already a manager" });
          
          }
        
          const result = await userModel.updateUser(id_user ,nom, prenom, email, telephone ,role);
          result?res.status(200).json({ success: true, message: "user updated successfully"}):res.status(404).json({ success: false, message: "something went wrong" })
          
        } catch (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
      }


    static async login(req, res) {
        try {
          const {login, pwd } = req.body;

          if (!login || !pwd) return res.status(404).json({ success: false, message: "All fields are required" })
          
          const existinguser = await userModel.checkLogin(login)
          if (existinguser.length != 1) return res.status(404).json({ success: false, message: "please verify your credentials"})

          const user=existinguser[0]
          let iscorrectPwd= await bcrypt.compare(pwd,user.mdp);


         if (iscorrectPwd) {

            let token = jwt.sign({ id: user.id_user, role: user.role }, process.env.SECRET, { expiresIn: "1h" })
            return res.status(200).send({ success: true, message: "welcom back", token })

         } else {
            return res.status(404).json({ success: false, message: "please verify your credentials"})
         }
          
        } catch (err) {
          console.log(err);
          res.status(404).json({ success: false, message: err })
        }
      }

    static async deleteUser(req,res){
        try {
            const {id_user } = req.query;
            const user = await userModel.getUserById(id_user)
            if (user.length == 0) return res.json({ success: false, message: 'the user with the provided id doesn\'t exist'});
            
            const result = await userModel.deleteById(id_user);
            result?res.status(200).json({ success: true, message: "user deleted successfully"}):res.json({ success: false, message: "something went wrong" })
        } catch (error) {
            
        }


      }

      static async getUserById(req,res){
        try {
          const {id_user } = req.query;
            var user=await userModel.getsingleUser(id_user);
            user?res.status(200).json({ success: true, user}):res.json({ success: false, message: "Account doesn't exists" })
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
      }

   static async searchItem(req,res){
        try {
            const {item}=req.query;
            var users=await userModel.searchUser(item);
            users?res.status(200).json({ success: true, users:users }):res.json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async oldPwd(req, res) {
      try {
        const { pwd } = req.query;
        const id_user=req.user.id
        
        const existinguser = await userModel.getUserById(id_user)
        if (existinguser.length != 1) return res.json({ success: false, message: "no user with the provided id"})
        const user=existinguser[0]
        let iscorrectPwd= await bcrypt.compare(pwd,user.mdp);

        iscorrectPwd?res.status(200).send({ success: true }): res.status(200).send({ success: false, message: "wrong password" }); 
      } catch (err) {
        console.log(err);
        res.status(404).json({ success: false, message: err })
      }
    }

    static async changeCredentials(req, res) {
      try {
        const {id_user ,login, pwd } = req.body;
        const salt = 10;

        const user = await userModel.getUserById(id_user)
        if (user.length == 0) return res.json({ success: false, message: 'the user with the provided id doesn\'t exist'});
        console.log(user[0])
        if (login!=user[0].login) {
          const existinglogin = await userModel.checkLogin(login)
        if (existinglogin.length >0) return res.json({ success: false, message: "login already exists"})
        }
        const hashedPwd = await bcrypt.hash(pwd, salt);
        var result=await userModel.changeCredentials(id_user,hashedPwd,login);
        result?res.status(200).send({ success: true }): res.status(200).send({ success: false, message: "something went wrong" }); 
      } catch (err) {
        console.log(err);
        res.status(404).json({ success: false, message: err })
      }
    }

    static async getAllAcounts(req,res){
      try {
          var users=await userModel.getAllAcounts();
          users?res.status(200).json({ success: true, users}):res.status(404).json({ success: false, message: "Account doesn't exists" })
      } catch (error) {
          console.log(error);
          res.status(500).send('Internal Server Error');
      }
    } 


}


module.exports=userController;