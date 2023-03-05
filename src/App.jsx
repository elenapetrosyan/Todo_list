import {Component} from 'react';
import logo from './logo.svg';
import ProductName from './Product_Name.jsx';
import ProductPrice from './Product_Price.jsx';
import ProductDescription from './Product_Description.jsx';
import './App.css';

class Product extends Component {
  // constructor(props) {
  //   super(props);
  // }
    render() {

      console.log('this.props', this.props);
    return (
      <div>
      <h3>
        {this.props.text} <br/> 
        {this.props.name} {this.props.price} {this.props.description};

      </h3>
      </div>
    );
  }
}


function App() {
  
  const message = 'Hello, I am your first React code!';
  return (
    <div className="App">
      <header className="App-header">
              
        <Product text='Lesson-61' name='Bananas' price='5$' description='Fresh bananas from Ecuador' />
        <ProductName />
        <ProductPrice />
        <ProductDescription />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        {message}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
