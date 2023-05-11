import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Todo from './components/todo/Todo';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import NavBar from './components/navBar/NavBar';
import NotFound from './pages/notFound/NotFound';
import SingleTask from './pages/singleTask/SingleTask';
//import Flex from "./components/Flex";

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

        {/* <Flex justifyContent="center" border={true}> */}
          {/* <div>test</div> */}
          {/* <span>test1</span> */}
          {/* <p>text example</p> */}
          {/* <button>just button</button> */}
        {/* </Flex> */}
{/*  */}
        {/* <Flex justifyContent="left"> */}
          {/* <div>test-left</div> */}
          {/* <span>test1-left</span> */}
          {/* <p>text example-left</p> */}
          {/* <button>just button</button> */}
        {/* </Flex> */}
{/*  */}
        {/* <Flex justifyContent="right"> */}
          {/* <div>test-right</div> */}
          {/* <span>test1-right</span> */}
          {/* <p>text example-right</p> */}
          {/* <button>just button</button> */}
        {/* </Flex> */}

        {/* <Flex> */}
          {/* <div>test</div> */}
          {/* <span>test1</span> */}
          {/* <p>text example</p> */}
          {/* <button>just button</button> */}
        {/* </Flex> */}

        <Routes>
          {pages.map((page) => (
            <Route key={page.path} path={page.path} element={page.element} />
          ))}
        </Routes>

        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

      </main>
    </BrowserRouter>
  );
}

export default App;
