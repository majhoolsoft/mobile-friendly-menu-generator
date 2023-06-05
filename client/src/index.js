import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import Root from "./routes/root";
import ErrorPage from "./error-page";
import Home from "./routes/Home";
import Pricing from "./routes/Pricing";
import SupportPage from "./routes/Support";
import FreeTrialPage from "./routes/FreeTrial";
import MenuBuilder from "./components/MenuBuilder";
import Dashboard from "./routes/Dashboard";
import QRCodePage from "./routes/qr";
import StaticMenuPage from "./routes/StaticMenu";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthGuard } from "./components";

const router = createBrowserRouter([
	{
		path: "/menu_builder",
		element: <MenuBuilder />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Home />,
				errorElement: <ErrorPage />,
			},
			{
				path: "/pricing",
				element: <Pricing />,
				errorElement: <ErrorPage />,
			},
			{
				path: "/support",
				element: <SupportPage />,
				errorElement: <ErrorPage />,
			},
			{
				path: "/Free Trial",
				element: <FreeTrialPage />,
				errorElement: <ErrorPage />,
			},
			{
				path: "/Dashboard",
				element: <AuthGuard component={Dashboard} />,
				errorElement: <ErrorPage />,
			},
			{
				path: "/qr",
				element: <QRCodePage />,
				errorElement: <ErrorPage />,
			},
		],
	},
	{
		path: "/static",
		element: <StaticMenuPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Auth0Provider
		domain="dev-h1ejsb03jtcnof0i.us.auth0.com"
		clientId="agjskh5jiCh4wvVYwuyyB5Q0FmzQ5Ph3"
		authorizationParams={{
			redirect_uri: window.location.origin,
			audience: "https://dev-h1ejsb03jtcnof0i.us.auth0.com/api/v2/",
			scope: "openid profile email",
		}}
	>
		<RouterProvider router={router} />
	</Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
