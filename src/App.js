import Home from "./components/home/home";
import Login from "./components/login/login";
import useToken from "./Hooks/useToken";
import 'bootstrap/dist/css/bootstrap.min.css';
import OneMessege from "./components/oneMessege/oneMessege";
import { Route, Routes } from "react-router-dom";
function App() {
  const [token] = useToken();


  if (token) {
    
    return <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/oneMessege/:id" element={< OneMessege/>} />
      </Routes>
    </>;
  } else {
    return<><Login/></>;;
  }
}

export default App;
