import React, { forwardRef } from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const AddCategoryForm = forwardRef((props, ref) => {
  const { lev1_categoryList, parentId } = props;
  
  return (
    <Form
      ref={ref}
      name="add_category_form"
      initialValues={{ parentId: parentId }}
      preserve={false}
    >
      <Form.Item
        label="父分类"
        name="parentId"
        rules={[{ required: true, message: "请选择父分类！" }]}
      >
        <Select>
          <Option value="0">添加一级分类</Option>
          <Option value="-1" disabled>
            选择一级分类以添加二级分类
          </Option>
          {lev1_categoryList.map((item) => (
            <Option key={item._id} value={item._id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="分类名"
        name="categoryName"
        rules={[{ required: true, message: "请输入分类名！" }]}
      >
        <Input placeholder="请输入要添加分类的名称" />
      </Form.Item>
    </Form>
  );
})

export default AddCategoryForm