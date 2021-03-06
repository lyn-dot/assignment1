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
        <Sider trigger={null} collapsible onCollapse={onCollapse}>
          <div> </div>
          <div className="logo" /> 
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{height: 'auto'}} >

            <Menu.Item key='1'>
             <Image
                width={50}
                height={45}
                src={`/`}// 3. to input logo img url; 
                
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
                icon={<MenuFoldOutlined 
                    style={{ 
                      fontSize: '23px',
                      display: 'inline', 
                      flexDirection: 'row',
                      position: '0px 16px',
                      alignItems: 'right',
                      padding: '20px 100px',
                      cursor: 'grab',

                    }}
                    // 4. 实现toggle成MenuUnfoldOutlined 图标 + menufold时的expand submenu items？
                    // className="trigger"
                    // type={{onCollapse} ? 'menu-unfold' : 'menu-fold'}
                    // onClick={toggle}
                  />}>
                        
              </Menu.Item>

              <Menu.Item 
                key="2" 
                icon={<BellOutlined 
                style={{ 
                  fontSize: '23px', 
                }}
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
                      <Link href='http://localhost:3000/login' onClick={onClick}>Logout</Link>
                    </div>}
                    trigger="hover" 
                  ><UserOutlined 
                    style={{ 
                      fontSize: '23px',
                      
                    }}/>
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



//5. component Header style
