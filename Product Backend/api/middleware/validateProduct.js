const Joi = require("joi");
module.exports = (req, res, next) => {
  const schema = Joi.object().keys({
    briefDescription: Joi.string().min(2).required().max(50),
    detailedDescription: Joi.string().min(2).required(),
    price: Joi.number().required().min(10).max(10000).positive(),
    originalPrice: Joi.number().required().min(10).max(10000).positive(),
    link: Joi.string().min(2).required(),
    file: Joi.any().allow(),
  });

  try {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      res.status(400).json({ message: result.error.details[0].message });
    } else {
      next();
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authentication failed while adding Product" });
  }
};
