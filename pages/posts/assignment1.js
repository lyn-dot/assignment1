

export default function CMA() {
    return (
        <h1>Course Management Assistant</h1>

    )
}

function onChange(e) {
  console.log(`radio checked:${e.target.value}`);
}

const NormalLoginForm = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input email',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input password',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign in
        </Button>
        No account? <a href="">Sign up</a>
      </Form.Item>
    </Form>
  );
};

// const {  Radio  } = antd;
let mountNode = document.getElementById('root');


ReactDOM.render(
(<>  
<NormalLoginForm />

    <Radio.Group onChange={onChange} defaultValue="a">
      <Radio.Button value="a">Student</Radio.Button>
      <Radio.Button value="b">Teacher</Radio.Button>
      <Radio.Button value="c">Manager</Radio.Button>
    </Radio.Group>
  </>),
  mountNode
);
