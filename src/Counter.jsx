import { Component } from "react";

class Counter extends Component {

    state ={
       count: 0,
    }
    
    changeCounter = () => {
        this.setState({
            count: this.state.count + 1
        });

        console.log(this.state);
    };

    render() {
        
        return (
            <div>
                Count: {this.state.count}
                <button onClick={this.changeCounter}>+</button> 
            </div>
        );

    }
}

export default Counter;