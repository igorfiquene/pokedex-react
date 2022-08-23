import { configureStore } from '@reduxjs/toolkit'
import pokemonsSlice from './slices/pokemonsSlice'

export const store = configureStore({
	reducer: {
		pokemons: pokemonsSlice,
	}
})