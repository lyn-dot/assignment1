import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button, Checkbox, Radio, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import 'antd/dist/antd.css';
import axios from 'axios';
import {AES} from 'crypto-js';



const NormalLoginForm = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
};


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
  >  {/* block style  */}

    <h1 
      style={{width: "35%", textAlign: "center", margin: "10px"}}>
      Course Management Assistant
    </h1>

    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
        role: "student",
        email: "",
        password: "",
      }} // initialize values;

      // repetition, how to fix & integrate into the constant onFinish above?
      onFinish={values =>{ 
        console.log (values); 
        axios
        .post('https://cms.chtoma.com/api/login',{
          ...values, 
          // post values to server;
          password: AES.encrypt(values.password, 'cms').toString(),
          // encrypt password;
        }) 
        .then((res) =>{
          localStorage.setItem('cms', res.data.data);
          // store response data;
        })
        .catch((error) => {
          message.error('Please check your email or password');
        })
      }}
      
      style = {{width: "35%"}}
      // form component style; 
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
            message: "'email' is required" ,
          },
          {
            message: "invalid 'email'",
          }
        ]}
      >
        <Input 
        // what is UserOutline used for? * explore prefix; 
        prefix={<UserOutlined className="site-form-item-icon" />} 
        type="email"
        placeholder="Please input email" 
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "'password' is required",
          },
          {
            max:16,
            min:4,
            message: "'password' must be between 4 and 16 letters",
          }
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
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
        className="login-form-button"
        style={{width:"100%", margin:"25px auto"}}
      >
        Sign in
      </Button>
        <br />
        No account? 
      <Link href="">Sign up</Link>
      </Form.Item>
    </Form>
  </div>
);
};


export default NormalLoginForm; 



















// import Head from 'next/head'
// import styles from '../styles/Home.module.css'
// import Link from 'next/link'


// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Read {''}
//           <Link href="/posts/first-post">
//             <a>this page!</a>
//           </Link>
//           {/* Learn <a href="https://nextjs.org">Next.js!</a> */}
//         </h1>
        

//         <p className={styles.description}>
//           Get started by editing{' '}
//           <code className={styles.code}>pages/index.js</code>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h3>Documentation &rarr;</h3>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h3>Learn &rarr;</h3>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/master/examples"
//             className={styles.card}
//           >
//             <h3>Examples &rarr;</h3>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//           >
//             <h3>Deploy &rarr;</h3>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
//         </a>
//       </footer>
//     </div>
//   )
// }

// const Index = () => (
//   <div>
//     <h1>Welcome to my next.js!</h1>
//     <About />
//   </div>
// )

// export default Index; 

// function Welcome (props) {
//   return <h1>Hello, {props.name} </h1>
// };

// const element = <Welcome name="Sarah" />; 
// ReactDom. render(
//   element,
//   document.getElementById('root')
// )