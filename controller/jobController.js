const Jobs = require("../models/job");

const CreateJobPost = async (req, res, next) => {
  const {
    companyName,
    title,
    jobDescription,
    logoUrl,
    salary,
    jobType,
    location,
    aboutCompnay,
    additionalInformation,
    duration,
    skills,
    createdBy,
  } = req.body;

  if (
    !companyName ||
    !title ||
    !jobDescription ||
    !salary ||
    !jobType ||
    !location ||
    !aboutCompnay ||
    !additionalInformation ||
    !duration ||
    !skills,
    !createdBy
  ) {
    res.status(400).json({ message: "bad request: required all parameters" });
  }

  const newJob = new Jobs({
    companyName,
    title,
    jobDescription,
    logoUrl,
    salary,
    jobType,
    location,
    aboutCompnay,
    additionalInformation,
    duration,
    skills,
    createdBy,
  });

  newJob
    .save()
    .then(() => {
      res.json({ message: "Job listed successfully" });
    })
    .catch((err) => {
      next(err);
    });
};

const GetJobDetail = async (req, res, next) => {
  try {
    const jobId = req.params.jobid;

    if (!jobId) {
      res.status(400).json({ message: "Bad request" });
    }

    const jobDetails = await Jobs.findById(jobId);

    // second parameter is for projection means what data you want to send and 3rd parameter is for sorting
    // Here 1 means true
    // const jobDetails = await Jobs.findById(jobId, {title: 1});

    res.status(200).json({ data: jobDetails });
  } catch (error) {
    next(error);
  }
};

const EditJobPost = async (req, res, next) => {
  try {
    const jobId = req.params.jobid;
    const updatedDetails = req.body;

    if (!jobId) {
      res.status(400).json({ message: "Bad request" });
    }

    await Jobs.updateOne(
      { _id: jobId },
      {
        $set: {
          ...updatedDetails,
        },
      }
    );
    res.status(200).json({ message: "Updated job details" });
  } catch (error) {
    next(error);
  }
};

// const GetAllJobs = async (req, res, next) => {
//   try {
//     const title = req.query.title;
//     const skills = req.query.skills;

//     let formattedSkills;
//     if (skills) {
//       formattedSkills = skills.split(",");
//     }

//     console.log("formattedskills", formattedSkills, title);

//     let query = {};
//     if (title) {
//       // We use i to make searching case insensitive
//       query = {
//         title: { $regex: title, $options: "i" },
//       };
//     }
//     else if (skills) {
//       query = {
//         skills: { $in: formattedSkills },
//       };
//     } else {
//       query = {
//         title: { $regex: title, $options: "i" },
//         // Case insensitive;
//         skills: { $in: formattedSkills},
//       };
//     }

//     const jobList = await Jobs.find(
//       query,
//       {},
//       {
//         title: 1,
//         companyName: 1,
//         logoUrl: 1,
//         salary: 1,
//         location: 1,
//         skills: 1,
//       }
//     );

//     // const jobList = await Jobs.find(
//     //   {
//     //     title: { $regex: title, $options: "i" },
//     //     skills: { $in: formattedSkills },
//     //   },
//     //   { title: 1, salary: 1, logoUrl: 1, location: 1, skills: 1 }
//     // );

//     res.json({ data: jobList });
//   } catch (error) {
//     next(error);
//   }
// };

const GetAllJobs = async (req, res, next) => {
  try {
    const title = req.query.title || "";
    const skills = req.query.skills;

    let filter = {};
    let formattedSkills;
    if (skills) {
      formattedSkills = skills.split(",");

      if (formattedSkills) {
        const regexArray = formattedSkills.map(
          (value) => new RegExp(value, "i")
        );

        filter = {
          skills: { $in: regexArray },
        };
      }
    }

    const jobList = await Jobs.find(
      {
        title: { $regex: title, $options: "i" },
        ...filter,
      },
      {
        title: 1,
        companyName: 1,
        logoUrl: 1,
        salary: 1,
        location: 1,
        skills: 1,
        jobType: 1,
        duration: 1
      }
    );

    res.json({ data: jobList });
  } catch (error) {
    next(error);
  }
};

module.exports = { CreateJobPost, GetJobDetail, EditJobPost, GetAllJobs };
