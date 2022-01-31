import React, { useEffect } from "react";
import logo from "../../assets/images/logo.png";
// 只能引入css，引入less无效
import "./index.css";
import { reqLogin } from "../../api";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

export default function Login(props) {
  let navigate = useNavigate();
  useEffect(() => {
    const user = memoryUtils.user
    if(user._id) {
      navigate('/')
    }
  })

  const onFinish = async (userInfo) => {
    let res = await reqLogin(userInfo);
    if (res.status === 0) {
      message.success("登录成功！");
      const user = res.data
      memoryUtils.user = user // 存储在内存
      storageUtils.saveUser(user) // 存储在本地
      navigate('/', {replace: true})
    } else {
      message.error(res.msg);
    }
  };
  return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo" />
        <h1>React 项目：后台管理系统</h1>
      </header>
      <section className="login-content">
        <h2>用户登录</h2>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "用户名不能为空",
                whitespace: true,
              },
              { min: 4, message: "长度不能小于4位" },
              { max: 12, message: "长度不能大于12位" },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: "只能输入数字、字母或下划线",
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
                validator: (_, value) => {
                  if (!value) {
                    return Promise.reject(new Error("密码不能为空"));
                  } else if (value.length < 3) {
                    return Promise.reject(new Error("长度不能小于3位"));
                  } else if (value.length > 12) {
                    return Promise.reject(new Error("长度不能大于12位"));
                  } else {
                    return Promise.resolve();
                  }
                },
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
