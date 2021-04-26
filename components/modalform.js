import { Select, Form, Input } from "antd";

export default function ModalForm() {
  return (
    <Form
    form={form}
    name="student_form"
    initialValues={{
      name: "name",
      country: "area",
      email: "email",
    }}
  >
    <Form.Item
      label="Name"
      name="name"
      placeholder="student name"
      rules={[
        {
          required: true,
          message: "name is required",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="email"
      label="Email"
      placeholder="Please input email"
      rules={[
        {
          required: true,
          message: "email is required",
        },
        {
            message: "invalid email",
          },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="country"
      label="Area"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Select placeholder="Select an area" onChange={(area) => {}} allowClear>
        <Option value="China">China</Option>
        <Option value="NZ">New Zealand</Option>
        <Option value="Canada">Canada</Option>
        <Option value="oz">Australia</Option>
      </Select>
    </Form.Item>
    <Form.Item
      name="type"
      label="Student Type"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Select
        placeholder="Select a type"
        onChange={(student) => {}}
        allowClear
      >
        <Option value="ts">Tester</Option>
        <Option value="dv">Developer</Option>
      </Select>
    </Form.Item>
  </Form>
  )
}
