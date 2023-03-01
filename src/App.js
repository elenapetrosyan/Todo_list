import logo from './logo.svg';
import MyThirdComponent from './NewModule.jsx';
import './App.css';

function MyFirstComponent() {
  const comp = 'I am from the First Component function';

  return (
     <div>
       {comp}
  </div> 
  )
}

function MySecondComponent() {
  
  return (
     <h3>
      I'm Second Component!
     </h3> 
  )
}

function App() {
  
  const message = 'Hello, I am your first React code!';
  return (
    <div className="App">
      <header className="App-header">
        <MyFirstComponent />
        <MySecondComponent />
        <MyThirdComponent />
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
