import imgUrl from '../../assets/images/pikachu.gif'

export function Loading() {
	return (
		<div className="loading">
			<img src={imgUrl} alt="Loading"/>
			<h2>Loading...</h2>
		</div>
	)
}