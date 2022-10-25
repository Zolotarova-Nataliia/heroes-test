const { Superhero } = require("../model/hero");

const addHero = async (req, res, next) => {
  const { nickname, real_name, origin_description, superpowers, catch_phrase } =
    req.body;
  const files = req.files;
  const imagesNames = files.map((el) => el.filename);
  try {
    const newHero = await Superhero.create({
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images: imagesNames,
    });
    res.status(201).json(newHero);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = addHero;
