var React = require('react');
var Backbone = require('backbone');
module.exports = React.createClass({
	componentWillMount: function() {
		this.props.router.on('route', () => {
			this.forceUpdate();
		})
	},
	render: function() {
		var allLinks = [];
		allLinks.push(this.links('', 'Home'))
		if (Parse.User.current() !== null){
			allLinks.push(<li><a href="#logout" ref="Logout" onClick={this.logout}>Logout</a></li>);
			allLinks.push(this.links('dashboard', 'Dashboard'));
			allLinks.push(this.links('thoughts', 'Thoughts'));
		}else{
			allLinks.push(this.links('login', 'Login'));
			allLinks.push(this.links('register', 'Register'));
		}
		return (
			<div className="nav-wrapper">
				<a href="#" className="brand-logo left">React Navigation</a>
				<ul id="nav-mobile" className="right">
					{allLinks}
				</ul>
			</div>
		);
	},
	logout: function(){
		Parse.User.logOut();
		this.forceUpdate();
		this.props.router.navigate('', {trigger: true})
	},
	links: function(url, label) {
		var currentUrl = Backbone.history.getFragment();
		if(currentUrl === url) {
			return (<li className="active" key={url}><a href={'#'+url}>{label}</a></li>);
		}
		else {
			return (<li key={url}><a href={'#'+url}>{label}</a></li>);
		}
	}
})
