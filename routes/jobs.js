const express = require("express");
const Verify = require("../middleware/verifyToken");
const router = express.Router();
const JobController = require("../controller/jobController");

router.post("/create", Verify, JobController.CreateJobPost )

router.get('/jobdetail/:jobid', Verify, JobController.GetJobDetail)

router.put('/editjob/:jobid', JobController.EditJobPost);

router.get('/all-jobs', JobController.GetAllJobs);

router.delete('/delete/:jobid', JobController.ToDeleteJob)

module.exports = router;
