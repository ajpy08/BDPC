const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const validRoles = {
  values: ["PROFESOR_ROLE", "ESTUDIANTE_ROLE"],
  message: "{VALUE} No es un rol permitido",
};

const studentSchema = new Schema(
  {
    nombre: { type: String, required: [true, "El nombre es necesario"] },
    email: { type: String, unique: [true, "El correo ya se encuentra registrado"], required: [true, "El correo es necesario"] },
    password: { type: String, required: [true, "La contraseña es necesaria"] },
    role: { type: String, required: true, enum: rolesValidos },
    curso: { type: Number, required: true },
    usuarioAlta: { type: Schema.Types.ObjectId, ref: "Professor" },
    fAlta: { type: Date, default: Date.now },
    usuarioMod: { type: Schema.Types.ObjectId, ref: "Professor" },
    fMod: { type: Date }
  },
  { collection: "students" }
);

studentSchema.plugin(uniqueValidator, { message: 'Ya se encuentra registrado' });

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;