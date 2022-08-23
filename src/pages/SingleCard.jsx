import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useParams } from "react-router-dom"
import { ArrowLeft } from "../components/svgs/ArrowLeft"
import { Rule } from "../components/svgs/Rule"
import { Balance } from "../components/svgs/Balance"
import { Tag } from "../components/theme/Tag"
import { getPokemons } from "../redux/slices/pokemonsSlice"


export function SingleCard() {
	const { slug: id } = useParams()
	const dispatch = useDispatch()
	const list = useSelector( ({ pokemons }) => pokemons.list )
	const [pokemon] = list

	useEffect(() => {
		dispatch(getPokemons(id))
	}, [])

	function getValueWithCommas(value) { 
		var changeToDecimal = (value / 10).toFixed(1);
		return changeToDecimal.replaceAll('.', ',')
	}

	return (
		pokemon ? (
			<div className={`single-card single-card--${pokemon.types[0].type.name}`}>
				<div className={`${pokemon.types[0].type.name}`}>
					<header className="single-card__header container ">
						<ArrowLeft />
						<h1>{pokemon.name}</h1>
						<span>
							#
							{String(pokemon.id).padStart(3, '0')}
						</span>

					</header>

					<div className="single-card__body">
						<img
							src={pokemon.sprites.front_default}
							className="single-card__image"
						>
							
						</img>

						<div className="single-card__cards">
							{ pokemon.types.map(( { type } ) => (
								<Tag name={ type.name } key={ type.name } />
							))}
						</div>

						<div className="single-card__about">
							<h2>About</h2>

							<div className="single-card__grid">
								<div>
									<span className="c-text--small">
										<Balance />
										{getValueWithCommas(pokemon.weight)}
										{' '}
										kg

									</span>

									<span className="c-text--xsmall">
										Height
									</span>
								</div>

								<div>
									<span className="c-text--small">
										<Rule />
										{getValueWithCommas(pokemon.height)}
										{' '}
										kg
									</span>

									<span className="c-text--xsmall">
										Weight
									</span>
								</div>

								<div>
									<span className="c-text--small">
										{
											pokemon.moves.slice(0, 2).map(({ move }) => (
												<span>
													{ move.name }
												</span>
											))
										}
									</span>

									<span className="c-text--xsmall">
										Moves
									</span>
								</div>
							</div>
						</div>
					</div>

					{console.log(pokemon)}
				
					
				</div>
			</div>

		) : "" 
	)
}