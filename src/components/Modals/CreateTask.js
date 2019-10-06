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

    componentDidMount() {}

    handleUserChange = value => {
      this.props.handleUserChange(value);
    };

    handlePriorityChange = value => {
      this.props.handlePriorityChange(value);
    };

    handleDateChange = (date, dateString) => {
      this.props.handleDateChange(dateString);
    };
    render() {
      let selectedTeam = [undefined];
      if (this.props.projectId) {
        const selectedProject = this.props.projects.filter(project => {
          return project._id === this.props.projectId;
        });
        selectedTeam = this.props.teams.filter(team => {
          return team._id === selectedProject[0].teamId._id;
        });
      }

      const { visible, onCancel, onCreate, form, confirmLoading } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new task"
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
                        message: "Please input the title of the task!"
                      }
                    ]
                  })(<Input style={{ width: "100%" }} />)}
                </Form.Item>
                <Form.Item label="Assigned To">
                  {getFieldDecorator("assignedTo", {
                    rules: [
                      {
                        required: true,
                        message: "Please select a user"
                      }
                    ]
                  })(
                    <Select
                      style={{ width: "100%" }}
                      onChange={this.handleUserChange}
                    >
                      {selectedTeam[0]
                        ? selectedTeam[0].membersList.map(member => {
                            return (
                              <Option key={member._id} value={member._id}>
                                {member.firstName + " " + member.lastName}
                              </Option>
                            );
                          })
                        : null}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="Priority">
                  <Select
                    style={{ width: "100%" }}
                    onChange={this.handlePriorityChange}
                  >
                    <Option key="0" value="High">
                      High
                    </Option>
                    <Option key="1" value="Medium">
                      Medium
                    </Option>
                    <Option key="2" value="Low">
                      Low
                    </Option>
                  </Select>
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

const mapStateToProps = ({ team, project }) => ({
  teams: team.team,
  projects: project.project
});

export default connect(
  mapStateToProps,
  null
)(CreateProjectForm);
