import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import { Layout } from "antd";
import LeftNav from "../../components/LeftNav";
import Header from "../../components/Header";

const { Footer, Sider, Content } = Layout;

export default function Admin(props) {
  let navigate = useNavigate();
  const user = memoryUtils.user;

  useEffect(() => {
    if (!user._id) {
      navigate("/login", { replace: true });
    }
  });
  return (
    <Layout style={{ minHeight: "100%" }}>
      <Sider>
        <LeftNav />
      </Sider>
      <Layout>
        <Header></Header>
        <Content style={{margin: '20px 20px 0px 20px', backgroundColor: '#fff'}}>
          <Outlet />
        </Content>
        <Footer style={{textAlign: 'center', color: '#cccccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
      </Layout>
    </Layout>
  );
}
