import { useCallback, useEffect, useRef, useState } from 'react'

const usePokemon = ({ onPokemonLoaded }: any = {}) => {
  const [pokemon, setPokemon] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isMountedRef = useRef(true)

  const minSinnoh = Number(import.meta.env.VITE_MIN_SINNOH_ID)
  const maxSinnoh = Number(import.meta.env.VITE_MAX_SINNOH_ID)
  const pokeApiBaseUrl = import.meta.env.VITE_POKEAPI_BASE_URL

  const getRandomSinnohId = useCallback(() => {
    return Math.floor(Math.random() * (maxSinnoh - minSinnoh + 1)) + minSinnoh
  }, [maxSinnoh, minSinnoh])

  const fetchRandomPokemon = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const randomId = getRandomSinnohId()
      const response = await fetch(`${pokeApiBaseUrl}/${randomId}`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data: any = await response.json()

      if (!isMountedRef.current) {
        return
      }

      setPokemon(data)
      onPokemonLoaded?.(data)
    } catch (fetchError) {
      if (!isMountedRef.current) {
        return
      }

      setPokemon(null)
      setError('No se pudo cargar el Pokemon. Intentalo de nuevo.')
      console.error('Error al obtener el Pokemon:', fetchError)
    } finally {
      if (isMountedRef.current) {
        setLoading(false)
      }
    }
  }, [getRandomSinnohId, onPokemonLoaded, pokeApiBaseUrl])

  const postPokemon = useCallback(async (pokemonData: any) => {}, [])

  useEffect(() => {
    isMountedRef.current = true
    fetchRandomPokemon()

    return () => {
      isMountedRef.current = false
    }
  }, [fetchRandomPokemon])

  return {
    pokemon,
    loading,
    error,
    fetchRandomPokemon,
    postPokemon,
  }
}

export default usePokemon
