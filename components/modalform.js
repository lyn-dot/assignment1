import { Select, Modal, Form, Input } from "antd";
import React, { useState } from "react";

export default function ModalForm({
  visible,
  setVisible,
  value = {},
  onCreate,
}) {
//   console.log({ visible, setVisible });
  const [isEdit, setIsEdit] = useState(null);
  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  const [form] = Form.useForm();
  const { Option } = Select;

  return (
    <Modal
      title={isEdit ? "Edit Student" : "Add Student"}
      visible={visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={handleCancel}
    >
      <Form form={form} name="student_form" initialValues={value}>
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
              type: "email",
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
          <Select
            placeholder="Select an area"
            onChange={(area) => {}}
            allowClear
          >
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
    </Modal>
  );
}
