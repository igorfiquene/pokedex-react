import Logo from "../../assets/images/logo.svg"
import { Sort } from "../theme/Sort"
import { Search } from "./Search"

export function Header() {

	return (
		<>
			<header className="container">

				<div className="logo">
					<img src={Logo} alt="Pokemon" />
					<h1>Pokemon</h1>
				</div>
				

				<Sort />
			</header>

			<Search />
		</>
	)
}