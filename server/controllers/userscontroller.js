
const users = require('../models/users');


module.exports = class userscontroller {

    //get all user
    static async getAllUser(req, res){
        try{
            const user = await users.find();
            res.status(200).json(user);
        }catch(err){
            res.status(400).json({message: err.message});
        }
    }
    // get user by id
    static async getUserById(req, res){
        const id = req.params.id;
        try{
            const user = await users.findById(id);
            res.status(200).json(user);

        }catch(err){
            res.status(400).json({message: err.message});
        }
    }
    //post user
    static async postUser(req, res){
        const user = req.body;
        try{
            await users.create(user);
            res.status(201).json({message: "Posted!"})

        }catch(err){
            res.status(400).json({message: err.message});
        }
    }
    //update user
    static async updateUser(req, res){
        const id = req.params.id;
        const user = req.body;
        try{
            await users.findByIdAndUpdate(id, user);
            res.status(200).json({message: 'Updated!'});

        }catch(err){
            res.status(404).json({message: err.message});
        }
    }
    //delete user
    static async deleteUser(req, res){
        const id = req.params.id;
        console.log(id);
        try{
            await users.findOneAndDelete(id);
            res.status(201).json({message: "Deleted!"})

        }catch(err){
            res.status(400).json({message: err.message});
        }
    }
}

