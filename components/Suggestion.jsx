import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import { Chip } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ky from 'ky-universal'
import createPersistedState from 'use-persisted-state'

export default (props) => {
	const useClickedState = createPersistedState(`${props.id}clicked`)

	const [status, setStatus] = useState(props.status)
	const [clicked, setClicked] = useClickedState(false)
	const [value, setValue] = useState(props.value)

	let upvoteValue = props.value
	let lStatus = props.status

	const handleUpvoteClick = () => {
		setClicked(!clicked)

		if (!clicked === true) {
			upvoteValue = value + 1
		} else {
			upvoteValue = value - 1
		}

		setValue(upvoteValue)

		ky.put(
			`https://solitary-dawn-2503.fly.dev/suggestion/?id=${props.id}&value=${upvoteValue}`,
		)
	}

	const handleDoneClick = () => {
		if (lStatus === 'PENDING') {
			lStatus = 'COMPLETED'
		} else {
			lStatus = 'PENDING'
		}

		setStatus(lStatus)

		console.log(
			`https://solitary-dawn-2503.fly.dev/suggestion/status/?id=${props.id}&status=${lStatus}`,
		)
		ky.put(
			`https://solitary-dawn-2503.fly.dev/suggestion/status/?id=${props.id}&status=${lStatus}`,
		)
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
				<div style={{ textAlign: 'right', width: '70%', float: 'left' }}>
					<p>
						<b>Category</b>: {props.category}
					</p>
					<p>
						<b>Status</b>: {status}
					</p>
					<p>
						<b>Location</b>: {props.location}
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
					style={{ marginLeft: '10px' }}
					onClick={() => handleUpvoteClick()}
				>
					{value}
				</Button>
			</div>

			<div
				className="admin"
				style={{ display: props.admin ? 'block' : 'none' }}
			>
				<h3>Admin settings</h3>
				<Button
					variant="contained"
					color="secondary"
					className="ad-but"
					style={{ margin: '10px' }}
					onClick={() => {
						ky.delete(
							`https://solitary-dawn-2503.fly.dev/suggestion/?id=${props.id}`,
						)
					}}
				>
					Delete
				</Button>

				<Button
					variant="contained"
					style={{ margin: '10px' }}
					onClick={() => handleDoneClick()}
				>
					Switch Status
				</Button>
			</div>

			<style jsx>{`
				p {
					margin: 0px;
				}
				h1 {
					color: black;
				}
				h2 {
					font-weight: 600;
				}
			`}</style>
		</Card>
	)
}
