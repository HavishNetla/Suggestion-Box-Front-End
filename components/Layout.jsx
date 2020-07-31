import Head from 'next/head'

export default ({ children }) => (
	<div>
		<Head>
			<meta charSet="utf-8" />

			<title>Suggestion Box</title>
			<link
				href="https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap"
				rel="stylesheet"
			/>
		</Head>

		{children}

		<style jsx global>{`
			* {
				font-family: Poppins;
				box-sizing: border-box;
				transition: 300ms;
			}
			html {
				background-image: url('https://forms.office.com/Images/Theme/meeting.png');
			}

			body {
				margin: 0px;
			}

			h1 {
				color: white;
				font-weight: 600;
				font-size: 48px;
			}
		`}</style>
	</div>
)
