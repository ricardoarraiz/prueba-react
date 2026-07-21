import './Pokemon.css'
import usePokemon from '../hooks/usePokemon'

export default function Pokemon({ onPokemonLoaded }) {
  const { pokemon, loading, error, fetchRandomPokemon } = usePokemon({ onPokemonLoaded })

  return (
    <div className="pokemon-card">
      <h2>Pokémon Aleatorio</h2>

      {loading ? (
        <p>Cargando Pokémon...</p>
      ) : pokemon ? (
        <div className="pokemon-info">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
            alt={pokemon.name}
          />
          <h3>#{pokemon.id} - {pokemon.name.toUpperCase()}</h3>
          <p><strong>Tipo:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
          <p><strong>Altura:</strong> {pokemon.height / 10} m | <strong>Peso:</strong> {pokemon.weight / 10} kg</p>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>No se pudo cargar el Pokémon.</p>
      )}

      <button onClick={fetchRandomPokemon} className="btn-pokemon" disabled={loading}>
        ¡Obtener otro Pokémon!
      </button>
    </div>
  )
}