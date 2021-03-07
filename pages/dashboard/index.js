import Link from 'next/link';
import React, { useState } from 'react';
import { Badge, Image, Layout, Menu, Breadcrumb, Popover } from 'antd';
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
} from '@ant-design/icons';

  


const { Header, Footer, Content, Sider } = Layout; 
const { SubMenu } = Menu;

export default function Page() {
  const [collapsed, setCollapsed] = useState(false);
  // state = {
  //   collapsed: false,
  // };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  }

  // toggleCollapsed = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed,
  //   });
  // };
  
  const onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  // const toggle = () => {
  //   this.setState({
  //     collapsed: !this.state.collapsed,
  //   });
  // };



  const onClick = () => {
    axios
      .post('https://cms.chtoma.com/api/logout') 
      .then(() =>{
        localStorage.removeItem('cms', res.data.data);
      })
  }


  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div> </div>
          <div className="logo" /> 
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{height: 'auto', justifyContent: 'space-between'}} >

            <Menu.Item key='1'>
             <Image
                width={50}
                height={45}
                src={`/`}// 1. to input logo img url; 
                
              />
            </Menu.Item>
            <Menu.Item key="2" icon={<PieChartOutlined />}>
              Overview
            </Menu.Item>

            <SubMenu key="sub1" icon={<UserOutlined />} title="Student">
              <Menu.Item key="3">Student List</Menu.Item>
            </SubMenu>

            <SubMenu key="sub2" icon={<DeploymentUnitOutlined />} title="Teacher">
              <Menu.Item key="4">Teacher List</Menu.Item>
            </SubMenu>

            <SubMenu key="sub3" icon={<ReadOutlined />} title="Course">
              <Menu.Item key="5">All Courses</Menu.Item>
              <Menu.Item key="6">Add Course</Menu.Item>
              <Menu.Item key="7">Edit Course</Menu.Item>
            </SubMenu>

            <Menu.Item key="8" icon={<MessageOutlined />}>
              Message
            </Menu.Item>
          </Menu>

        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >
            <div className="CMS logo" />

            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              <Menu.Item 
                key="1" 
                icon={collapsed ? <MenuFoldOutlined 
                    // 2. 实现toggle成MenuUnfoldOutlined 图标 + menufold时的expand submenu items？
                  /> : <MenuUnfoldOutlined />}
                  
                onClick={toggleCollapsed}
                  > 
              </Menu.Item>

              <Menu.Item 
                key="2" 
                icon={<BellOutlined 
                />}>
                  <Badge 
                   size='small' 
                   count={71} 
                   offset={[10,10]}
                   style={{
                     marginTop:'-25px',
                     right: '13px'}}>
                  </Badge>
              </Menu.Item>

              <Menu.Item
                key="3" 
                icon={
                  <Popover 
                    content={
                    <div>
                      <Link href='/login' onClick={onClick}>Logout</Link>
                    </div>}
                    trigger="hover" 
                  ><UserOutlined />
                  </Popover>}
              >
              </Menu.Item>
            </Menu>
          </Header>

          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
              <Breadcrumb.Item>Overview</Breadcrumb.Item>
            </Breadcrumb>
            <div> TODO</div>
          </Content>
          
          <Footer style={{ textAlign: 'center' }}>Copyright ©2018 CMS</Footer>
        </Layout>

      </Layout>
  );
};



//3. component Header style
