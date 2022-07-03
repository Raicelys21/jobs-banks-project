const express = require('express');
const router = express.Router();
const users = require('../controllers/userscontroller');
const jobs = require('../controllers/jobscontroller');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

let upload = multer({
    storage: storage,
    limits : {
        fieldSize: 1024*1024*3,
    },
}).single("logo");

router.get("/users", users.getAllUser);
router.get("/users/:id", users.getUserById);
router.post("/users/add", users.postUser);
router.patch("/users/update/:id", users.updateUser);
router.delete("/users/delete/:id", users.deleteUser);

router.get("/jobs", jobs.getAllJob);
router.get("/jobs/:id", jobs.getJobById);
router.post("/jobs/add", upload, jobs.postJob);
router.patch("/jobs/update/:id", upload, jobs.updateJob);
router.delete("/jobs/delete/:id", jobs.deleteJob);
router.delete("/jobs/deleteall", jobs.deleteAllJob);


module.exports = router;