import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { Balance } from "../components/svgs/Balance"
import { Tag } from "../components/theme/Tag"
import { Loading } from "../components/theme/Loading"
import { getPokemon, pokemons } from "../redux/slices/pokemonsSlice"

import ArrowLeft from "../assets/images/arrowleft.svg"
import Rule from "../assets/images/rule.svg"
import ArrowLeftLight from "../assets/images/arrowleft-light.svg"
import ArrowRightLight from "../assets/images/arrowright-light.svg"

export function SingleCard() {
	let { slug: id } = useParams()
	const dispatch = useDispatch()
	const { currentPokemon, isLoading } = useSelector(pokemons)
	const { pokemon } = currentPokemon

	useEffect(() => {
		dispatch(getPokemon(id))
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

		if (!dictionary[str]) {
			console.error('Dont`t exists string in dictionary');
		}

		return dictionary[str]
	}

	const getNewPokemon = (url) => {
		event.preventDefault()
		const BASE_URL = import.meta.env.VITE_API_URL
		const formatSLug = url.replace(BASE_URL, '')
		const params = new URLSearchParams(formatSLug)
		const getOffset = Number(params.get('offset'))
		dispatch(getPokemon(getOffset + 1))
	}

	return (
		
		isLoading ? <Loading /> : (
			pokemon && (
				<div className={`single-card ${pokemon && pokemon.types[0].type.name} single-card--${pokemon.types[0].type.name}`}>
					<div className={`${pokemon.types[0].type.name}`}>
						<header className="single-card__header container ">
							<Link to='/' >
								<img src={ArrowLeft} alt="Arrow Left" />
							</Link>
							<h1>{pokemon.name}</h1>
							<span>
								#
								{String(pokemon.id).padStart(3, '0')}
							</span>

						</header>

						<div className="single-card__body">

							{ currentPokemon.previous && (
								<Link to={`../${Number(id) - 1}`} className="previous" onClick={(event) => getNewPokemon(currentPokemon.previous)}>
									<img src={ArrowLeftLight} alt="Previous pokemon" />
								</Link>
							)}

							{ currentPokemon.next && (
								<Link to={`../${Number(id) + 1}`} className="next" onClick={(event) => getNewPokemon(currentPokemon.next)}>
									<img src={ArrowRightLight} alt="Next pokemon" />
								</Link>
							)}

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
											<img src={Rule} alt="Rule" />
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

								<p className="single-card__description c-text--small">{pokemon.description.flavor_text_entries[1].flavor_text}</p>

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
			)
		)
	)
}