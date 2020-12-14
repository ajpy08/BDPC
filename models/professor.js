const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const rolesValidos = {
  values: ["PROFESOR_ROLE", "ESTUDIANTE_ROLE"],
  message: "{VALUE} No es un rol permitido",
};

const professorSchema = new Schema(
  {
    nombre: { type: String, required: [true, "El nombre es necesario"] },
    email: { type: String, unique: [true, "El correo ya se encuentra registrado"], required: [true, "El correo es necesario"] },
    password: { type: String, required: [true, "La contraseña es necesaria"] },
    role: { type: String, required: true, default: 'PROFESOR_ROLE', enum: rolesValidos },
    // usuarioAlta: { type: Schema.Types.ObjectId, ref: "Professor" },
    // fAlta: { type: Date, default: Date.now },
    // usuarioMod: { type: Schema.Types.ObjectId, ref: "Professor" },
    // fMod: { type: Date }
  },
  { collection: "professors" }
);

professorSchema.plugin(uniqueValidator, { message: 'Ya se encuentra registrado' });

const Professor = mongoose.model("Professor", professorSchema);

module.exports = Professor;
