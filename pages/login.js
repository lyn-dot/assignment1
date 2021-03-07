import React from 'react';
import { Form, Input, Button, Checkbox, Radio, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import axios from 'axios';
import {AES} from 'crypto-js';



export default function loginPage() {
  const onFinish = (values) => {
      axios
      .post('https://cms.chtoma.com/api/login',{
        ...values, 
        password: AES.encrypt(values.password, 'cms').toString(),
        // encrypt password;
      }) 
      .then((res) =>{
        localStorage.setItem('cms', res.data.data);
      })
      .catch((error) => {
        message.error('Please check your email or password');
        // TODO: direct to dashboard 
      })
    }

  return (
    <div
      style={{ 
        display: "flex",
        justifyContent: "center", 
        alignItems: "center", 
        flexDirection: "column",
        marginTop: 80,
        maxHeight: "100%",
      }}
    >  

      <h1 
        style={{width: "35%", textAlign: "center", margin: "10px"}}>
        Course Management Assistant
      </h1>

      <Form
        name="normal_login"
        initialValues={{
          remember: true,
          role: "student",
          email: "",
          password: "",
        }} 

        onFinish={onFinish}

        style = {{width: "35%"}}
      >

        <Form.Item
          name="role"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Radio.Group>
            <Radio.Button value="student">Student</Radio.Button>
            <Radio.Button value="teacher">Teacher</Radio.Button>
            <Radio.Button value="manager">Manager</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "email is required" ,
            },
            {
              message: "invalid email",
            }
          ]}
        >
          <Input 
            prefix={<UserOutlined  />} 
            type="email"
            placeholder="Please input email" 
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "password is required",
            },
            {
              max:16,
              min:4,
              message: "password must be between 4 and 16 letters",
            }
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Please input password"
          />
        </Form.Item>

        <Form.Item 
          name="remember" 
          valuePropName="checked" 
          noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
          

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            style={{width:"100%", margin:"25px auto"}}
          >
            <Link href='/dashboard'>Sign in</Link>
          </Button>
          <div>
            <span>No account? </span>
          </div>
          <Link href="">Sign up</Link>
        </Form.Item>

      </Form>
    </div>
  );
};





