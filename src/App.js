import logo from './logo.svg';
import './App.css';
import Home from './Components/Home'
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="">
    <Home/>
    </GoogleOAuthProvider>
  );
}

export default App;
