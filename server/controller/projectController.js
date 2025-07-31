const projectModel=require("../model/projectModel");
const userModel = require("../model/userModel");
const tacheModel = require("../model/tacheModel");
class projectController{

    static async getAllProjects(req,res){
        try {
            var projects=await projectModel.getProjects();
            projects?res.status(200).json({ success: true, projects}):res.status(404).json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async addProject(req,res){
        try {
            const { titre, deadline, description  } = req.body;
            if (!titre || !deadline || !description) return res.json({ success: false, message: "All fields are required" })
           
            const existingTitle = await projectModel.checkTitle(titre)
            if (existingTitle.length > 0) return res.json({ success: false, message: "title already exists" });

            var result=await projectModel.addNewProject(titre, deadline, description);
            result?res.status(200).json({ success: true, message: "project added successfully"}):res.json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async updateProject(req,res){
        try {
            const {id_projet, titre, deadline, description } = req.body;
            if (!titre || !deadline || !description) return res.status(404).json({ success: false, message: "All fields are required" })
           
            const project = await projectModel.getProjectById(id_projet)
            if (project.length == 0) return res.json({ success: false, message: 'the project with the provided id doesn\'t exist'});


            if (titre!=project[0].titre) {
                const existingTitle = await projectModel.checkTitle(titre)
                if (existingTitle.length > 0) return res.send('title already exists');
            }

            var result=await projectModel.updateProject(id_projet ,titre, deadline, description );
            result?res.status(200).json({ success: true, message: "project updated successfully"}):res.status(404).json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async deleteProject(req,res){
        try {
            const {id_projet } = req.query;
            if (!id_projet ) return res.status(404).json({ success: false, message: "please provide the project Id" })
           
            const project = await projectModel.getProjectById(id_projet)
            if (project.length == 0) return res.json({ success: false, message: 'the project with the provided id doesn\'t exist'});

            
            var result=await projectModel.deleteById(id_projet);
            result?res.status(200).json({ success: true, message: "project deleted successfully"}):res.status(404).json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async affectuser(req,res){
        try {
            const { id_projet , id_user } = req.body;
            const projet = await projectModel.getProjectById(id_projet)
            if (projet.length == 0) return res.json({ success: false, message: 'the projet with the provided id doesn\'t exist'});

            const user = await userModel.getUserById(id_user)
            if (user.length == 0) return res.json({ success: false, message: 'the user with the provided id doesn\'t exist'});


            var result=await projectModel.affectUserToProject(id_projet,id_user);
            result?res.status(200).json({ success: true, message: "user affected"}):res.status(404).json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async deleteUser_projet(req,res){
        try {
            const { id_user, id_projet } = req.query;
            const projet = await projectModel.getProjectById(id_projet)
            if (projet.length == 0) return res.json({ success: false, message: 'the projet with the provided id doesn\'t exist'});

            const user = await userModel.getUserById(id_user)
            if (user.length == 0) return res.json({ success: false, message: 'the user with the provided id doesn\'t exist'});

            const del = await tacheModel.deleteAllTasksForUser(id_user)
           
            var result=await projectModel.deleteUser_projet(id_projet,id_user);
            result?res.status(200).json({ success: true, message: "user removed"}):res.json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async usersByProject(req,res){
        try {
            const  id_projet  = req.params.id_projet;
            if (!id_projet ) return res.json({ success: false, message: "please provide the project Id" })
           
            const projet = await projectModel.getProjectById(id_projet)
            if (projet.length == 0) return res.json({ success: false, message: 'the project with the provided id doesn\'t exist'});
            
                var staff=await projectModel.usersByProject(id_projet);
                staff?res.status(200).json({ success: true, staff}):res.json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async getProjectById(req,res){
        try {
            const  id_projet  = req.query.id_projet;
            const project = await projectModel.getProjectById(id_projet)
            if (project.length == 0) return res.json({ success: false, message: 'the project with the provided id doesn\'t exist'});
            else return res.json({ success: true , projet : project});
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }
    
    static async notStaff(req,res){
        try {
            const  id_projet  = req.params.id_projet;
            if (!id_projet ) return res.json({ success: false, message: "please provide the project Id" })
           
            const projet = await projectModel.getProjectById(id_projet)
            if (projet.length == 0) return res.json({ success: false, message: 'the project with the provided id doesn\'t exist'});
            
                var users=await projectModel.notaStaff(id_projet);
                users?res.status(200).json({ success: true, users}):res.json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async updateStatus(req,res){
        try {
            const {id_projet,etat } = req.body;
            
            const project = await projectModel.getProjectById(id_projet)
            if (project.length == 0) return res.json({ success: false, message: 'the project with the provided id doesn\'t exist'});


            var result=await projectModel.updateStatus(id_projet ,etat);
            result?res.status(200).json({ success: true, message: "project updated successfully"}):res.json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async statistics(req,res){
        try {
            var projects=await projectModel.getProjects();
            var nb_projects=projects.length

            var users=await userModel.getusers();
            var nb_users=users.length

            var taches=await tacheModel.getnbtaches();
            var nb_taches=taches.length

            var result=await projectModel.updateStatus( );
            result?res.status(200).json({ success: true, nb_projects:nb_projects ,nb_users:nb_users ,nb_taches:nb_taches}):res.json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async searchItem(req,res){
        try {
            const {item}=req.query;
            var projects=await projectModel.searchProject(item);

            var taches=await tacheModel.searchTask(item);

            
            taches&&projects?res.status(200).json({ success: true, projects:projects ,taches:taches}):res.json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async myprojects(req,res){
        try {
            const  id_user  = req.query.id_user;
            const result = await projectModel.myprojects(id_user)
            result?res.status(200).json({ success: true, projects:result}):res.json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }


    static async searchItemForUser(req,res){
        try {
            const {item , id_user}=req.query;
            var projects=await projectModel.searchProjectForUser(item,id_user);

            var taches=await tacheModel.searchTaskForUser(item,id_user);

            taches&&projects?res.status(200).json({ success: true, projects:projects ,taches:taches}):res.json({ success: false, message: "something went wrong" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }
}


module.exports=projectController;