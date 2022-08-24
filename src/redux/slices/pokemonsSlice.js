import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL

export const getPokemons = createAsyncThunk( 'pokemons', async (MAX_OF_POKEMONS_TO_SHOW = 10) => {
		const pokemons = []

		for (let index = 1; index <= MAX_OF_POKEMONS_TO_SHOW; index++) {
			const response = await axios.get(`${BASE_URL}/${index}`)
			pokemons.push(response.data)
		}

		return pokemons
	}
)

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