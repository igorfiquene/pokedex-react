export function Tag({ name }) {
	return (
		<div className={`tag tag--${name}`}>
			{ name }
		</div>
	)
}