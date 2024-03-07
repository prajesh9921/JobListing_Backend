const mongoose = require("mongoose");

const jobsSchema = mongoose.Schema(
  {
    companyName: {
      type: "string",
      required: true,
    },
    title: {
      type: "string",
      required: true,
    },
    jobDescription: {
      type: "string",
      required: true,
    },
    logoUrl: {
      type: "string",
      required: true,
    },
    salary: {
      type: "string",
      required: true,
    },
    jobType: {
      type: "string",
      required: true,
    },
    location: {
      type: "string",
      required: true,
    },
    aboutCompnay: {
      type: "string",
      required: true,
    },
    additionalInformation: {
      type: "string",
      required: true,
    },
    duration: {
      type: "string",
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Jobs", jobsSchema);

module.exports = Jobs;
