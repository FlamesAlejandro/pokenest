
import { IsString, MinLength, Min, IsPositive, IsInt } from 'class-validator';

export class CreatePokemonDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    @IsString()
    @MinLength(1)
    name: string;

}
