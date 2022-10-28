const { Schema, model } = require("mongoose");
const Joi = require("joi");

const superheroSchema = Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    real_name: { type: String, required: true },
    origin_description: {
      type: String,
      required: true,
    },
    superpowers: [String],
    catch_phrase: { type: String, required: true },
    images: [String],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const joiSchema = Joi.object().keys({
  nickname: Joi.string().min(3).max(30).required(),
  real_name: Joi.string().required(),
  origin_description: Joi.string().required(),
  superpowers: Joi.array().required().items(Joi.string().min(1)),
  catch_phrase: Joi.string().required(),
  images: Joi.array(),
});

const updatedJoiSchema = Joi.object().keys({
  nickname: Joi.string().min(3).max(30).required(),
  real_name: Joi.string().min(3).max(30).required(),
  origin_description: Joi.string().required(),
  superpowers: Joi.array().required().items(Joi.string().min(1)),
  catch_phrase: Joi.string().required(),
  deletedImages: Joi.array(),
});

const Superhero = model("superhero", superheroSchema);

module.exports = { Superhero, joiSchema, updatedJoiSchema };
