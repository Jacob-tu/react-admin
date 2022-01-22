import React, {  } from "react";
// 按需引入antd组件
import {} from "antd";
// 引入antd.css
import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Category from './pages/Category'
import Product from './pages/Product'
import Role from './pages/Role'
import User from './pages/User'
import Bar from './pages/Charts/Bar'
import Line from './pages/Charts/Line'
import Pie from './pages/Charts/Pie'

export default function App(props) {
  let navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Admin />}>
          <Route path="home" element={<Home />} />
          <Route path="category" element={<Category />} />
          <Route path="product" element={<Product />} />
          <Route path="user" element={<User />} />
          <Route path="role" element={<Role />} />
          <Route path="charts/bar" element={<Bar />} />
          <Route path="charts/pie" element={<Pie />} />
          <Route path="charts/line" element={<Line />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <h1>404 Not Found</h1>
              <p>There's nothing here!</p>
              <button onClick={() => {navigate("/", { replace: true })}}>
                返回主页
              </button>
            </main>
          }
        />
      </Routes>
    </div>
  );
}
