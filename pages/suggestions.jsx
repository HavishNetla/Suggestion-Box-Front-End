import React, { useState, useEffect } from 'react'
import ky from 'ky-universal'
import Layout from '../components/Layout'
import Suggestion from '../components/Suggestion'

export default () => {
	const [data, setData] = useState([])

	useEffect(() => {
		async function fetchData() {
			const parsed = await ky('http://localhost:8080/suggestion').json()
			const arr = []
			console.log(parsed)
			setData(parsed)
		}

		fetchData()
	}, [])

	return (
		<Layout>
			<div style={{ textAlign: 'center', maxWidth: '1000px', margin: 'auto' }}>
				<h1>Suggestions</h1>
				{data.map((suggestion, i) => (
					<Suggestion
						key={i}
						id={suggestion._id}
						date="June 23rd, 2020"
						suggestionName="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis sagittis venenatis. Quisque nec tellus quis nunc hendrerit luctus. Nunc accumsan tempor leo ac lobortis. Suspendisse viverra semper rhoncus."
						category={suggestion.category}
						name={suggestion.name}
						status={suggestion.status}
						value={suggestion.value}
					/>
				))}
			</div>
		</Layout>
	)
}
