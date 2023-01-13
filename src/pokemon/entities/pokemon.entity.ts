import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Prop } from "@nestjs/mongoose/dist";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {

    // mongoose ya agrega la id

    @Prop({
        unique: true,
        index: true,
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    no: number;
}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );
