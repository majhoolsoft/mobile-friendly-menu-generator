const User = require("../models/user");
const axios = require("axios");

module.exports = {
	login: async (req, res) => {
		const options = {
			method: "POST",
			url: `${process.env.AUTH_DOMAIN}/oauth/token`,
			headers: { "content-type": "application/x-www-form-urlencoded" },
			data: new URLSearchParams({
				grant_type: "client_credentials",
				client_id: process.env.CLIENT_API_ID,
				client_secret: process.env.CLIENT_API_SECRET,
				audience: `${process.env.AUTH_DOMAIN}/api/v2/`,
			}),
		};

		const access_token = await axios
			.request(options)
			.then(function (response) {
				return response.data.access_token;
			})
			.catch(function (error) {
				console.error(error);
			});

		try {
			const response = await axios.get(
				`${process.env.AUTH_DOMAIN}/api/v2/users/${req.auth.sub}`,
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				}
			);

			const userProfile = response.data;
			console.log(userProfile);
			const { email } = userProfile;

			const isUser = await User.findOne({ email });

			if (isUser) return res.status(200).send();

			await User.create({ email });
			res.status(201).send();
		} catch (error) {
			console.log(error);
		}
	},
};
