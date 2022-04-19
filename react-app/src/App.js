import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Context } from "./context/Context";


import MyPosts from "./pages/myPosts/MyPosts";
import CategoryPost from "./pages/CategoryPost/CategoryPost";
import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import NotFound from "./pages/notFound/NotFound";
import ScrollToTop from "./components/ScrollTop";
import Header from "./components/header/Header";
import MyAccount from "./pages/myAccount/MyAccount";


function App() {
   const { user } = useContext(Context)

  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop />
      <TopBar />
      <Header />
        <Routes>
            <Route path="/" element={<Home /> } />
            <Route path="login" element={user ? <Home /> : <Login />} />
            <Route path="register" element={user ? <Home /> : <Register />} />
            <Route path="settings/:id" element={user ? <Settings /> : <Login />} />
            <Route path="Account/:id" element={user ? <MyAccount /> : <Login />} />
            <Route path="write" element={user ? <Write /> : <Login />} />
            <Route path="post/:id" element= {<Single />} />
            <Route path="myposts" element= {user ? <MyPosts/> : <Login />} />
            <Route path="*" element= {<NotFound />} />
            {/* <Route path="posts/:String" element= {user ? <CategoryPost/> : <Login />} /> */}

        </Routes>
      </BrowserRouter>,
    </div>
  );
}

export default App;
