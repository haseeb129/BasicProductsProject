const Joi = require("joi");
module.exports = (req, res, next) => {
  const schema = Joi.object().keys({
    userName: Joi.string().min(3).required().max(50),
    email: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
  });

  try {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      res.status(400).json({ message: result.error.details[0].message });
    } else {
      next();
    }
  } catch (error) {
    console.log("error", error);
    return res.status(401).json({ message: "Authentication Failed " });
  }
};
