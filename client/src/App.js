import "./App.css";
import Post from "./Post";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegistorPage from "./pages/RegistorPage";
import { UserContext, UserContextProvider } from "./UserContext";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/register"} element={<RegistorPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
