import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {Field, ObjectType} from "@nestjs/graphql";

export type CandidateDocument = Candidate & Document;

@ObjectType()
@Schema()
export class Candidate {
    @Field()
    @Prop({required: true})
    name!: string;

    @Field()
    @Prop({required: true, unique: true})
    email!: string;

    @Field({nullable: true})
    @Prop()
    status?: string;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);