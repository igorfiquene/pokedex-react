import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft } from "../components/svgs/ArrowLeft"
import { Rule } from "../components/svgs/Rule"
import { Balance } from "../components/svgs/Balance"
import { Tag } from "../components/theme/Tag"
import { Loading } from "../components/theme/Loading"

export function SingleCard() {
	const { slug: id } = useParams()
	const [pokemon, setPokemon] = useState({})

	const BASE_URL = import.meta.env.VITE_API_URL
		
	async function getPokemon() {
		const response = await axios.get(BASE_URL + `/${id}`)
			.then(({ data }) =>  data )
			
		return response
	}

	async function getPokemonDescription() {
		const resultPokemon = await getPokemon()

		const description = await axios.get(resultPokemon.species.url)
			.then(({ data }) => {
				return data
			})

		const objectAssigned = Object.assign(resultPokemon, description)

		setPokemon(objectAssigned)
	}

	useEffect(() => {
		getPokemonDescription()
	}, [])

	function getValueWithCommas(value) {
		var changeToDecimal = (value / 10).toFixed(1);
		return changeToDecimal.replaceAll('.', ',')
	}

	function abbreviateStrings(str) {

		const dictionary = {
			'attack': 'ATK',
			'hp': 'HP',
			'defense': 'DEF',
			'special-attack': 'SATK',
			'special-defense': 'SDEF',
			'speed': 'SPD',
		}

		return dictionary[str]
	}

	return (
		Object.keys(pokemon).length > 0 ? (
			<div className={`single-card ${pokemon.types[0].type.name} single-card--${pokemon.types[0].type.name}`}>
				<div className={`${pokemon.types[0].type.name}`}>
					<header className="single-card__header container ">
						<Link to='/' >
							<ArrowLeft />
						</Link>
						<h1>{pokemon.name}</h1>
						<span>
							#
							{String(pokemon.id).padStart(3, '0')}
						</span>

					</header>

					<div className="single-card__body">
						<img
							src={pokemon.sprites.other['official-artwork'].front_default}
							className="single-card__image"
						>

						</img>

						<div className="single-card__cards">
							{pokemon.types.map(({ type }) => (
								<Tag name={type.name} key={type.name} />
							))}
						</div>

						<div className="single-card__about">
							<h2 className={`color color--${pokemon.types[0].type.name}`}>About</h2>

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
												<span key={move.name}>
													{move.name}
												</span>
											))
										}
									</span>

									<span className="c-text--xsmall">
										Moves
									</span>
								</div>
							</div>

							<p className="single-card__description c-text--small">{pokemon.flavor_text_entries[1].flavor_text}</p>

							<div className="single-card__status">
								<h2 className={`color color--${pokemon.types[0].type.name}`}>Base Stats</h2>
								
								<article>
									{pokemon.stats.map(({ base_stat, stat }) => (
										<span key={stat.name}>
											<p className={`name c-text--small name--${pokemon.types[0].type.name}`}>
												{abbreviateStrings(stat.name)}
											</p>

											<div>
												<p className="c-text--small">
													{String(base_stat).padStart(3, '0')}
												</p>

												<div className={`progress progress--${pokemon.types[0].type.name}`}>
													<span style={{ width: `calc(${base_stat}% / 2.3)` }} className="line" />
												</div>
											</div>
										</span>
									))}
								</article>


							</div>
						</div>

					</div>
				</div>
			</div>

		) : <Loading />
	)
}