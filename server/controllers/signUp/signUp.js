const Model = require("../../models/accounts/signUp");

exports.signUp = async (req, res, next) => {
  try {
    await Model.signUp(req);
    res.status(201).json({ status: "success", message: "User Created" });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
  next();
};
