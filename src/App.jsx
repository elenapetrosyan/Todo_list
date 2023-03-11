import './App.css';
import Product from './products/Product';
import Counter from './Counter';
import { Component } from 'react';


class App extends Component {

  state = {

    amd:0,
    exchangeRate: 391,

    products: [
      {
        name: 'banana',
        price: '5',
        description: 'Tasty bananas!'
      },

      {
        name: 'plums',
        price: '7',
        description: 'Tasty plums!'
      },

      {
        name: 'peaches',
        price: '10',
        description: 'Tasty peaches!'
      },

      {
        name: 'pears',
        price: '15',
        description: 'Tasty pears!'
      }
    ]
  }

  
  handleInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({
      amd: event.target.value,
    })
  };
  
  render() {
    const productComponents = this.state.products.map((product) => {
      return (
        <Product
          key={product.name}
          name={product.name}
          price={product.price}
          description={product.description}
        />
      )
    });

    console.log(productComponents);

    const usd = (this.state.amd / this.state.exchangeRate).toFixed(2);

    return (
      <div className="App">

        {productComponents}
        
        <Counter />

        
        AMD: <input 
        type="number" 
        placeholder='Input AMD'
        onChange = {this.handleInputChange}
        
        /> 
        = 
        USD: <input type="text" 
        value={usd} readOnly={true}
        />

      </div>
    );
  }


}

export default App;
