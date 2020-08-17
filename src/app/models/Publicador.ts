/* eslint-disable func-names */
import { compare, hashSync } from 'bcryptjs';
import { Schema, Document, model } from 'mongoose';

export interface IPublicador extends Document {
  usuario: string;
  senha: string;
}

const PublicadorSchema: Schema = new Schema({
  usuario: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
});

PublicadorSchema.pre<IPublicador>('save', function (next) {
  if (!this.isModified('senha')) {
    return next();
  }
  this.senha = hashSync(this.senha, 10);
  return next();
});

PublicadorSchema.methods.validarSenha = async function (senha: string) {
  return compare(senha, this.senha);
};

export default model<IPublicador>('Publicador', PublicadorSchema);
