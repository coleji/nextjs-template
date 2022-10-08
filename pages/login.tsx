import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React from 'react'
import Layout, { siteTitle } from '../components/layout'
import { withoutSession } from '../lib/withSession'
import Router from 'next/router'

export default function Login({}) {
	const [password, setPassword] = React.useState("")
	function send() {
		fetch('/api/login', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({password}),
		  })
		  .catch(() => {})
		  .then(() => Router.push('/'))
	}
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section>
				<input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
			</section>
			<a href="#" onClick={send}>Login</a>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = withoutSession(async function({params, req}) {
	return { props: {} }
})