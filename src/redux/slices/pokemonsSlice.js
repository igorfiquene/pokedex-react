import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL

async function fetchAll(urls, query) {
	if (query) {
		return Promise.all(
			urls.map(async (url) => {
				if (query) {
					const { data } = await axios.get(url, { params: query })
					return data 
				}
			})
		)
	}

	return Promise.all(
		urls.map(async (url) => {
			const { data } = await axios.get(url)
			return data
		})
	)
}

export const getPokemons = createAsyncThunk( 'pokemons', async (MAX_OF_POKEMONS_TO_SHOW = 10) => {
	const params = {
		limit: MAX_OF_POKEMONS_TO_SHOW
	}

	const { data } = await axios.get(`${BASE_URL}`, params)

	return data.results

	}
)

export const getPokemonDescription = createAsyncThunk( 'pokemon/description', async (slug) => {
	const { data } = await axios.get(slug)

	return data
})

export const getPokemon = createAsyncThunk( 'pokemon/get', async (id, { dispatch }) => {
	const params = {
		limit: 1,
		offset: id - 1
	}
	
	const urlsPokemons = `${BASE_URL}`
	const url = `${BASE_URL}/${id}`
	const urls = [urlsPokemons, url]

	const [{ next, previous }, pokemon] = await fetchAll(urls, params)
	const { payload: description } = await dispatch(getPokemonDescription(pokemon.species.url))

	const data = {
		pokemon: {
			...pokemon,
			description
		},
		previous,
		next
	}

	return data 
})

export const getPokemonsInfo = createAsyncThunk( 'pokemons/update', async (params, { dispatch }) => {
	const { payload: pokemons } = await dispatch(getPokemons(params))

	const urls = []

	pokemons.map(async ({ url }) =>  urls.push(url))

	const response = await fetchAll(urls)

	const merge = pokemons.map(( pokemon, index ) => Object.assign({}, pokemon, response[index]))

	return merge
})

const initialState = {
	list: [],
	isLoading: false,
	filter: '',
	orderByAlpha: false,
	currentPokemon: '',
	error: false
}

const pokemonsSlices = createSlice({
	name: 'pokemons',
	initialState,
	reducers: {
		setFilter: (state, action) => {
			state.filter = action.payload
		},
		clearFilter: (state) => {
			state.filter = ''
		},
		setOrderBy: (state, action) => {
			state.orderByAlpha = action.payload
		},
	},
	extraReducers: {
		[getPokemons.pending]: (state, action) => {
			state.isLoading = false
		},
		[getPokemons.fulfilled]: (state, { payload }) => {
			state.list = payload
			state.isLoading = false
		},
		[getPokemons.rejected]: (state, action) => {
			state.error = true
			state.isLoading = false
		},
		[getPokemonsInfo.pending]: (state, action) => {
			state.isLoading = false
		},
		[getPokemonsInfo.fulfilled]: (state, { payload }) => {
			state.list = payload
			state.isLoading = false
		},
		[getPokemonsInfo.rejected]: (state, action) => {
			state.error = true
			state.isLoading = false
		},
		[getPokemon.pending]: (state, action) => {
			state.isLoading = true
		},
		[getPokemon.fulfilled]: (state, { payload }) => {
			state.currentPokemon = payload
			state.isLoading = false
		},
		[getPokemon.rejected]: (state, action) => {
			state.error = true
			state.isLoading = false
		}
	}
})

export const { setFilter, clearFilter, setOrderBy } = pokemonsSlices.actions

export const pokemons = state => state.pokemons


export default pokemonsSlices.reducer