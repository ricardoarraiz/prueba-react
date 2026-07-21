import { useState, useEffect } from 'react'
import './Pokemon.css'

export default function Pokemon({ onPokemonLoaded }) {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)

  const MIN_SINNOH_ID = 387
  const MAX_SINNOH_ID = 493

  const getRandomSinnohId = () => {
    return Math.floor(Math.random() * (MAX_SINNOH_ID - MIN_SINNOH_ID + 1)) + MIN_SINNOH_ID
  }

  const fetchRandomPokemon = async () => {
    setLoading(true)
    const randomId = getRandomSinnohId()

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      const data = await response.json()
      setPokemon(data)
      if (onPokemonLoaded) onPokemonLoaded(data)
    } catch (error) {
      console.error('Error al obtener el Pokémon:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let ignore = false

    const loadInitialPokemon = async () => {
      const randomId = getRandomSinnohId()
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
        const data = await response.json()
        if (!ignore) {
          setPokemon(data)
          if (onPokemonLoaded) onPokemonLoaded(data)
          setLoading(false)
        }
      } catch (error) {
        if (!ignore) {
          console.error('Error al obtener el Pokémon:', error)
          setLoading(false)
        }
      }
    }

    loadInitialPokemon()

    return () => {
      ignore = true
    }
  }, [])

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
      ) : (
        <p>No se pudo cargar el Pokémon.</p>
      )}

      <button onClick={fetchRandomPokemon} className="btn-pokemon">
        ¡Obtener otro Pokémon!
      </button>
    </div>
  )
}