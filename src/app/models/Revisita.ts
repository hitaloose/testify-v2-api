import { Document, Schema, model } from 'mongoose';

export interface IRevisita extends Document {
  idPublicador: number;
  nome?: string;
  numero: number;
  dataProximaLigacao?: Date;
}

const RevisitaSchema: Schema = new Schema({
  idPublicador: { type: Number, required: true },
  nome: { type: String },
  numero: { type: Number, required: true },
  dataProximaLigacao: { type: Date },
});

export default model<IRevisita>('Revisita', RevisitaSchema);
