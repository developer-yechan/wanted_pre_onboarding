const applyRepos = require("../repos/apply");

const apply = async (req, res, next) => {
  try {
    const { UserId, jobPostingId } = req.body;
    const existingApply = await applyRepos.checkExistingApply(
      UserId,
      jobPostingId
    );
    if (existingApply) {
      return res
        .status(400)
        .json({ message: "이미 해당 공고에 지원하셨습니다." });
    }
    await applyRepos.createApply(UserId, jobPostingId);
    return res.status(200).json({ message: "Apply is created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { apply };
