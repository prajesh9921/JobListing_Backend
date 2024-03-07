const express = require("express");
const Verify = require("../middleware/verifyToken");
const router = express.Router();
const JobController = require("../controller/jobController");

router.post("/create", Verify, JobController.CreateJobPost )

router.get('/jobdetail/:jobid', JobController.GetJobDetail)

router.put('/editjob/:jobid', Verify, JobController.EditJobPost);

router.get('/all-jobs', JobController.GetAllJobs);

module.exports = router;
