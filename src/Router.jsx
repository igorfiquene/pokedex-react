import { Routes, Route } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { SingleCard } from './pages/SingleCard'

export function Router() {
	return (
		<Routes>
			<Route path='/' element={ <Landing /> } />
			<Route path='/:slug' element={ <SingleCard /> } />
		</Routes>
	)
}