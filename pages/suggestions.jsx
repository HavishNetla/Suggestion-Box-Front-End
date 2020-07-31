import React, { useState, useEffect } from 'react'
import ky from 'ky-universal'
import Button from '@material-ui/core/Button'
import Layout from '../components/Layout'
import Suggestion from '../components/Suggestion'

export default () => {
	const [data, setData] = useState([])
	const [admin, setAdmin] = useState(false)

	useEffect(() => {
		async function fetchData() {
			const parsed = await ky(
				'https://solitary-dawn-2503.fly.dev/suggestion',
			).json()
			const arr = []
			console.log(parsed)
			setData(parsed)
		}

		fetchData()
	}, [])

	return (
		<Layout>
			<div
				style={{
					backgroundColor: 'white',
					display: 'flex',
					justifyContent: 'center',
					marginBottom: '50px',
				}}
			>
				<img src="https://www.c-hit.com/assets/icons/Logo.svg" alt="" />
				<h1 style={{ color: 'black', paddingLeft: '50px' }}>Suggestions</h1>
			</div>
			<div style={{ textAlign: 'center', maxWidth: '1000px', margin: 'auto' }}>
				<Button
					variant="contained"
					onClick={async () => {
						const pswd = prompt('Enter the password', '')
						console.log(
							await ky(
								`https://solitary-dawn-2503.fly.dev/authenticate/?password=${pswd}`,
							).text(),
						)

						if (
							(await ky(
								`https://solitary-dawn-2503.fly.dev/authenticate/?password=${pswd}`,
							).text()) === 'correct'
						) {
							setAdmin(true)
						} else {
							alert('Wrong password, try again')
						}
					}}
				>
					Login as Admin
				</Button>
				{data.map((suggestion, i) => (
					<Suggestion
						key={i}
						id={suggestion._id}
						date={suggestion.date}
						suggestionName={suggestion.suggestion}
						category={suggestion.category}
						location={suggestion.location}
						name={suggestion.name}
						status={suggestion.status}
						value={suggestion.value}
						admin={admin}
					/>
				))}
			</div>
		</Layout>
	)
}
