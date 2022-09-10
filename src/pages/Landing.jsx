import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card } from "../components/layout/Card"
import { Header } from "../components/layout/Header"
import { Loading } from "../components/theme/Loading"
import { getPokemonsInfo, pokemons } from "../redux/slices/pokemonsSlice"


export function Landing() {
	const dispatch = useDispatch()
	const { list, filter, isLoading, orderByAlpha } = useSelector(pokemons)

	useEffect(() => {
		dispatch(getPokemonsInfo(20))
	}, [])

	const orderBy = list.length > 0 && orderByAlpha
		? list.slice().sort((a, b) => a.name.localeCompare(b.name))
		: list

	const filteredPokemons = orderBy.filter(( { name } ) => name.includes(filter))

	return (
		<main>
			<Header />
			
			<div className="list-pokemons container">
				{
					isLoading ? <Loading /> : (
						( filteredPokemons && filteredPokemons.map(({ id, name, sprites, types }) => (
								<Card
									key={id}
									id={id}
									name={name}
									image={sprites && sprites.other['official-artwork'].front_default}
									type={types && types[0].type.name}
								/>
							))
						)
					)
				}

			</div>
		</main>
	)
}