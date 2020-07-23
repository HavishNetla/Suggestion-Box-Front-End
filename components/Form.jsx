import TextField from '@material-ui/core/TextField'

export default () => (
	<div>
		<form noValidate autoComplete="off">
			<TextField
				id="outlined-basic"
				label="Name"
				variant="outlined"
				style={{ margin: '10px' }}
			/>
			<TextField
				required
				id="outlined-basic"
				label="Suggestion"
				variant="outlined"
				style={{ margin: '10px' }}
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
	</div>
)
