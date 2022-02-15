import React, { useEffect } from "react";
import logo from "../../assets/images/logo.png";
// 只能引入css，引入less无效
import "./index.css";
// import { reqLogin } from "../../api";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import memoryUtils from "../../utils/memoryUtils";
// import storageUtils from "../../utils/storageUtils";
import { connect } from "react-redux";
import { login } from "../../redux/actions";

function Login(props) {
  let navigate = useNavigate();
  useEffect(() => {
    // 如果用户已经登录直接跳转到首页
    // const user = memoryUtils.user
    const user = props.user;
    if (user?._id) {
      navigate("/home");
    }
  }, [navigate, props.user]);

  const onFinish = async (userInfo) => {
    /*改为redux派发异步action
    let res = await reqLogin(userInfo);
    if (res.status === 0) {
      message.success("登录成功！");
      const user = res.data
      memoryUtils.user = user // 存储在内存
      storageUtils.saveUser(user) // 存储在本地
      navigate('/home', {replace: true})
    } else {
      message.error(res.msg);
    }
    */
    props.login(userInfo);
  };
  return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo" />
        <h1>React 项目：后台管理系统</h1>
      </header>
      <section className="login-content">
        <h2>用户登录</h2>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名",
                whitespace: true,
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              style={{ color: "rgba(0,0,0,.25)" }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
                whitespace: true,
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              style={{ color: "rgba(0,0,0,.25)" }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
}

export default connect((state) => ({ user: state.user }), { login })(Login);
