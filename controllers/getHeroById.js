const { Superhero } = require("../model/hero");

const getHeroById = async (req, res, next) => {
  try {
    const { heroId } = req.params;
    const heroById = await Superhero.findById(heroId);
    if (!heroById) {
      res.status(404).json({ message: "Superhero not found" });
    } else {
      res.status(200).json(heroById);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = getHeroById;
