const { Superhero } = require("../model/hero");

const getCount = async (req, res, next) => {
  try {
    const heroesCount = await Superhero.count();
    res.status(200).json(heroesCount);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = getCount;
