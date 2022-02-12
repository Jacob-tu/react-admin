import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Form, Input, Tree } from "antd";
import menuList from "../../config/menuConfig";

function AuthForm(props, ref) {
  const { role } = props;
  const {name, menus} = role
  const [checkedKeys, setCheckedKeys] = useState(menus)
  useImperativeHandle(ref, () => ({
    checkedKeys
  }));

  const treeData = [
    {
      title: "平台权限",
      key: "all",
      children: menuList,
    },
  ];
  const onCheck = (checkedKeys) => {
    setCheckedKeys(checkedKeys)
  };
  return (
    <>
      <Form initialValues={{ roleName: name }}>
        <Form.Item label="角色名称" name="roleName">
          <Input disabled />
        </Form.Item>
      </Form>
      <Tree
        checkable
        treeData={treeData}
        defaultExpandAll={true}
        checkedKeys={checkedKeys}
        onCheck={onCheck}
      />
    </>
  );
}

export default forwardRef(AuthForm)