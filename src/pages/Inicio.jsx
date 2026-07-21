import { useState } from 'react'
import Pokemon from '../components/Pokemon'
import PokemonCry from '../components/PokemonCry'
import PokemonStats from '../components/PokemonStats'

export default function Inicio() {

const [currentPokemon, setCurrentPokemon] = useState(null)

  return (
    <>
      <section id="center">
        <div>
          <h1 className='heroPokemon'>¡Elige un Pokémon al azar!</h1>
        </div>
        <div className="hero">
          <Pokemon onPokemonLoaded={setCurrentPokemon} />
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <PokemonCry 
          cryUrl={currentPokemon?.cries?.latest} 
          pokemonName={currentPokemon?.name} 
        />
        </div>
    <div id="social">
          <PokemonStats 
          stats={currentPokemon?.stats} 
        />
        </div>    
      </section>
    <div className="ticks"></div>
    <section id="spacer"></section>  
    </>
  )
}