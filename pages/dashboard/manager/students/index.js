import React, { useState, useEffect, dispatch } from "react";
import { Form, Button, Table, Space, Input, Modal, Dropdown, InputNumber, Popconfirm, Pagination, Typography } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";
import { debounce } from "lodash";
import axios from "axios";
import TextLink from 'antd/lib/typography/Link';
import AppLayout from "../../../../components/layout";

// dashboard/index.js 里的flex布局； 及 上面三个图标分别放入两个容器；

export default function studentList() {
  const [data, setData] = useState([]);
  const [Pagination, setPagination] = useState({
    page: 1,
    limit: 20,
  });
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");
  const updateQuery = debounce(setQuery, 1000);



  // 5. response success ---->  添加成功的信息
  //           fail -------->  提示用户失败
  const [visible, setVisible] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = (values) => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
    axios
      .post("https://cms.chtoma.com/api/students", {
        ...values,
        // password: AES.encrypt(values.password, "cms").toString(),
      })
      .then((res) => {
        localStorage.setItem("cms", JSON.stringify(res.data.data))
        window.alert('success')
      })
      .catch((e) => {
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };



  // EDIT
  // 1.   button link --->  add
  // 2.  click --> modal 弹出来
  // 3.  form , 把 form item全设置好 （校验规则）；设置表单初始值
  // 4. 确认之后，发送请求， PUT 方法，接口见文档
  //      取消 ，关闭modal
  // 5. response success ---->  添加成功的信息，修改对应的数据
  //           fail -------->  提示用户失败

  // DELETE
  // 1.  button link -----> delete
  // 2.  删除之前 popup提示用户
  // 3.  确定删除----> send request  Cancel -----> close
  // 4. response success ---> 删除对应的数据
  // fail ------> 提示用户失败






  // headers (network->request headers服务器跟客户端沟通时发出的公共信息，会被编码)-> 看课件0330回放edward那一段；

  useEffect(() => {
    axios
      .get("https://cms.chtoma.com/api/students", {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("cms")).token,
        },
        params: Pagination,
      })
      .then((res) => {
        const data = res.data.data;
        setData(data.students);
        setTotal(data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Pagination, query]);



  const columns = [
    {
      title: "No.",
      dataIndex: "number",
      render: (text, record, index) => {
        return index + 1;
      },
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Area",
      dataIndex: "country",
      key: "country",
      filters: [
        {
          text: "China",
          value: "China",
        },
        {
          text: "New Zealand",
          value: "New Zealand",
        },
        {
          text: "Canada",
          value: "Canada",
        },
        {
          text: "Australia",
          value: "Australia",
        },
      ],
      // area filter 
      onFilter: (value, record) => record?.country.indexOf(value) === 0,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Selected Curriculum",
      dataIndex: "courses",
      key: "courses",
      render: (courses) => courses?.map((course) => course.name).join(","),
    },
    {
      title: "Student Type",
      dataIndex: "type",
      key: "type",
      filters: [
        {
          text: "Developer",
          value: "developer",
        },
        {
          text: "Tester",
          value: "tester",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => {
        return record.type.name === value;
      },
      render: (t) => t?.name,
    },
    {
      title: "Join Time",
      dataIndex: "createdAt",
      render: (time) => (
        <div>{formatDistanceToNow(new Date(time), { addSuffix: "true" })}</div>
      ),
    },
    {
      title: "Action",
      dataIndex: "updatedAt",
      render: (_, record) => {
        <Space size="middle">
          <TextLink
            onClick={() => {
              setEditStudent(record);
              setVisible(true);
            }}
          >
            Edit
          </TextLink>

          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => {
              apiServices.deleteStudents(record.id).then((res) => {
                if (res.data) {
                  const index = data.findIndex((item) => item.id === record.id);
                  const updatedData = [...data];
                  updatedData.splice(index, 1);
                  setData(updatedData);
                  setTotal(total - 1);
                }
              });
            }}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      },
    }
    ];


  return (
    <AppLayout>
      <Space
        direction="horizontal"
        style={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          type="primary"
          prefix={<PlusOutlined />}
          onClick={() => {
            setVisible(true);
          }}
        >
          Add
        </Button>
        <Modal
          title="Add Student"
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}>
          <Form>
            <Form.Item
              label="Name"
              type="text"
              placeholder="student name"
              rules={[
                {
                  required: true,
                  message: 'name is required',
                },
              ]}
            > <Input type="textarea" /></Form.Item>
            <Form.Item
              label="Email"
              placeholder="Please input email"
              rules={[
                {
                  required: true,
                  message: 'email is required',
                },
              ]}
            > <Input type="textarea" /></Form.Item>
            <Form.Item
              title='Area'
              lable="Area"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input type='text' />
              <span class="dropdown">
                <ul class="dropdown-menu" >
                  <li>China</li>
                  <li>New Zealand</li>
                  <li>Canada</li>
                  <li>Australia</li>
                </ul>
              </span>
            </Form.Item>
            <Form.Item
              lable="Student Type"
              rules={[
                {
                  required: true,
                },
              ]} >
              <Input type='text' />
            </Form.Item>
          </Form>
        </Modal>
        <Input
          placeholder="search by name"
          onSearch={(value) => {
            setQuery(value);
          }}
          onChange={(event) => updateQuery(event.target.value)}
          style={{ display: 'flex' }}
          suffix={
            <SearchOutlined
              style={{
                fontSize: 16,
                color: "#1890ff",
              }}
            />
          }
        />
      </Space>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: Pagination.limit,
          current: Pagination.page,
          total,
        }}
        onChange={(paginator) => {
          setPagination({
            page: paginator.current,
            limit: paginator.pageSize,
          });
        }}
      />
      
     
    </AppLayout>
  );
}
