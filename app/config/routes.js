const React = require('react');
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const browserHistory = ReactRouter.browserHistory;
var IndexRoute = ReactRouter.IndexRoute;
const Main = require('../components/Main');

const routes = (
	<Router history={browserHistory}>
		<Route path='/' component={Main}>
		</Route>
	</Router>
);

module.exports = routes;
