import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import React, { useState, useEffect } from 'react'
import ky from 'ky-universal'
import Layout from '../components/Layout'

const currencies = [
	{ value: 'Kitchen' },
	{ value: 'Bathroom' },
	{ value: 'Office Supplies' },
	{ value: 'Office Facilities' },
	{ value: 'Office Decor' },
	{ value: 'Special Request' },
]
export default () => {
	const [name, setName] = useState('')
	const [suggestion, setSuggestion] = useState('')
	const [category, setCategory] = useState('')
	const [location, setLocation] = useState('')
	const [user, setUser] = useState(false)
	const [a, setA] = useState(false)

	const handleSubmit = async () => {
		const nameParse = name.replace(' ', '+')
		const suggestionParse = suggestion.replace(' ', '+')
		const categoryParse = category.replace(' ', '+')
		const locationParse = location.replace(' ', '+')

		const parsed = await ky.post(
			`https://solitary-dawn-2503.fly.dev/suggestion/?name=${nameParse}&suggestion=${suggestionParse}&category=${categoryParse}&location=${locationParse}`,
		)

		console.log(
			`https://solitary-dawn-2503.fly.dev/suggestion/?name=${nameParse}&suggestion=${suggestionParse}&category=${categoryParse}`,
		)

		alert('Submitted')

		setName('')
		setSuggestion('')
		setCategory('')
		setLocation('')
	}

	useEffect(() => {
		if (prompt('Enter the password') === 'c-hitUserPassword') {
			setUser(true)
		}
	}, [a])

	return (
		<Layout>
			<div style={{ textAlign: 'center', display: user ? 'block' : 'none' }}>
				<h1>C-HIT Suggestion Box</h1>

				<div
					style={{
						width: '50%',
						margin: 'auto',
						backgroundColor: 'white	',
						borderRadius: '10px',
						padding: '25px',
					}}
				>
					<form noValidate autoComplete="off">
						<TextField
							id="outlined-basic"
							value={name}
							label="Name"
							variant="outlined"
							style={{ margin: '10px' }}
							onChange={(event) => {
								setName(event.target.value)
							}}
						/>
						<TextField
							required
							value={suggestion}
							id="outlined-basic"
							label="Suggestion"
							variant="outlined"
							style={{ margin: '10px' }}
							onChange={(event) => {
								setSuggestion(event.target.value)
							}}
						/>
						<TextField
							select
							required
							id="outlined-basic"
							label="Select"
							value={category}
							helperText="Please select the relevant category"
							style={{ margin: '10px' }}
							onChange={(event) => setCategory(event.target.value)}
						>
							{currencies.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.value}
								</MenuItem>
							))}
						</TextField>
						<TextField
							id="outlined-basic"
							value={location}
							label="Location"
							variant="outlined"
							style={{ margin: '10px' }}
							onChange={(event) => {
								setLocation(event.target.value)
							}}
						/>
					</form>

					<Button
						variant="contained"
						color="primary"
						style={{ margin: '10px' }}
						onClick={() => handleSubmit()}
					>
						Submit
					</Button>

					<Button variant="contained" color="info" style={{ margin: '10px' }}>
						<a
							href="/suggestions"
							style={{ textDecoration: 'none', color: 'black' }}
						>
							{' '}
							View All Suggestions
						</a>
					</Button>
				</div>
			</div>
		</Layout>
	)
}
