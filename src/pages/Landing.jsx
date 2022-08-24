import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card } from "../components/layout/Card"
import { Header } from "../components/layout/Header"
import { getPokemons } from "../redux/slices/pokemonsSlice"



export function Landing() {
	const dispatch = useDispatch()

	const filter = useSelector( ({ pokemons }) => pokemons.filter )

	const list = useSelector( ({ pokemons }) => pokemons.list )

	const loading = useSelector( ({ pokemons }) => pokemons.status )

	const order = useSelector( (state) => state.pokemons.orderByAlpha )	

	const orderBy = list.length > 0 && order
		? list.slice().sort((a, b) => a.name.localeCompare(b.name))
		: list

	const filteredPokemons = orderBy.length > 0
		? orderBy.filter(( { name } ) => name.includes(filter))
		: []

	useEffect(() => {
		dispatch(getPokemons(20))
	}, [])

	return (
		<main>
			<Header />
			
			<div className="list-pokemons container">
				{
					loading === 'loading' ? (
						<h1>Is Loading...</h1>
					) : ( filteredPokemons && filteredPokemons.map(({ id, name, sprites, types }) => (
							<Card
								id={id}
								key={id}
								name={name}
								image={sprites.other['official-artwork'].front_default}
								type={types[0].type.name}
							/>
						))
					)
				}

			</div>
		</main>
	)
}