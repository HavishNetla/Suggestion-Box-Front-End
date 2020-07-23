import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import { Chip } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ky from 'ky-universal'

export default (props) => {
	const [clicked, setClicked] = useState(false)
	const [upvoteValue, setUpvoteValue] = useState(props.value)

	let color = 'default'
	if (props.status === 'SUBMITTED') {
		color = 'primary'
	} else if (props.status === 'UNDER REVIEW') {
		color = 'secondary'
	}

	const handleClick = () => {
		setClicked(!clicked)

		let value
		if (!clicked === true) {
			value = upvoteValue + 1
		} else {
			value = upvoteValue - 1
		}

		setUpvoteValue(value, () => {
			alert(`value: ${upvoteValue}`)
			console.log(upvoteValue)
		})

		// Const parsed = ky.put(
		// 	`http://localhost:8080/suggestion/?id=${props.id}&value=${upvoteValue}`,
		// )

		// console.log(
		// 	`http://localhost:8080/suggestion/?id=${props.id}&value=${upvoteValue}`,
		// )
	}

	return (
		<Card
			style={{
				textAlign: 'left',
				padding: '20px',
				margin: '20px',
			}}
		>
			<div style={{ display: 'flex', marginTop: '10px', width: '100%' }}>
				<div>
					<p>
						<b>Posted by</b>: {props.name}
					</p>
					<p>
						<b>Date</b>: {props.date}
					</p>
				</div>
				<div style={{ textAlign: 'right', width: '75%', float: 'left' }}>
					<p>
						<b>Category</b>: {props.category}
					</p>
					<p>
						<b>Status</b>: {props.status}
					</p>
				</div>
			</div>

			<div style={{ display: 'flex', marginTop: '20px' }}>
				<p style={{ color: 'grey' }}>{props.suggestionName}</p>
				<Button
					variant="contained"
					color={clicked ? 'primary' : 'default'}
					size="small"
					endIcon={<ArrowUpwardIcon />}
					onClick={() => handleClick()}
				>
					{upvoteValue}
				</Button>
			</div>

			<style jsx>{`
				p {
					margin: 0px;
				}
				h2 {
					font-weight: 600;
				}
			`}</style>
		</Card>
	)
}
