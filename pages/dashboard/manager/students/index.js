import React, { useState, useEffect, dispatch } from "react";
import { Form, Button, Table, Space, Input, Pagination } from "antd";
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

  // console.log(handleDelete);
  // const handleDelete = studentId => {
  //   const studentId =
  // };
  // dispatch({
  //   type: "cards /deleteOne",
  //   // payload: id,
  // });
  // this.props.dispatch({
  //   type: "cards/queryList",
  // });

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
        <Input
          placeholder="search by name"
          onSearch={(value) => setQuery(value)}
          onChange={(event) => updateQuery(event.target.value)}
        />
      </Space>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={{
          defaultCurrent: "1",
          total: "290",
        }}
        onChange={(pagination) => {
          setPagination({ page: 1, limit: 20 });
        }}
      />
    </AppLayout>
  );
}
