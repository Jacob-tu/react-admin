import React from "react";
// 按需引入antd组件
import {} from "antd";
// 引入antd.css
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import AddUpdate from './pages/Product/AddUpdate'
import Detail from './pages/Product/Detail'
import Role from "./pages/Role";
import User from "./pages/User";
import Bar from "./pages/Charts/Bar";
import Line from "./pages/Charts/Line";
import Pie from "./pages/Charts/Pie";
import Error from "./pages/404";

export default function App(props) {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Admin />}>
          <Route path="home" element={<Home />} />
          <Route path="category" element={<Category />} />
          <Route path="product" element={<Product />} />
          <Route path="product/addupdate" element={<AddUpdate />} />
          <Route path="product/detail" element={<Detail />} />
          <Route path="user" element={<User />} />
          <Route path="role" element={<Role />} />
          <Route path="charts/bar" element={<Bar />} />
          <Route path="charts/pie" element={<Pie />} />
          <Route path="charts/line" element={<Line />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
