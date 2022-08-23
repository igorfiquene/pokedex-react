import { ArrowBottom } from "../svgs/ArrowBottom"
import { useDispatch, useSelector } from "react-redux"
import { setOrderBy } from "../../redux/slices/pokemonsSlice"

export function Sort() {

	const dispatch = useDispatch()

	const order = useSelector(
		(state) => state.pokemons.orderByAlpha
	)


	return (
		<button
			className="sort"
			onClick={() => dispatch(setOrderBy(!order))}
		>
			{ order ? 'A/Z' : '#'}
			
			<ArrowBottom />
		</button>
	)
}