import React, { useState, useEffect, useRef } from "react";
import { Card, Button, Table, Modal, message } from "antd";
import { PAGE_SIZE } from "../../utils/constant";
import { reqGetRoleList, reqAddRole, reqUpdateRole } from "../../api";
import AddRoleForm from "./AddRoleForm";
import AuthForm from "./AuthForm";
import memoryUtils from "../../utils/memoryUtils";
import dayjs from "dayjs"

export default function Role(props) {
  const [roleList, setRoleList] = useState([]);
  const [selectedRole, setSelectedRole] = useState({});
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowAuth, setIsShowAuth] = useState(false);
  const addFormRef = useRef(null);
  const authFormRef = useRef(null);

  useEffect(() => {
    getRoleList()
      .then((roleList) => {
        setRoleList(roleList);
      })
      .catch((err) => err);
  }, []);
  const title = (
    <>
      <Button type="primary" onClick={() => setIsShowAdd(true)}>
        创建角色
      </Button>
      &nbsp;&nbsp;
      <Button
        type="primary"
        disabled={!selectedRole._id}
        onClick={() => setIsShowAuth(true)}
      >
        设置角色权限
      </Button>
    </>
  );

  const columns = [
    {
      title: "角色名称",
      dataIndex: "name",
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      render: (create_time) => dayjs(create_time).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      title: "授权时间",
      dataIndex: "auth_time",
      render: (auth_time) => dayjs(auth_time).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      title: "授权人",
      dataIndex: "auth_name",
    },
  ];
  const onRow = (role) => {
    return {
      onClick: () => {
        setSelectedRole(role);
      }, // 点击行
    };
  };
  async function getRoleList() {
    const res = await reqGetRoleList();
    return res.data;
  }
  const addRole = () => {
    // 获取添加角色表单实例
    const addForm = addFormRef.current;
    addForm
      .validateFields()
      .then(async (values) => {
        const { roleName } = values;
        const res = await reqAddRole(roleName);
        if (res.status === 0) {
          message.success("添加角色成功！");
          setIsShowAdd(false);
          // 这里可以再次请求获取角色列表数据以重新渲染角色列表，但是现在换一种方式
          const newRole = res.data;
          setRoleList((prevRoleList) => [...prevRoleList, newRole]);
        } else {
          message.error("添加角色失败！");
        }
      })
      .catch((err) => console.log(err));
  };
  const updateRole = async () => {
    const { _id } = selectedRole;
    const { checkedKeys: menus } = authFormRef.current;
    const auth_time = Date.now();
    const auth_name = memoryUtils.user.username;
    const updatedRole = { _id, menus, auth_time, auth_name };
    const res = await reqUpdateRole(updatedRole);
    if (res.status === 0) {
      message.success("角色授权成功！");
      setIsShowAuth(false);
      // 更新选中的角色
      setSelectedRole(prevSelectedRole => ({...prevSelectedRole, ...updatedRole}))
      // 获取最新的角色列表数据
      const roleList = await getRoleList()
      setRoleList(roleList)  
    } else {
      message.error("角色授权失败！");
    }
  };
  return (
    <>
      <Card title={title}>
        <Table
          rowKey="_id"
          dataSource={roleList}
          columns={columns}
          bordered
          pagination={{ defaultPageSize: PAGE_SIZE }}
          rowSelection={{
            type: "radio",
            selectedRowKeys: [selectedRole._id],
            onChange: (selectedRowKeys, selectedRows) =>
              setSelectedRole(selectedRows[0]),
          }}
          onRow={onRow}
        />
      </Card>

      <Modal
        title="添加角色"
        visible={isShowAdd}
        onOk={addRole}
        onCancel={() => setIsShowAdd(false)}
        destroyOnClose={true}
      >
        <AddRoleForm ref={addFormRef} />
      </Modal>

      <Modal
        title="设置角色权限"
        visible={isShowAuth}
        onOk={updateRole}
        onCancel={() => setIsShowAuth(false)}
        destroyOnClose={true}
      >
        <AuthForm role={selectedRole} ref={authFormRef} />
      </Modal>
    </>
  );
}
