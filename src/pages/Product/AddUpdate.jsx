import React, { useState, useEffect, useRef } from "react";
import { Card, Form, Input, Cascader, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import {
  reqGetCategoryList,
  reqAddProduct,
  reqUpdateProduct,
} from "../../api/index";
import Pictures from "./Pictures";
import RichTextEditor from "./RichTextEditor";

const { TextArea } = Input;

export default function AddUpdate(props) {
  let navigate = useNavigate();
  const picRef = useRef(null);
  const detailRef = useRef(null);
  let location = useLocation();
  // 根据state是否为null来判断是添加商品还是修改商品，state为路由参数product
  let { state: product } = location;
  // 是否是修改商品
  const isUpdate = !!product;
  product = product || {};
  const { name, desc, price, imgs, detail, _id } = product;
  // 级联选择框option数组
  const category = [];
  const title = (
    <>
      <Button type="link" onClick={() => navigate(-1)}>
        <ArrowLeftOutlined />
      </Button>
      <span>{isUpdate ? "修改商品" : "添加商品"}</span>
    </>
  );
  // name, desc, category等值都存储在表单中，imgs和detail存储在其他组件中需要单独获取
  const onFinish = async (values) => {
    const { name, desc, price, category } = values;
    let pCategoryId, categoryId;
    // 选中一级分类时父分类为'0'
    if (category.length === 1) {
      pCategoryId = "0";
      categoryId = category[0];
    } else {
      pCategoryId = category[0];
      categoryId = category[1];
    }
    const imgs = picRef.current.getImgs(),
      detail = detailRef.current.getDetail();
    const product = {
      name,
      desc,
      price,
      pCategoryId,
      categoryId,
      imgs,
      detail,
    };
    let res;
    if (!isUpdate) {
      // 添加商品
      res = await reqAddProduct(product);
    } else {
      // 更新商品，多一个_id属性
      product._id = _id;
      res = await reqUpdateProduct(product);
    }
    if (res.status === 0) {
      message.success(`${isUpdate ? '更新' : '添加'}商品成功！`);
      navigate(-1);
    }else {
      message.error(`${isUpdate ? '更新' : '添加'}商品失败！`)
    }
  };

  const [options, setOptions] = useState([]);
  // 动态加载选项
  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    const subCategoryList = await getCategoryList(targetOption.value);
    targetOption.loading = false;
    if (subCategoryList && subCategoryList.length > 0) {
      const childrenOptions = subCategoryList.map((category) => ({
        value: category._id,
        label: category.name,
        isLeaf: true,
      }));
      targetOption.children = childrenOptions;
    } else {
      targetOption.isLeaf = true;
    }
    setOptions([...options]);
  };
  async function getCategoryList(parentId) {
    const res = await reqGetCategoryList(parentId);
    return res.data;
  }
  // 初始化options
  useEffect(() => {
    async function initOptions(categoryList) {
      const options = categoryList.map((category) => ({
        value: category._id,
        label: category.name,
        isLeaf: false,
      }));
      const { pCategoryId } = product;
      // 如果是二级分类商品的更新则默认展开二级options
      if (isUpdate && pCategoryId !== "0") {
        const subCategoryList = await getCategoryList(pCategoryId);
        const childrenOptions = subCategoryList.map((category) => ({
          value: category._id,
          label: category.name,
          isLeaf: true,
        }));
        const targetOption = options.find(
          (option) => option.value === pCategoryId
        );
        targetOption.children = childrenOptions;
      }
      setOptions(options);
    }
    getCategoryList("0")
      .then((categoryList) => {
        // 级联选择框默认选中数组category好像要在options初始化之前填充，否则貌似不生效
        if (isUpdate) {
          const { pCategoryId, categoryId } = product;
          // 如果是一个一级分类商品
          if (pCategoryId === "0") {
            category.push(categoryId);
          } else {
            // 是一个二级分类商品
            category.push(pCategoryId, categoryId);
          }
        }
        initOptions(categoryList);
      })
      .catch((err) => err);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card title={title}>
      <Form
        name="addupdate"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ name, desc, price, category }}
        onFinish={onFinish}
      >
        <Form.Item
          label="商品名称"
          name="name"
          rules={[{ required: true, message: "必须输入商品名称" }]}
        >
          <Input placeholder="请输入商品名称" />
        </Form.Item>
        <Form.Item
          label="商品描述"
          name="desc"
          rules={[{ required: true, message: "必须输入商品描述" }]}
        >
          <TextArea
            placeholder="请输入商品描述"
            autosize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
        <Form.Item
          label="商品价格"
          name="price"
          rules={[
            { required: true, message: "必须输入商品价格" },
            // 自定义校验规则
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("price") * 1 > 0) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("商品价格必须大于0"));
              },
            }),
          ]}
        >
          <Input type="number" placeholder="请输入商品价格" addonAfter="元" />
        </Form.Item>

        <Form.Item
          label="商品分类"
          name="category"
          rules={[{ required: true, message: "必须指定商品分类" }]}
        >
          <Cascader
            options={options}
            loadData={loadData}
            placeholder="请指定商品分类"
          />
        </Form.Item>
        <Form.Item label="商品图片">
          <Pictures ref={picRef} imgs={imgs} />
        </Form.Item>
        <Form.Item
          label="商品详情"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 20 }}
        >
          <RichTextEditor ref={detailRef} detail={detail} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
