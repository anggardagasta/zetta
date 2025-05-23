import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';

export type IbanHistoryDocument = IbanHistory & Document;

@Schema({
    timestamps: true,
})
export class IbanHistory {
    @Prop({type: Types.ObjectId, ref: 'Candidate', required: true})
    candidateID!: Types.ObjectId;

    @Prop({required: true})
    iban!: string;

    @Prop({required: true})
    bic!: string;

    @Prop({required: true})
    accountHolderName!: string;

    @Prop()
    financialSupportFirstName?: string;

    @Prop()
    financialSupportLastName?: string;

    @Prop()
    message?: string;
}

export const IbanHistorySchema = SchemaFactory.createForClass(IbanHistory);