import { Document, Schema, model } from 'mongoose';

export interface ILigacao extends Document {
  idRevisita: string;
  data: Date;
  observacao?: string;
}

const LigacaoSchema: Schema = new Schema({
  idRevisita: { type: String, required: true },
  data: { type: Date, required: true },
  observacao: { type: String },
});

export default model<ILigacao>('Ligacao', LigacaoSchema);
