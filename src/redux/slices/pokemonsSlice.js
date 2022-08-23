import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL

export const getPokemons = createAsyncThunk( 'pokemons', async (MAX_OF_POKEMONS_TO_SHOW) => {
		const pokemons = []

		if (MAX_OF_POKEMONS_TO_SHOW) {
			const response = await axios.get(`${BASE_URL}/${MAX_OF_POKEMONS_TO_SHOW}`)
			pokemons.push(response.data)
			
			return pokemons;
		}

		for (let index = 1; index <= 10; index++) {
			const response = await axios.get(`${BASE_URL}/${index}`)
			pokemons.push(response.data)
		}

		return pokemons
	}
)

export const getPokemon = async (index) => {
	try {
		const response = await axios.get(`${BASE_URL}/${index}`)
	} catch (error) {
		console.log(error);
	}
}

const initialState = {
	list: [],
	status: null,
	filter: '',
	orderByAlpha: false,
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
			state.status = 'loading'
		},
		[getPokemons.fulfilled]: (state, { payload }) => {
			state.list = payload
			state.status = 'success'
		},
		[getPokemons.rejected]: (state, action) => {
			state.state = 'failed'
		}
	}
})

export const { setFilter, clearFilter, setOrderBy } = pokemonsSlices.actions


export default pokemonsSlices.reducer