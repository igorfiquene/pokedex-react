import { Link } from "react-router-dom"

export function Card({ name, id, image, type}) {

	return (
		<>
			<Link to={`/${id}`} >
				<div className={`card ${type ? `card--${type}` : ''}`}>
					<span className="card__id c-text--xsmall">
						{id && ('#' + String(id).padStart(3, '0'))}
					</span>

					<img src={image} alt={name} />

					<span className="card__name c-text--small">
						{name}
					</span>

				</div>
			</Link>
		</>
	)
}