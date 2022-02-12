import React, { useState, useEffect, useRef } from "react";
import { Card, Button, Table, message, Modal } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";
import {
  reqAddCategory,
  reqGetCategoryList,
  reqUpdateCategory,
} from "../../api";
import AddCategoryForm from "./AddCategoryForm";
import UpdateCategoryForm from "./UpdateCategoryForm";

export default function Category(props) {
  let [title, setTitle] = useState("一级分类列表");
  let [categoryList, setCategoryList] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  // 是否展示查看二级分类button，也可根据parentIdRef来判断
  let [isShow, setIsShow] = useState(true);
  // modalShowStatus用来控制添加和修改两个对话框的显示和隐藏，0：都不显示，1：展示添加，2：展示修改
  let [modalShowStatus, setModalShowStatus] = useState(0);
  // 存放商品信息
  const categoryRef = useRef({});
  const updateFormRef = useRef(null);
  const addFormRef = useRef(null);
  const parentIdRef = useRef("0");
  // 保存所有一级分类
  const lev1_categoryListRef = useRef(null);
  const columns = [
    {
      title: "分类名称",
      dataIndex: "name",
    },
    {
      title: "操作",
      width: 300,
      render: (category) => (
        <>
          <Button type="link" onClick={() => showUpdateModal(category)}>
            修改分类
          </Button>
          {isShow ? (
            <Button type="link" onClick={() => getSubCategoryList(category)}>
              查看子分类
            </Button>
          ) : null}
        </>
      ),
    },
  ];
  // 第二个参数指定为空数组，则回调函数只会在组件componentDidMount生命周期执行
  useEffect(() => {
    getCategoryList("0")
  }, []);

  // 获取要展示的分类列表数据
  async function getCategoryList(parentId) {
    setIsLoading(true);
    const res = await reqGetCategoryList(parentId);
    if (res.status === 0) {
      if(parentId === '0') {
        lev1_categoryListRef.current = res.data
      }
      setCategoryList(res.data);
    } else {
      message.error("获取分类列表失败！");
    }
    setIsLoading(false);
    return res.data;
  }
  // 查看子分类
  function getSubCategoryList(category) {
    const _id = category._id;
    getCategoryList(_id);
    setTitle(
      <span>
        <Button type="link" onClick={handleBack}>
          一级分类列表
        </Button>
        <ArrowRightOutlined style={{ marginRight: 15 }} />
        <span>{category.name}</span>
      </span>
    );
    // 子分类下不展示查看子分类
    setIsShow(false);
    // 修改父分类id
    parentIdRef.current = _id;
  }
  // 返回一级分类
  function handleBack() {
    getCategoryList('0');
    setTitle("一级分类列表");
    setIsShow(true);
    parentIdRef.current = "0";
  }
  function showAddModal() {
    setModalShowStatus(1);
  }
  function showUpdateModal(category) {
    categoryRef.current = category;
    setModalShowStatus(2);
  }
  function hideModal() {
    setModalShowStatus(0);
  }
  function addCategory() {
    const addForm = addFormRef.current;
    addForm
      .validateFields()
      .then(async (values) => {
        const { parentId, categoryName } = values;
        const res = await reqAddCategory(parentId, categoryName);
        if(res.status === 0) {
          setModalShowStatus(0)
          getCategoryList(parentIdRef.current)
        }
      })
      .catch((err) => {});
  }
  function updateCategory() {
    let category = categoryRef.current;
    let categoryId = category._id;
    let parentId = category.parentId;
    let updateForm = updateFormRef.current;
    // let categoryName = updateForm.getFieldValue("categoryName")
    // console.log(categoryId, categoryName);
    updateForm
      .validateFields()
      .then(async (values) => {
        let { categoryName } = values;
        const res = await reqUpdateCategory(categoryId, categoryName);
        if (res.status === 0) {
          setModalShowStatus(0);
          getCategoryList(parentId);
        }
      })
      .catch((err) => {});
  }

  return (
    <>
      <Card
        title={title}
        extra={
          <Button type="primary" onClick={showAddModal}>
            <PlusOutlined />
            添加
          </Button>
        }
      >
        <Table
          dataSource={categoryList}
          columns={columns}
          rowKey="_id"
          bordered
          size="middle"
          loading={isLoading}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />
      </Card>
      <Modal
        title="添加分类"
        visible={modalShowStatus === 1}
        onOk={addCategory}
        onCancel={hideModal}
        destroyOnClose={true}
      >
        <AddCategoryForm
          // 给子组件加ref以获取子组件的表单数据，该方法比下面那种方法好
          ref={addFormRef}
          lev1_categoryList={lev1_categoryListRef.current}
          parentId={parentIdRef.current}
        />
      </Modal>
      <Modal
        title="修改分类"
        visible={modalShowStatus === 2}
        onOk={updateCategory}
        onCancel={hideModal}
        destroyOnClose={true}
      >
        <UpdateCategoryForm
          categoryName={categoryRef.current.name}
          setForm={(form) => {
            // 子组件向父组件传递form实例存放在Ref中
            updateFormRef.current = form;
          }}
        />
      </Modal>
    </>
  );
}
