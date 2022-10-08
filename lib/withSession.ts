import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export const COOKIE_NAME = "asdf"
export const COOKIE_VALUE = "asdfasdf";

const inner = handler => noSession => (context: GetServerSidePropsContext) => {
	const {req} = context;
	const haveSession = req && req.cookies && (req.cookies[COOKIE_NAME] == COOKIE_VALUE);
	console.log("req", req)
	console.log(haveSession)
	console.log(noSession)
	if (haveSession == noSession) {
		console.log("redirect withSession")
		return Promise.resolve({
			redirect: {
				permanent: false,
				destination: "/login",
			},
			props: {},
		});
	} else {
		const ret = handler(context);
		if (ret instanceof Promise) {
			return ret;
		} else {
			return Promise.resolve(ret)
		}
	}
}

export function withSession<P extends {
    [key: string]: unknown;
} = {
    [key: string]: unknown;
}>(handler: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>):
(context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<P>> {
	return inner(handler)(false)
}

export function withoutSession<P extends {
    [key: string]: unknown;
} = {
    [key: string]: unknown;
}>(handler: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>):
(context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<P>> {
	return inner(handler)(true)
}

export default withSession;