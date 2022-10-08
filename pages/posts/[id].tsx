import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import withSession from '../../lib/withSession'

export default function Post({
	postData
}: {
	postData: {
		title: string
		date: string
		contentHtml: string
	}
}) {
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<article>
				<h1 className={utilStyles.headingXl}>{postData.title}</h1>
				<div className={utilStyles.lightText}>
					<Date dateString={postData.date} />
				</div>
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
			</article>
		</Layout>
	)
}

// export const getStaticPaths: GetSer = async () => {
//   const paths = getAllPostIds()
//   return {
//     paths,
//     fallback: false
//   }
// }

export const getServerSideProps: GetServerSideProps = withSession(async function({params, req}) {
	const postData = await getPostData(params.id as string)
	console.log(postData);
	if (postData != null) {
		return {
			props: {
				postData
			}
		}
	} else {
		console.log("redirect A")
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
			props: {},
		};
	}
})
