import React from "react";
import { Outlet, Navigate } from "react-router-dom";
// import memoryUtils from "../../utils/memoryUtils";
import { Layout } from "antd";
import LeftNav from "../../components/LeftNav";
import Header from "../../components/Header";
import { connect } from "react-redux";

const { Footer, Sider, Content } = Layout;

function Admin(props) {
  // let navigate = useNavigate();
  // const user = memoryUtils.user;
  const user = props.user;

  // useNavigate() 钩子只能在放在useEffect中导致组件挂载后才会进行路由跳转，从而在LeftNav组件中报错
  // 这里适合用<Navigate />标签式进行路由跳转
  // useEffect(() => {
  //   if (!user._id) {
  //     navigate("/login", { replace: true });
  //   }
  // }, [navigate, user._id]);
  if (!user._id) {
    return <Navigate to="/login" replace /> // 跳转到登录
  }
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

export default connect(
  state => ({user: state.user}),
  {}
)(Admin)