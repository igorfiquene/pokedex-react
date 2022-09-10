import { useDispatch, useSelector } from "react-redux"
import { setFilter, clearFilter, pokemons } from "../../redux/slices/pokemonsSlice"
import Close from "../../assets/images/close.svg"
import Land from "../../assets/images/land.svg"

export function Search() {
	const { filter, isLoading } = useSelector(pokemons)
	const dispatch = useDispatch()

	return (
		<form className="container">
			<label className="label-search c-text--small" >
				<input
					type="text"
					placeholder="Procurar"
					value={filter}
					disabled={isLoading}
					onChange={(e) => 
						dispatch(setFilter(e.target.value.toLocaleLowerCase()))
					}
				/>

				<img src={Land} alt="Land" />

				<button
					onClick={() => clearFilter()}
				>
					<img src={Close} alt="Close" />
				</button>
			</label>
		</form>
	)
}