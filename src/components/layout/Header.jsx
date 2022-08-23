import { Logo } from "../svgs/Logo"
import { Sort } from "../theme/Sort"
import { Search } from "./Search"

export function Header() {

	return (
		<>
			<header className="container">

				<div className="logo">
					<Logo
						width={25}
						height={25}
					/>

					<h1>Pokemon</h1>
				</div>
				

				<Sort />
			</header>

			<Search />
		</>
	)
}