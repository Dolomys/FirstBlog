import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "./context/Context";


import MyPosts from "./pages/myPosts/MyPosts";
import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import NotFound from "./pages/notFound/NotFound";
import ScrollToTop from "./components/ScrollTop";
import Maps from "./pages/Maps/Maps";
import Header from "./components/header/Header";
import { Menu } from "./components/menu/Menu";


function App() {
   const { user } = useContext(Context)
   const [side, setSide] = useState(true)

  return (
    <div className="App">
      <BrowserRouter>
      <ScrollToTop />
     <TopBar side={side} setSide={setSide}/>
     <Menu side={side} setSide={setSide}/>
      <Header />
        <Routes>
            <Route path="/" element={<Home /> } />
            <Route path="login" element={user ? <Home /> : <Login />} />
            <Route path="register" element={user ? <Home /> : <Register />} />
            <Route path="settings/:id" element={user ? <Settings /> : <Login />} />
            <Route path="write" element={user ? <Write /> : <Login />} />
            <Route path="post/:id" element= {<Single />} />
            <Route path="myposts" element= {user ? <MyPosts/> : <Login />} />
            <Route path="map" element= {<Maps />} />
            <Route path="*" element= {<NotFound />} />
            {/* <Route path="posts/:String" element= {user ? <CategoryPost/> : <Login />} /> */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
