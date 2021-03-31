import React, { useState, useEffect } from "react";
import { Form, Button, Table, Space, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";
import { debounce } from "lodash";
import axios from "axios";
import AppLayout from "../../components/layout";

// dashboard/index.js 里的flex布局； 及 上面三个图标分别放入两个容器；

export default function studentList() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
  });
  const [query, setQuery] = useState();
  const updateQuery = debounce(setQuery, 1000);

  // headers (network->request headers服务器跟客户端沟通时发出的公共信息，会被编码)-> 看课件回放edward那一段；

  //render?

  useEffect(() => {
    axios
      .get("https://cms.chtoma.com/api/students", {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("cms")).token,
        },
        params: pagination,
      })
      .then((res) => {
        const data = ("cms", JSON.stringify(res.data.data));

        setData(data.data.students);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const numData = [];

  const Search = Input;

  // 仍然无法显示学生数据；
  const columns = [
    {
      title: "No.",
      dataIndex: "number",
      // 显示数据列号
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Area",
      dataIndex: "country",
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
      onFilter: (value, record) => record.area.indexOf(value) === 0,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Selected Curriculum",
      dataIndex: "courses",
      render: (courses) => {
        courses?.map(course.name).join(",");
      },
    },
    {
      title: "Student Type",
      dataIndex: "type",
      filters: [
        {
          text: "Developer",
          value: "Developer",
        },
        {
          text: "Tester",
          value: "Tester",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.studentType.indexOf(value) === 0,
      render: (type, record, index) => <div>{type}</div>,
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
      // render + 编辑和删除功能；
    },
  ];

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
        <Search
          placeholder="search by name"
          onSearch={(value) => setQuery(value)}
          onChange={(event) => updateQuery(event.target.value)}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          ...pagination,
        }}
        // 点击不同页面，跳转页面；
        //onChange = {(pagination) => {
        // setPagination((prevState) => {
        //   ...prevState,
        //   page: pagination.current,
        //   limit: pagination.pageSize,
        // });}}
      />
    </AppLayout>
  );
}
