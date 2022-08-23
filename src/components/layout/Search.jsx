import { useDispatch, useSelector } from "react-redux"
import { setFilter, clearFilter } from "../../redux/slices/pokemonsSlice"
import { Close } from "../svgs/Close"
import { Land } from "../svgs/Land"


export function Search() {

	const filter = useSelector(
		(state) => state.pokemons.filter
	)

	const dispatch = useDispatch()

	return (
		<form className="container">
			<label className="label-search c-text--small">
				<input
					type="text"
					placeholder="Procurar"
					value={filter}
					onChange={(e) => 
						dispatch(setFilter(e.target.value.toLocaleLowerCase()))
					}
				/>

				<Land />

				<button
					onClick={() => clearFilter()}
				>
					<Close />
				</button>
			</label>
		</form>
	)
}