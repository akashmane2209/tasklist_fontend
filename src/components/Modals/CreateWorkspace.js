import React from "react";
import {  Modal, Form, Input,  } from "antd";

const CreateWorkspaceForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form,confirmLoading } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new workspace"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
        >
          <Form layout="vertical">
            <Form.Item label="Title">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Please input the title of workspace!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

export default CreateWorkspaceForm;
