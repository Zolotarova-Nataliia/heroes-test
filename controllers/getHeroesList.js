const { Superhero } = require("../model/hero");

const getHeroesList = async (req, res, next) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const heroes = await Superhero.find().skip(skip).limit(limit);
    const heroesList = [];
    heroes.forEach((el) => {
      const hero = {
        nickname: el.nickname,
        image: el.images[0],
        _id: el._id,
      };
      heroesList.push(hero);
    });
    res.status(200).json(heroesList);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = getHeroesList;
