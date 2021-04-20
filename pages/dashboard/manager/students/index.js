import React, { useState, useEffect, dispatch } from "react";
import { Form, Button, Table, Space, Input, InputNumber, Popconfirm, Pagination, Typography } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";
import { debounce } from "lodash";
import axios from "axios";
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

  // ’edit‘ function under 'Action': 
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const EditableTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
      form.setFieldsValue({
        name: '',
        age: '',
        address: '',
        ...record,
      });
      setEditingKey(record.key);
    };
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

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
      //test country filter?
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
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  }); 

    return (
      <AppLayout>
        <Space direction="vertical">
          <Button
            type="primary"
            prefix={<PlusOutlined />}
            // on click 'Add' button, alert form-增加、编辑学生功能;

            onClick={() => {
              <Form>
                <fieldset>
                  <Input
                    title="Name"
                    type="text"
                    placeholder="Please input name"
                  />
                  <Input
                    title="Email"
                    type="email"
                    placeholder="Please input email"
                  />
                  <Input title="Area" type="text" placeholder="" />
                  <Input title="Student Type" type="text" placeholder="" />
                </fieldset>
              </Form>;
            }}
          >
            Add
        </Button>
          <Input
            placeholder="search by name"
            onSearch={(value) => {
              setQuery(value);
            }}
            onChange={(event) => updateQuery(event.target.value)}
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
          onChange={(paginator, filters, sorter) => {
            console.log(paginator);
            return setPagination({
              page: paginator.current,
              limit: paginator.pageSize,
            });
          }}
        />
      </AppLayout>
    );
  }
