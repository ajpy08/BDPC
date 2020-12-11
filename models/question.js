const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Varias = require("../public/varias");

var subSchemaAnswer = new Schema(
  {
    answer: { type: String },
  },
  { _id: false }
);

const questionSchema = new Schema(
  {
    titulo: { type: String, required: [true, "El titulo es necesario"] },
    score: { type: mongoose.Types.Decimal128, required: true, get: Varias.getDecimal },
    answers: [subSchemaAnswer],
  },
  { collection: "questions" }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
