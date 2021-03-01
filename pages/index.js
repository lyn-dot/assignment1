import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button, Checkbox, Radio, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import 'antd/dist/antd.css';
import axios from 'axios';
import {AES} from 'crypto-js';

function onChange(e) {
console.log(`radio checked:${e.target.value}`);
}

const NormalLoginForm = () => {
const onFinish = (values) => {
  console.log('Received values of form: ', values);
};

// updateUsername = (username) => {
//   this.setState({username}, this.validateUsername)
// }


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
    <h1 style={{width: "30%", textAlign: "center", margin: "20px"}}>Course Management Assistant</h1>
    <Radio.Group onChange={onChange} defaultValue="a">
      <Radio.Button value="a">Student</Radio.Button>
      <Radio.Button value="b">Teacher</Radio.Button>
      <Radio.Button value="c">Manager</Radio.Button>
    </Radio.Group>

    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={values =>{
        console.log (values); 
        axios
        .post('https://cms.chtoma.com/api/login',{
          ...values, 
          password: AES.encrypt(values.password, 'cms').toString(),
        }) 
        .then((res) =>{
          localStorage.setItem('cms', res.data.data);
        })
        .catch((error) => {
          message.error('Please check your email or password');
        })
      }}
      initialValues = {{
        role: "student",
        email: "",
        password: "",
      }}
      style = {{width: "30%"}}
    >

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
        <Input prefix={<UserOutlined 
        className="site-form-item-icon" />} 
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
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign in
        </Button>
        <br />
        No account? <a href="">Sign up</a>
      </Form.Item>
    </Form>
  </div>
);
};

// const {  Radio  } = antd;


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