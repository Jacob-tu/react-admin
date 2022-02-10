import React, { useEffect, useRef, useState } from "react";
import { Card, Button, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { reqGetCategoryById } from "../../api";
import {BASE_IMG_URL} from "../../utils/constant"

export default function Detail(props) {
  let navigate = useNavigate();
  let location = useLocation();
  // console.log(location);
  const { name, desc, price, imgs, detail, categoryId, pCategoryId } = location.state;
  const [categoryNameLev1, setCategoryNameLev1] = useState("");
  const [categoryNameLev2, setCategoryNameLev2] = useState("");
  useEffect(() => {
    async function getCategoryById() {
      if(pCategoryId === '0'){
        const res = await reqGetCategoryById(categoryId) 
        setCategoryNameLev1(res.data.name)
      }else {
        const resArr = await Promise.all([reqGetCategoryById(pCategoryId), reqGetCategoryById(categoryId)])
        setCategoryNameLev1(resArr[0].data.name)
        setCategoryNameLev2(resArr[1].data.name)
      }
    }
    getCategoryById()
  }, [categoryId, pCategoryId]);
  const titleRef = useRef(
    <>
      <Button type="link" onClick={() => navigate(-1)}>
        <ArrowLeftOutlined style={{ fontSize: 20 }} />
      </Button>
      <span>商品详情</span>
    </>
  );
  const data = [
    {
      title: "商品名称:",
      desc: name,
    },
    {
      title: "商品描述:",
      desc: desc,
    },
    {
      title: "商品价格:",
      desc: price,
    },
    {
      title: "所属分类:",
      desc:
        categoryNameLev1 + (categoryNameLev2 ? " --> " + categoryNameLev2 : ""),
    },
    {
      title: "商品图片:",
      desc: imgs.map(img => (
        <img key={img} src={BASE_IMG_URL + img} className="product-img" alt="img"/>
      )),
    },
    {
      title: "商品详情：",
      desc: <span dangerouslySetInnerHTML={{ __html: detail }}></span>,
    },
  ];

  return (
    <Card title={titleRef.current} className="product-detail">
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <span className="left">{item.title}</span>
            <span>{item.desc}</span>
          </List.Item>
        )}
      />
    </Card>
  );
}
