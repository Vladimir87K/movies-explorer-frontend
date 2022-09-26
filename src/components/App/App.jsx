import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies'
import Footer from '../Footer/Footer';
import Page404 from '../Page404/Page404';
import Register from '../Register/Register';
import Login from '../Login/Login';

const App = () => {
 
  return (
    <div className='page'>
      <Header />
      {/* <Main /> */}
      {/* <Movies /> */}
      <Footer />
      {/* <Register /> */}
      <Login />
      {/* <Page404 /> */}
    </div>
  );
}

export default App;
