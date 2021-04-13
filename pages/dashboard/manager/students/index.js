import React, { useState, useEffect } from "react";
import { Form, Button, Table, Space, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";
import { debounce } from "lodash";
import axios from "axios";
import AppLayout from "../../../../components/layout";

// dashboard/index.js 里的flex布局； 及 上面三个图标分别放入两个容器；

export default function studentList() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
  });
  const [total, setTotal] = useState();
  const [query, setQuery] = useState("");
  const updateQuery = debounce(setQuery, 1000);

  // headers (network->request headers服务器跟客户端沟通时发出的公共信息，会被编码)-> 看课件0330回放edward那一段；

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
        //  下面这行老师没明白？没问题啊
        console.log(res.data.data);
        const data = JSON.parse(JSON.stringify(res.data.data));
        setData(data.students);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pagination, query]);

  const numData = [];

  const Search = Input;

  // 显示序列号用这个方法没成功：
  //const p = [];
  // for (let i = 0; i < 20; i++) {
  //   data.push({
  //     key: i,
  //     number: "${i}",
  //   });
  // }
  const columns = [
    {
      title: "No.",
      dataIndex: "number",
      key: "number",
      render: (number, index) => {
        console.log(index);
        // (page - 1) * 10 + number;  ？报错，page为什么没define?
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
          value: "Developer",
        },
        {
          text: "Tester",
          value: "Tester",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.studentType.indexOf(value) === 0,
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
      // 编辑和删除功能；
      render: (text, record) => {
        return (
          <button onClick={() => this.handleDelete(record.id)}>delete</button>
        );
      },
    },
  ];

  return (
    <AppLayout>
      <Space direction="vertical">
        <Button
          type="primary"
          prefix={<PlusOutlined />}
          // on click 'Add' button, alert form-增加、编辑学生功能;
          //删除学生功能及接口
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
          total,
        }}
        //这里还是没理解!-.-!
        // onChange = {pagination => {
        //   setPaginator((prevState) => {
        //     ...prevState,
        //     page: pagination.current,
        //     limit: pagination.pageSize,
        //     setQuery('page=${paginator.page}&limit=${paginator.limit}'),
        //   {"}"})
        // }}
      />
    </AppLayout>
  );
}
