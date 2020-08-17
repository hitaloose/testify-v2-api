import { Schema, Document, model } from 'mongoose';

export interface ILista extends Document {
  numero: number;
  idPublicador: number;
  ligacaoRealizada: boolean;
}

const ListaSchema: Schema = new Schema({
  numero: { type: Number, required: true },
  idPublicador: { type: Number, required: true },
  ligacaoRealizada: { type: Boolean, required: true },
});

export default model<ILista>('Lista', ListaSchema);
