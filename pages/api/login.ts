import Cookies from 'cookies'
import { COOKIE_NAME, COOKIE_VALUE } from '../../lib/withSession';

const PW = "asdf"

export default function login(req, res) {
	if (req.method === 'POST') {
		const {password} = req.body;
		if (password == PW) {
			const cookie = new Cookies(req, res);
			cookie.set(COOKIE_NAME, COOKIE_VALUE, {
				httpOnly: true
			})
			res.send(true)
		} else res.send(false)
	} else {
		res.status(405)
	}
  }

export const config = {
	api: {
	  bodyParser: {
		sizeLimit: '1mb',
	  },
	},
  }