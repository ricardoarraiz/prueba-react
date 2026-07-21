import './PokemonCry.css'

export default function PokemonCry({ cryUrl, pokemonName }) {
  const playCry = () => {
    if (cryUrl) {
      const audio = new Audio(cryUrl)
      audio.volume = 0.5
      audio.play().catch(err => console.error('Error al reproducir audio:', err))
    }
  }

  return (
    <div className="pokedex-block cry-block">
      <div className="block-header">
        <span className="block-icon">🔊</span>
        <h2>{pokemonName ? pokemonName.toUpperCase() : 'Pokémon'}</h2>
        <p>Escucha la llamada de batalla en el juego</p>
      </div>

      <div className="block-action">
        {cryUrl ? (
          <button onClick={playCry} className="btn-cry">
            🔊 Escuchar Sonido
          </button>
        ) : (
          <p className="no-data">Sin audio disponible</p>
        )}
      </div>
    </div>
  )
}