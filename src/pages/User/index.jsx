import React, { useEffect, useState, useRef } from "react";
import { Card, Table, Button, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { PAGE_SIZE } from "../../utils/constant";
import {
  reqDeleteUser,
  reqGetUserList,
  reqAddUser,
  reqUpdateUser,
} from "../../api";
import dayjs from "dayjs";
import AddUserForm from "./AddUserForm";
import UpdateUserForm from "./UpdateUserForm";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import { useNavigate } from "react-router-dom";

export default function User(props) {
  const [users, setUsers] = useState([]);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const AddUserFormRef = useRef(null);
  const UpdateUserFormRef = useRef(null);
  const roleIdNameMapRef = useRef(new Map());
  const rolesRef = useRef([]);
  // 存储将要修改的角色对象
  const userRef = useRef(null);
  let navigate = useNavigate();
  const title = (
    <Button type="primary" onClick={() => setIsShowAdd(true)}>
      添加用户
    </Button>
  );
  const columns = [
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "电话",
      dataIndex: "phone",
    },
    {
      title: "注册时间",
      dataIndex: "create_time",
      render: (create_time) => dayjs(create_time).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "所属角色",
      dataIndex: "role_id",
      render: (role_id) => roleIdNameMapRef.current.get(role_id),
    },
    {
      title: "操作",
      render: (user) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setIsShowUpdate(true);
              userRef.current = user;
            }}
          >
            修改
          </Button>
          <Button type="link" onClick={() => showConfirm(user)}>
            删除
          </Button>
        </>
      ),
    },
  ];
  const getUserList = async () => {
    const res = await reqGetUserList();
    return res.data;
  };
  useEffect(() => {
    // 解构出users, roles属性
    getUserList()
      .then(({ users, roles }) => {
        rolesRef.current = roles;
        const map = roleIdNameMapRef.current;
        // 根据roles数组生成角色id和name的映射
        roles.forEach((role) => {
          map.set(role._id, role.name);
        });
        setUsers(users);
      })
      .catch((err) => err);
  }, []);
  function showConfirm(user) {
    Modal.confirm({
      title: `确认删除 ${user.username} 用户吗?`,
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        const res = await reqDeleteUser(user._id);
        if (res.status === 0) {
          message.success("删除成功!");
          getUserList()
            .then(({ users }) => {
              setUsers(users);
            })
            .catch((err) => err);
        }
      },
      onCancel() {},
    });
  }
  function addUser() {
    const form = AddUserFormRef.current;
    form
      .validateFields()
      .then(async (userInfo) => {
        const res = await reqAddUser(userInfo);
        if (res.status === 0) {
          message.success("添加成功!");
          const newUser = res.data;
          // 根据返回的数据更新状态(更优),也可发请求更新状态
          setUsers((prevUsers) => [...prevUsers, newUser]);
          setIsShowAdd(false);
        } else if (res.status === 1) {
          message.info(res.msg);
        }
      })
      .catch((err) => err);
  }
  function updateUser() {
    const form = UpdateUserFormRef.current;
    form
      .validateFields()
      .then(async (userInfo) => {
        const prevRoleId = userRef.current.role_id,
          newRoleId = userInfo.role_id;
        userInfo._id = userRef.current._id;
        const res = await reqUpdateUser(userInfo);
        if (res.status === 0) {
          setIsShowUpdate(false);
          // 如果更新的是当前用户并且修改了当前用户的角色，则重新登录
          if (
            memoryUtils.user._id === userRef.current._id &&
            newRoleId !== prevRoleId
          ) {
            memoryUtils.user = {};
            storageUtils.removeUser();
            navigate("/login", { replace: true });
            message.info("权限更新,请重新登录");
          } else {
            message.success("更新成功!");
            getUserList()
              .then(({ users }) => {
                setUsers(users);
              })
              .catch((err) => err);
          }
        } else if (res.status === 1) {
          message.info(res.msg);
        }
      })
      .catch((err) => err);
  }
  return (
    <>
      <Card title={title}>
        <Table
          dataSource={users}
          columns={columns}
          rowKey="_id"
          bordered
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />
      </Card>

      <Modal
        title="添加用户"
        visible={isShowAdd}
        onOk={addUser}
        onCancel={() => setIsShowAdd(false)}
        destroyOnClose={true}
      >
        <AddUserForm ref={AddUserFormRef} roles={rolesRef.current} />
      </Modal>

      <Modal
        title="修改用户"
        visible={isShowUpdate}
        onOk={updateUser}
        onCancel={() => setIsShowUpdate(false)}
        destroyOnClose={true}
      >
        <UpdateUserForm
          ref={UpdateUserFormRef}
          roles={rolesRef.current}
          user={userRef.current}
        />
      </Modal>
    </>
  );
}
