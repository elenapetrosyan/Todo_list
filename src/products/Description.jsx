import { Component } from "react";

class Description extends Component {
    render() {
        return (
            <div>
               Description: {this.props.text}
            </div>
        )

    }
}

export default Description;
