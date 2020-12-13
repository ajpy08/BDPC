const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Varias = require("../public/varias");
var calificacionMin = require('../config/config').calificacionMin;

var subSchemaQuestions = new Schema(
  {
    question: { type: Schema.Types.ObjectId, ref: "Question" },
    // detalle: { type: Schema.Types.ObjectId, ref: "DetalleMaterial" },
    // material: { type: Schema.Types.ObjectId, ref: "Material", required: true },
    // cantidad: { type: Schema.Types.Number, required: true },
    // costo: {
    //   type: mongoose.Types.Decimal128,
    //   required: true,
    //   get: Varias.getDecimal,
    // },
  },
  { _id: false }
);

const lessonSchema = new Schema(
  {
    nombre: { type: String, required: [true, "El nombre es necesario"] },
    consecutivo: { type: Number, required: [true, "El consecutivo es necesario"] },
    calificacionMin: { type: mongoose.Types.Decimal128, required: true, default: calificacionMin, get: Varias.getDecimal },
    questions: [subSchemaQuestions],
  },
  { collection: "lessons" }
);

const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;
