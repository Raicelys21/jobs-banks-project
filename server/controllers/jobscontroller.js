
const jobs = require('../models/jobs');
const { post } = require('../routes/routes');
const fs = require("fs");
const { off } = require('process');
const rimraf = require('rimraf');

module.exports = class JobsController {

    //get all Job
    static async getAllJob(req, res){
        try{
            const job = await jobs.find();
            res.status(200).json(job);

        }catch(err){
            res.status(400).json({message: err.message});
        }
    }
    // get Job by id
    static async getJobById(req, res){
        const id = req.params.id;
        try{
            const job = await jobs.findById(id);
            res.status(200).json(job);

        }catch(err){
            res.status(400).json({message: err.message});
        }
    }
    //post Job
    static async postJob(req, res){
        const job = req.body;
        job.logo = req.file.filename;

        try{
            await jobs.create(job);
            res.status(201).json({message: "Posted!"})

        }catch(err){
            res.status(400).json({message: err.message});
        }
    }

    // ******************* SE DEBE SOLUCIONAR CONFLICTOS DE ACTUALIZACION DE IMAGEN
    //update Job
    static async updateJob(req, res){
        const id = req.params.id;
        let new_logo = "";
            if(req.file){
                new_logo = req.file.filename;
                try{
                    fs.unlinkSync('./uploads/' + req.body.old_logo)
                }catch(err){
                    console.log(err);
                }
            } else{
                new_logo = req.body.old_logo;
            }
        const newJobs = req.body;
        newJobs.logo = new_logo;

        try{
            await jobs.findByIdAndUpdate(id,newJobs);
            res.status(200).json({message: 'Updated!'});

        }catch(err){
            res.status(404).json({message: err.message});
        }
    }

    //delete Job
    static async deleteJob(req, res){
        const id = req.params.id;
        try{
            const result = await jobs.findOneAndDelete(id);
            if(result.logo != ''){
                try{
                    fs.unlinkSync('./uploads/' + result.logo);
                } catch(err){
                    console.log(err);
                }
            }
            res.status(200).json({message: 'Deleted!'});

        }catch(err){
            res.status(404).json({message: err.message});
        }
    }

    //delete all job
    static async deleteAllJob(req, res){
        try{
            const result = await jobs.deleteMany({});
            rimraf('./uploads/*', function () { console.log('done'); });
            res.status(200).json({message: 'Deleted all!'});

        }catch(err){
            res.status(404).json({message: err.message});
        }
    }

}