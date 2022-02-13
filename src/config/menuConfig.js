import {
  HomeOutlined,
  AppstoreOutlined,
  BarsOutlined,
  ToolOutlined,
  UserOutlined,
  SafetyOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  WindowsOutlined,
} from "@ant-design/icons";

const menuList = [
  {
    title: "首页", // 菜单标题名称
    key: "/home",
    path: "/home", 
    icon: <HomeOutlined />, // 图标名称
    isPublic: true, // 默认拥有的菜单权限
    disabled: true, // 默认拥有的菜单权限，树形控件中禁用
  },
  {
    title: "商品",
    key: "/products",
    path: "/products",
    icon: <AppstoreOutlined />,
    children: [
      // 子菜单列表
      {
        title: "品类管理",
        key: "/category",
        path: "/category",
        icon: <BarsOutlined />,
      },
      {
        title: "商品管理",
        key: "/product",
        path: "/product",
        icon: <ToolOutlined />,
      },
    ],
  },

  {
    title: "用户管理",
    key: "/user",
    path: "/user",
    icon: <UserOutlined />,
  },
  {
    title: "角色管理",
    key: "/role",
    path: "/role",
    icon: <SafetyOutlined />,
  },

  {
    title: "图形图表",
    key: "/charts",
    path: "/charts",
    icon: <AreaChartOutlined />,
    children: [
      {
        title: "柱形图",
        key: "/charts/bar",
        path: "/charts/bar",
        icon: <BarChartOutlined />,
      },
      {
        title: "折线图",
        key: "/charts/line",
        path: "/charts/line",
        icon: <LineChartOutlined />,
      },
      {
        title: "饼图",
        key: "/charts/pie",
        path: "/charts/pie",
        icon: <PieChartOutlined />,
      },
    ],
  },
  {
    title: "订单管理",
    key: "/order",
    path: "/order",
    icon: <WindowsOutlined />,
  },
];

export default menuList;
