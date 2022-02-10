import { Link, useLocation } from "react-router-dom";
import "./index.css";
import logo from "../../assets/images/logo.png";
import { Menu } from "antd";
import menuList from "../../config/menuConfig";

const { SubMenu } = Menu;

export default function LeftNav(props) {
  // 得到当前路由路径
  let location = useLocation();
  let pathname = location.pathname;
  if(pathname.indexOf("/product") === 0) {
    pathname = '/product'
  }
  let defaultOpenKeys = getDefaultOpenKeys(menuList, pathname);

  // 回溯法获取默认需要展开的子菜单key数组（根据路由路径），适用于多级子菜单
  function getDefaultOpenKeys(menuList, pathname) {
    // 因为最后会回溯所以需要借助一个额外的数组temp来存放数据
    const temp = []
    const res = []
    dfs(menuList, pathname, temp, res)
    return res

    function dfs(menuList, pathname, temp, res) {
      for (let i = 0; i < menuList.length; i++) {
        if (menuList[i].path === pathname) {
          // 不能写成res = [...temp]，因为这样不能修改传入的原数组res，要使用push方法
          res.push(...temp)
          return;
        }
        if (menuList[i].children) {
          temp.push(menuList[i].path);
          dfs(menuList[i].children, pathname, temp, res);
          temp.pop();
        }
      }
    }
  }
  function getMenuItem(menuList) {
    return menuList.map((item) => {
      /*
       *  item项：
       *  {
       *    title: '商品',
       *    path: '/products',
       *    icon: <AppstoreOutlined />,
       *    children: [ // 子菜单列表
       *      ...
       *    ]
       *  }
       */
      return item.children ? (
        <SubMenu key={item.path} icon={item.icon} title={item.title}>
          {getMenuItem(item.children)}
        </SubMenu>
      ) : (
        <Menu.Item key={item.path} icon={item.icon}>
          <Link to={item.path}>{item.title}</Link>
        </Menu.Item>
      );
    });
  }

  return (
    <div className="left-nav">
      <Link to="/" className="left-nav-header">
        <img src={logo} alt="logo" />
        <h1>硅谷后台</h1>
      </Link>
      <Menu
        // 这里不能使用defaultSelectedKeys，因为访问根路径/时会重定向到/home路径，但defaultSelectedKeys不会由/变成/home
        selectedKeys={[pathname]}
        // 这里不能使用openKeys，因为会固定死菜单导致不能展开
        defaultOpenKeys={defaultOpenKeys}
        mode="inline"
        theme="dark"
      >
        {/* <Menu.Item key="home" icon={<PieChartOutlined />}>
          <Link to="/home">首页</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
          <Menu.Item key="category" icon={<PieChartOutlined />}>
            <Link to="/category">品类管理</Link>
          </Menu.Item>
        </SubMenu> */}
        {getMenuItem(menuList)}
      </Menu>
    </div>
  );
}
