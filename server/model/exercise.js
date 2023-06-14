const mongoose = require("mongoose");
const{Schema, model} = mongoose;

const exercisesSchema = new Schema({
    bodyPart: String,
    equipment: String,
    gifUrl: String,
    id: String,
    name: String,
    target: String
});

const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;