import React, { useEffect, useRef, useState } from "react";
import { Card, Button, Select, Table, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PAGE_SIZE } from "../../utils/constant";
import {
  reqGetProductList,
  reqSearchProduct,
  reqUpdateProductStatus,
} from "../../api";
import { useNavigate } from "react-router-dom";

import "./index.css";

const { Option } = Select;

export default function Product(props) {
  const [productList, setProductList] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("productName");
  const [searchName, setSearchName] = useState("");
  const pageNumRef = useRef(1);
  let navigate = useNavigate();

  useEffect(() => {
    getProductList(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const title = (
    <>
      <Select
        value={searchType}
        onChange={(value) => setSearchType(value)}
        style={{ width: 150 }}
      >
        <Option value="productName">按名称搜索</Option>
        <Option value="productDesc">按描述搜索</Option>
      </Select>
      <Input
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="关键字"
        allowClear
        style={{ width: 150, margin: "0 15px" }}
      ></Input>
      <Button type="primary" onClick={() => getProductList(1)}>
        搜索
      </Button>
    </>
  );
  const extra = (
    <Button type="primary" onClick={() => navigate("/product/addupdate")}>
      <PlusOutlined />
      添加商品
    </Button>
  );
  const columns = [
    {
      title: "商品名称",
      dataIndex: "name",
    },
    {
      title: "商品描述",
      dataIndex: "desc",
    },
    {
      title: "价格",
      dataIndex: "price",
      render: (price) => "¥" + price,
    },
    {
      title: "状态",
      render: (product) => {
        const { _id, status } = product;
        const newStatus = status === 1 ? 2 : 1;
        return (
          <>
            <span>{status === 1 ? "在售" : "已下架"}</span>
            <Button
              type="primary"
              style={{ marginLeft: status === 1 ? 29 : 15 }}
              onClick={() => updateProductStatus(_id, newStatus)}
            >
              {status === 1 ? "下架" : "上架"}
            </Button>
          </>
        );
      },
    },
    {
      title: "操作",
      render: (product) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => navigate("/product/detail", { state: product })}
            >
              详情
            </Button>
            <Button
              type="link"
              onClick={() => navigate("/product/addupdate", { state: product })}
            >
              修改
            </Button>
          </>
        );
      },
    },
  ];

  // 获取商品分页列表
  async function getProductList(pageNum) {
    // 更新当前页码
    pageNumRef.current = pageNum;
    let res;
    setLoading(true);
    if (searchName) {
      res = await reqSearchProduct(pageNum, PAGE_SIZE, searchType, searchName);
    } else {
      res = await reqGetProductList(pageNum, PAGE_SIZE);
    }
    setLoading(false);
    if (res.status === 0) {
      const { list, total } = res.data;
      setProductList(list);
      setTotal(total);
    }
  }
  // 更新商品状态
  async function updateProductStatus(productId, status) {
    const res = await reqUpdateProductStatus(productId, status);
    if (res.status === 0) {
      message.success("更新商品成功");
      getProductList(pageNumRef.current);
    }
  }

  return (
    <>
      <Card title={title} extra={extra}>
        <Table
          dataSource={productList}
          columns={columns}
          rowKey="_id"
          bordered
          loading={loading}
          pagination={{
            current: pageNumRef.current,
            pageSize: PAGE_SIZE,
            total,
            showQuickJumper: true,
            onChange: getProductList,
          }}
        />
      </Card>
    </>
  );
}
