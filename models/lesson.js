const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Varias = require("../public/varias");
const calificacionMin = require('../config/config').calificacionMin;

const subSchemaQuestions = new Schema(
  {
    question: { type: Schema.Types.ObjectId, ref: "Question" },
  },
  { _id: false }
);

const lessonSchema = new Schema(
  {
    nombre: { type: String, required: [true, "El nombre es necesario"] },
    consecutivo: { type: Number, required: [true, "El consecutivo es necesario"] },
    calificacionMin: { type: mongoose.Types.Decimal128, required: true, default: calificacionMin, get: Varias.getDecimal },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    questions: [subSchemaQuestions],
  },
  { collection: "lessons" }
);

const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;
