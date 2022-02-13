import React, { forwardRef } from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const AddUserForm = forwardRef((props, ref) => {
  const roles = [...props.roles];
  const onFinish = () => {};
  const handleChange = () => {};
  return (
    <Form
      ref={ref}
      name="user_info_form"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: "用户名不能为空",
          },
          { min: 4, message: "长度不能小于4位" },
          { max: 12, message: "长度不能大于12位" },
          {
            pattern: /^[a-zA-Z0-9_]+$/,
            message: "只能输入数字、字母或下划线",
          },
        ]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: "密码不能为空",
          },
          {
            validator: (_, value) => {
              if (value && value.length < 4) {
                return Promise.reject(new Error("长度不能小于4位"));
              } else if (value && value.length > 12) {
                return Promise.reject(new Error("长度不能大于12位"));
              } else {
                return Promise.resolve();
              }
            },
          },
        ]}
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item label="手机号" name="phone">
        <Input placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item label="邮箱" name="email">
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item label="角色" name="role_id">
        <Select placeholder="请分配角色" onChange={handleChange}>
          {roles.map((role) => (
            <Option value={role._id} key={role._id}>
              {role.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
});

export default AddUserForm;
