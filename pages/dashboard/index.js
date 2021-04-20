import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Badge, Image, Layout, Menu, Breadcrumb, Popover } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  MessageOutlined,
  ReadOutlined,
  UserOutlined,
  DeploymentUnitOutlined,
  BellOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import axios from "axios";


const { Header, Footer, Content, Sider } = Layout;
const { SubMenu } = Menu;

export default function Page() {
  console.log("rendered");
  const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();

  const onClick = () => {};

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          style={{
            flex: "auto",
            height: "auto",
            justifyContent: "space-between",
          }}
        >
          <Menu.Item key="1">
            <div className="logo"></div>
          </Menu.Item>
          <Menu.Item
            key="2"
            onClick={() => {
              router.push("/dashboard");
            }}
            icon={<PieChartOutlined />}
          >
            Overview
          </Menu.Item>

          <SubMenu key="sub1" icon={<UserOutlined />} title="Student">
            <Menu.Item
              key="3"
              onClick={() => {
                axios.get("https://cms.chtoma.com/api/students").then(() => {
                  localStorage.getItem("cms", res.data.data);
                });
                router.push("dashboard/manager/students");
              }}
            >
              Student List
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" icon={<DeploymentUnitOutlined />} title="Teacher">
            <Menu.Item
              key="4"
              onClick={() => {
                router.push("dashboard/manager/teachers");
              }}
            >
              Teacher List
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub3" icon={<ReadOutlined />} title="Course">
            <Menu.Item
              key="5"
              onClick={() => {
                router.push("/courses");
              }}
            >
              All Courses
            </Menu.Item>
            <Menu.Item
              key="6"
              onClick={() => {
                // 'add course' form
              }}
            >
              Add Course
            </Menu.Item>
            <Menu.Item key="7">Edit Course</Menu.Item>
          </SubMenu>

          <Menu.Item key="8" icon={<MessageOutlined />}>
            Message
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="logo" />

          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item
              key="1"
              icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            ></Menu.Item>

            <Menu.Item key="2" icon={<BellOutlined />}>
              <Badge
                size="small"
                count={71}
                offset={[10, 10]}
                style={{
                  marginTop: "-25px",
                  right: "13px",
                }}
              ></Badge>
            </Menu.Item>

            <Menu.Item
              key="3"
              icon={
                <Popover
                  content={
                    <LogoutOutlined
                      onClick={() => {
                        axios
                          .post("https://cms.chtoma.com/api/logout")
                          .then(() => {
                            localStorage.removeItem("cms", res.data.data);
                          });
                        router.push("/login");
                      }}
                      size="small"
                    />
                  }
                  trigger="hover"
                >
                  <UserOutlined />
                </Popover>
              }
            ></Menu.Item>
          </Menu>
        </Header>

        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
          <div> TODO</div>
        </Content>

        <Footer style={{ textAlign: "center" }}>Copyright ©2018 CMS</Footer>
      </Layout>
    </Layout>
  );
}
