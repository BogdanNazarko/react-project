import React from "react";

class ClassCounter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0
		}
		this.incr = this.incr.bind(this);
		this.decr = this.decr.bind(this);
	}
	incr() {
		this.setState({ count: this.state.count + 1 });
	}
	decr() {
		this.setState({ count: this.state.count - 1 });
	}

	render() {
		return (
			<div>
				<h1>{this.state.count}</h1>
				<button onClick={this.incr}>   +   </button>
				<button onClick={this.decr}>   -   </button>
			</div>
		)
	}
}

export default ClassCounter;