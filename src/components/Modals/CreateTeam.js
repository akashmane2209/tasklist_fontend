import React from "react";
import { connect } from "react-redux";
import { Modal, Form, Input, Select, Row, Col, DatePicker } from "antd";

const { RangePicker } = DatePicker;

const { Option } = Select;

const CreateProjectForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    state = {
      team: "abc"
    };
    handleTeamChange = value => {
      this.props.handleTeamChange(value);
    };

    handleDateChange = (date, dateString) => {
      this.props.handleDateChange(dateString);
    };
    render() {
      const { visible, onCancel, onCreate, form, confirmLoading } = this.props;
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
            <Row>
              <Col>
                <Form.Item label="Title">
                  {getFieldDecorator("title", {
                    rules: [
                      {
                        required: true,
                        message: "Please input the title of the project!"
                      }
                    ]
                  })(<Input style={{ width: "100%" }} />)}
                </Form.Item>
                <Form.Item label="Members">
                  {getFieldDecorator("membersList", {
                    rules: [
                      {
                        required: true,
                        message: "Please select atleast one member"
                      }
                    ]
                  })(
                    <Select
                      style={{ width: "100%" }}
                      mode="multiple"
                      placeholder="Select Members"
                    >
                      {this.props.users.map(user => {
                        if (!user.teamId) {
                          return (
                            <Option key={user._id} value={user._id}>
                              {user.firstName + " " + user.lastName}
                            </Option>
                          );
                        }
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      );
    }
  }
);

const mapStateToProps = ({ user }) => ({
  users: user.user
});

export default connect(
  mapStateToProps,
  null
)(CreateProjectForm);
