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
    path: "/home", // 对应的path和key
    icon: <HomeOutlined />, // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: "商品",
    path: "/products",
    icon: <AppstoreOutlined />,
    children: [
      // 子菜单列表
      {
        title: "品类管理",
        path: "/category",
        icon: <BarsOutlined />,
      },
      {
        title: "商品管理",
        path: "/product",
        icon: <ToolOutlined />,
      },
    ],
  },

  {
    title: "用户管理",
    path: "/user",
    icon: <UserOutlined />,
  },
  {
    title: "角色管理",
    path: "/role",
    icon: <SafetyOutlined />,
  },

  {
    title: "图形图表",
    path: "/charts",
    icon: <AreaChartOutlined />,
    children: [
      {
        title: "柱形图",
        path: "/charts/bar",
        icon: <BarChartOutlined />,
      },
      {
        title: "折线图",
        path: "/charts/line",
        icon: <LineChartOutlined />,
      },
      {
        title: "饼图",
        path: "/charts/pie",
        icon: <PieChartOutlined />,
      },
    ],
  },
  {
    title: "订单管理",
    path: "/order",
    icon: <WindowsOutlined />,
  },
];

export default menuList;
