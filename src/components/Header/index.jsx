import React, { useEffect, useState } from "react";
import "./index.css";
import dayjs from "dayjs";
import menuList from "../../config/menuConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

const { confirm } = Modal;

export default function Header(props) {
  let navigate = useNavigate();
  const [title, setTitle] = useState("");

  const [curTime, setCurTime] = useState(dayjs().format("YYYY-MM-DD HH:mm:ss"));
  useEffect(() => {
    let intervalId = setInterval(() => {
      setCurTime(dayjs().format("YYYY-MM-DD HH:mm:ss"));
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });

  // 根据路由路径更新title
  let location = useLocation();
  let pathname = location.pathname;
  if(pathname.indexOf("/product") === 0) {
    pathname = '/product'
  }
  useEffect(() => {
    const title = getTitle(menuList, pathname);
    // 更新title
    setTitle(title);

    function getTitle(menuList, pathname) {
      for (let i = 0; i < menuList.length; i++) {
        if (menuList[i].path === pathname) {
          return menuList[i].title;
        }
        if (menuList[i].children) {
          const title = getTitle(menuList[i].children, pathname);
          if (title) {
            return title;
          }
        }
      }
    }
  }, [pathname]);

  const logout = () => {
    confirm({
      title: "确定退出登录吗？",
      icon: <ExclamationCircleOutlined />,
      content: "将返回登录页面",
      onOk() {
        storageUtils.removeUser();
        memoryUtils.user = {};
        navigate("/login", { replace: true });
      },
    });
  };

  return (
    <div className="header">
      <div className="header-top">
        <span>欢迎，{memoryUtils.user.username}</span>
        <Button type="link" onClick={logout}>
          退出
        </Button>
      </div>
      <div className="header-buttom">
        <div className="header-buttom-left">
          <span>{title}</span>
        </div>
        <div className="header-buttom-right">
          <span>{curTime}</span>
          {/* jsonp请求天气信息（心知天气）待开发 */}
          {/* <img src={logo} alt="weather" />
        <span>晴</span>   */}
        </div>
      </div>
    </div>
  );
}
