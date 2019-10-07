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
          title="Create a new project"
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
                <Form.Item label="Team">
                  {getFieldDecorator("team", {
                    rules: [
                      {
                        required: true,
                        message: "Please select a team"
                      }
                    ]
                  })(
                    <Select
                      style={{ width: "100%" }}
                      onChange={this.handleTeamChange}
                    >
                      {this.props.teams.map(team => {
                        return (
                          <Option key={team._id} value={team._id}>
                            {team.title}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="Duration">
                  {getFieldDecorator("duration", {
                    rules: [
                      {
                        required: true,
                        message: "Please select a duration"
                      }
                    ]
                  })(
                    <RangePicker
                      style={{ width: "100%" }}
                      onChange={this.handleDateChange}
                    />
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

const mapStateToProps = ({ team }) => ({
  teams: team.team
});

export default connect(
  mapStateToProps,
  null
)(CreateProjectForm);
