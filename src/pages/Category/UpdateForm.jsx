import React, {useRef, useEffect} from "react";
import { Form, Input } from "antd";

export default function UpdateCategoryForm(props) {
  const formEl = useRef(null);
  let { categoryName, setForm } = props;
  
  useEffect(() => {
    setForm(formEl.current)
  }, [setForm])

  return (
    <Form
      ref={formEl}
      name="update_category_form"
      initialValues={{ categoryName: categoryName }}
      preserve={false}
    >
      <Form.Item
        label="新的分类名"
        name="categoryName"
        rules={[{ required: true, message: "请输入分类名！" }]}
      >
        <Input placeholder="请输入分类的名称" allowClear />
      </Form.Item>
    </Form>
  );
}
