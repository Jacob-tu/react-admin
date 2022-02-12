import React, { forwardRef } from "react";
import { Form, Input } from "antd";

const AddRoleForm = forwardRef((props, ref) => {
  return (
    <Form
      ref={ref}
      name="add_role_form"
    >
      <Form.Item
        label="角色名称"
        name="roleName"
        rules={[{ required: true, message: "角色名称不能为空！" }]}
      >
        <Input placeholder="请输入角色名称" />
      </Form.Item>
    </Form>
  );
})

export default AddRoleForm