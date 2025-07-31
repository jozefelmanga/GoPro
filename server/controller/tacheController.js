const tacheModel=require("../model/tacheModel")
const projectModel=require("../model/projectModel")
const userModel=require('../model/userModel')
class tacheController{

    static async getTachesByProject(req,res){
        try {
            const  id_projet  = req.params.id_projet;
            const project = await projectModel.getProjectById(id_projet)
            if (project.length == 0) return res.json({ success: false, message: 'the project with the provided id doesn\'t exist'});

            var taches=await tacheModel.gettaches(id_projet);
            taches?res.status(200).json({ success: true, taches}):res.status(404).json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async addtache(req,res){
        try {
            const { designation,  description ,deadline, id_projet } = req.body;
            if (!designation || !deadline || !description) return res.json({ success: false, message: "All fields are required" })
           
            const project = await projectModel.getProjectById(id_projet)
            if (project.length == 0) return res.json({ success: false, message: 'the project with the provided id doesn\'t exist'});


            const existingDes = await tacheModel.checkDes(designation,id_projet)
            if (existingDes.length > 0) return res.json({ success: false, message: "designation already exists " })

            var result=await tacheModel.addNewtache(designation, description , deadline,id_projet);
            result?res.status(200).json({ success: true, message: "task added successfully"}):res.json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async updatetache(req,res){
        try {
            const { id_tache ,designation,  description ,deadline ,etat} = req.body;
            if (!designation || !deadline || !description ) return res.json({ success: false, message: "All fields are required" })
            console.log(deadline)
            const tache = await tacheModel.gettacheById(id_tache)
            if (tache.length == 0) return res.json({ success: false, message: 'the tache with the provided id doesn\'t exist'});


            if (designation!=tache[0].designation) {
                const existingTitle = await tacheModel.checkDes(designation)
                if (existingTitle.length > 0) return res.json({ success: false, message: 'designation already exists'});;
            }

            var result=await tacheModel.updatetache(id_tache ,designation, deadline, description ,etat);
            result?res.status(200).json({ success: true, message: "tache updated successfully"}):res.json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async deletetache(req,res){
        try {
            const {id_tache } = req.query;
            if (!id_tache ) return res.status(404).json({ success: false, message: "please provide the tache Id" })
           
            const tache = await tacheModel.gettacheById(id_tache)
            if (tache.length == 0) return res.json({ success: false, message: 'the tache with the provided id doesn\'t exist'});
            
            // var user_tache=await tacheModel.deleteUser_tache(id_tache);
            // if (user_tache) {
                var result=await tacheModel.deleteById(id_tache);
                result?res.status(200).json({ success: true, message: "tache deleted successfully"}):res.status(404).json({ success: false, message: "something went wrong" });
            // }
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async affectuser(req,res){
        try {
            const { id_tache , id_user } = req.body;
            const tache = await tacheModel.gettacheById(id_tache)
            if (tache.length == 0) return res.json({ success: false, message: 'the tache with the provided id doesn\'t exist'});

            const user = await userModel.getUserById(id_user)
            if (user.length == 0) return res.json({ success: false, message: 'the user with the provided id doesn\'t exist'});


            var result=await tacheModel.affectUserToTache(id_tache,id_user);
            result?res.status(200).json({ success: true, message: "user affected"}):res.status(404).json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async usersByTask(req,res){
        try {
            const {id_tache } = req.query;
            if (!id_tache ) return res.status(404).json({ success: false, message: "please provide the tache Id" })
           
            const tache = await tacheModel.gettacheById(id_tache)
            if (tache.length == 0) return res.json({ success: false, message: 'the tache with the provided id doesn\'t exist'});
            
                var users=await tacheModel.usersByTask(id_tache);
                users?res.status(200).json({ success: true, users}):res.status(404).json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async deleteUser_tache(req,res){
        try {
            const { id_tache , id_user } = req.query;
            const tache = await tacheModel.gettacheById(id_tache)
            if (tache.length == 0) return res.json({ success: false, message: 'the tache with the provided id doesn\'t exist'});

            const user = await userModel.getUserById(id_user)
            if (user.length == 0) return res.json({ success: false, message: 'the user with the provided id doesn\'t exist'});

            var result=await tacheModel.deleteUser_tache(id_tache,id_user);
            result?res.status(200).json({ success: true, message: "user removed"}):res.status(404).json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async usersInProNoTask(req,res){
        try {
            const { id_tache, id_projet } = req.query;
            if (!id_tache ) return res.status(404).json({ success: false, message: "please provide the tache Id" })

            const project = await projectModel.getProjectById(id_projet)
            if (project.length == 0) return res.json({ success: false, message: 'the project with the provided id doesn\'t exist'});

           
            const tache = await tacheModel.gettacheById(id_tache)
            if (tache.length == 0) return res.json({ success: false, message: 'the tache with the provided id doesn\'t exist'});
            
                var users=await tacheModel.usersInProNoTask(id_tache ,id_projet);
                users?res.status(200).json({ success: true, users}):res.status(404).json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async updateStatus(req,res){
        try {
            const { id_tache ,etat} = req.body;
           
            const tache = await tacheModel.gettacheById(id_tache)
            if (tache.length == 0) return res.json({ success: false, message: 'the task with the provided id doesn\'t exist'});


            var result=await tacheModel.updateStatus(id_tache ,etat);
            result?res.status(200).json({ success: true, message: "status updated successfully"}):res.status(404).json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async gettacheById(req,res){
        try {
            const { id_tache } = req.query;
            if (!id_tache ) return res.json({ success: false, message: "please provide the tache Id" })

            var tache=await tacheModel.gettacheById(id_tache);
            tache?res.status(200).json({ success: true, tache}):res.json({ success: false, message: "the tache with the provided id doesn\'t exist" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async myTaskInProject(req,res){
        try {
            const { id_user,id_projet } = req.query;
            

            var taches=await tacheModel.myTaskInProject(id_user,id_projet);
            taches?res.status(200).json({ success: true, taches}):res.json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async notMyTaskInProject(req,res){
        try {
            const { id_user,id_projet } = req.query;
            

            var taches=await tacheModel.notMyTaskInProject(id_user,id_projet);
            taches?res.status(200).json({ success: true, taches}):res.json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }


}


module.exports=tacheController;