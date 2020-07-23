import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import React, { useState } from 'react'
import ky from 'ky-universal'
import Layout from '../components/Layout'

const currencies = [
	{ value: 'Food' },
	{ value: 'HR' },
	{ value: 'Stuff' },
	{ value: 'More stuff' },
	{ value: 'UH' },
	{ value: 'A' },
	{ value: 'Other' },
]
export default () => {
	const [name, setName] = useState('')
	const [suggestion, setSuggestion] = useState('')
	const [category, setCategory] = useState('')

	const handleSubmit = async () => {
		const nameParse = name.replace(' ', '+')
		const suggestionParse = suggestion.replace(' ', '+')
		const categoryParse = category.replace(' ', '+')

		const parsed = await ky.post(
			`http://localhost:8080/suggestion?name=${nameParse}&suggestion=${suggestionParse}&category=${categoryParse}`,
		)

		console.log(
			`http://localhost:8080/?name=${nameParse}&suggestion=${suggestionParse}&category=${categoryParse}`,
		)
	}

	return (
		<Layout>
			<div style={{ textAlign: 'center' }}>
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
							label="Name"
							variant="outlined"
							style={{ margin: '10px' }}
							onChange={(event) => {
								setName(event.target.value)
							}}
						/>
						<TextField
							required
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
