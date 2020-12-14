const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Varias = require("../public/varias");

const tiposValidos = {
  values: ["Boolean", "Multiple1", "MultipleV", "MultipleAll"],
  message: "{VALUE} No es un tipo permitido",
};

const questionSchema = new Schema(
  {
    titulo: { type: String, required: [true, "El titulo es necesario"] },
    tipoCalificacion: { type: String, required: true, default: 'Boolean', enum: tiposValidos },
    score: { type: mongoose.Types.Decimal128, required: true, get: Varias.getDecimal },
    answers: [Schema.Types.Mixed],
  },
  { collection: "questions" }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
