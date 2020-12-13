const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Varias = require("../public/varias");

var subSchemaLessons = new Schema(
  {
    lesson: { type: Schema.Types.ObjectId, ref: 'Lesson' }
  },
  { _id: false }
);

const courseSchema = new Schema(
  {
    // nombre: { type: String, required: [true, "El nombre es necesario"] },
    noCurso: { type: Number, unique: [true, 'El curso ya se encuentra registrado'], required: [true, "El número de curso es necesario"] },
    lessons: [subSchemaLessons],
  },
  { collection: "courses" }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
