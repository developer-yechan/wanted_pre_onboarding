const express = require("express");
const {
  getJobPostAll,
  postJob,
  deleteJobPost,
  updateJobPost,
  getJobPostDetail,
} = require("../services/employment");
const router = express.Router();

router.get("/jobpost", getJobPostAll);
router.post("/jobpost", postJob);
router.delete("/jobpost/:id", deleteJobPost);
router.put("/jobpost", updateJobPost);
router.get("/jobpost/:id", getJobPostDetail);

module.exports = router;
