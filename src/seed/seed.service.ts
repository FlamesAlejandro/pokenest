import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  // Este constructor lo tenemos para hacer inserciones y consultas al modelo pokemon, utilizando la herramienta que queramos, en este
  // caso sera axios, puede ser request o fetch
  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {

    // borramos todos los registros, para poder insertarlos masivamente
    await this.pokemonModel.deleteMany({}); // delete * from pokemons;

    // la data que traemos esta con un limit de 650
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    // Hacemos un arreglo donde estaran todos los datos juntos para insertarlos 
    const pokemonToInsert: { name: string, no: number }[] = [];

    // aqui cada elemento los juntamos en pokemonToInsert
    data.results.forEach(({ name, url }) => {

      const segments = url.split('/');
      const no = +segments[ segments.length - 2 ];

      // const pokemon = await this.pokemonModel.create({ name, no });
      pokemonToInsert.push({ name, no }); // [{ name: bulbasaur, no: 1 }]

    });

    await this.pokemonModel.insertMany(pokemonToInsert);


    return 'Seed Executed';
  }

}
