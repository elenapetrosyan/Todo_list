import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';
import Todo from './pages/todo/Todo';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import NavBar from './components/navBar/NavBar';
import NotFound from './pages/notFound/NotFound';
import SingleTask from './pages/singleTask/SingleTask';


const pages = [
  {
    path: "/",
    element: <Todo />,
  },

  {
    path: "/contact",
    element: <Contact />,
  },

  {
    path: "/about",
    element: <About />,
  },

  {
    path: "*",
    element: <NotFound />,
  },

  {
    path: "/task/:taskId",
    element: <SingleTask />,
  },
];

function App() {

  return (
    <BrowserRouter>
      <main>
        <NavBar />
        <Routes>
          {
            pages.map(page => (
              <Route
                key={page.path}
                path={page.path}
                element={page.element}
              />
            ))
          }
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
