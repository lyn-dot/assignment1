import React, { useState, useEffect } from "react";
import { Button, Table, Space, Input } from "antd";
import { formatDistanceToNow } from "date-fns";
import { debounce } from "lodash";
import axios from "axios";
import AppLayout from "../../components/layout";

// dashboard/index.js 里的flex布局； 及 上面三个图标分别放入两个容器；
// 'Add' button, alert form;
// search bar;

export default function studentList() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
  });

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

  const columns = [
    {
      title: "No.",
      dataIndex: "number",
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
    },
  ];

  return (
    (<Button>Add</Button>),
    (
      // 添加pagination;
      <AppLayout>
        <Table columns={columns} dataSource={data} />
      </AppLayout>
    )
  );
}
