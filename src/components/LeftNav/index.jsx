import { Link, useLocation } from "react-router-dom";
import "./index.css";
import logo from "../../assets/images/logo.png";
import { Menu } from "antd";
import menuList from "../../config/menuConfig";
// import memoryUtils from "../../utils/memoryUtils";
import { connect } from "react-redux";
import { setHeadTitle } from "../../redux/actions";

const { SubMenu } = Menu;

function LeftNav(props) {
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
  // 判断item是否存在menus中
  function hasAuth(item, menus) {
    const {key} = item
    if(menus.indexOf(key)!== -1){
      // 拥有该权限
      return true
    }else if(item.children) {
      // 是否拥有该菜单的子菜单权限
      return !!item.children.find(item => menus.indexOf(item.key)!==-1)
    }else {
      return false
    }
  }
  function getMenuItem(menuList) {
    // const menus = memoryUtils.user.role.menus
    // const username = memoryUtils.user.username
    const menus = props.user.role.menus
    const username = props.user.username
    return menuList.map((item) => {
      /*
       *  item项：
       *  {
       *    title: '商品',
       *    key: '/products',
       *    path: '/products',
       *    icon: <AppstoreOutlined />,
       *    children: [ // 子菜单列表
       *      ...
       *    ]
       *  }
       */
      if(item.path === pathname) {
        // 初始化title
        props.setHeadTitle(item.title)
      }
      const {isPublic} = item
      // admin用户展示所有菜单，isPublic是默认展示的菜单，判断当前用户是否拥有该菜单权限
      if(username === 'admin' || isPublic || hasAuth(item, menus)) {
        return item.children ? (
          <SubMenu key={item.path} icon={item.icon} title={item.title}>
            {getMenuItem(item.children)}
          </SubMenu>
        ) : (
          <Menu.Item key={item.path} icon={item.icon}>
            <Link to={item.path} onClick={() => props.setHeadTitle(item.title)}>{item.title}</Link>
          </Menu.Item>
        );
      }else {
        return null
      }
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

export default connect(
  state => ({user: state.user}),
  {setHeadTitle}
)(LeftNav)