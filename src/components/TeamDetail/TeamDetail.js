import React, { Component } from "react";
import { connect } from "react-redux";
import { Breadcrumb, Card, Row, Col, Avatar, message, Button } from "antd";
import { getUsersByTeamId } from "../../apis/user";
import { getAllProjectsByTeamId } from "../../apis/project";

import AddMemberForm from "../Modals/AddMemberForm";

import { addUserToTeam } from "../../apis/team";
import { updateTeamAction } from "../../actions/teamActions";

export class TeamDetail extends Component {
  state = {
    users: [],
    projects: [],
    colors: ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"],
    selectedProject: null,
    visible: false,
    confirmLoading: false
  };

  async componentDidMount() {
    if (this.props.auth.role) {
      let response = await getUsersByTeamId(this.props.match.params.id);
      this.setState({ users: response.data.users });
      response = await getAllProjectsByTeamId(this.props.match.params.id);
      this.setState({ projects: response.data.projects });
    } else {
      console.log("cdm team detail");
      let response = await getUsersByTeamId(this.props.auth.teamId._id);
      this.setState({ users: response.data.users });
      response = await getAllProjectsByTeamId(this.props.auth.teamId._id);
      this.setState({ projects: response.data.projects });
      console.log(this.state.projects, "user");
    }
  }
  async componentWillReceiveProps(nextProps) {
    if (this.props.auth.role) {
      if (nextProps.match.params.id !== this.props.match.params.id) {
        let response = await getUsersByTeamId(nextProps.match.params.id);
        this.setState({ users: response.data.users });
        response = await getAllProjectsByTeamId(this.props.match.params.id);
        this.setState({ projects: response.data.projects });
      }
    }
  }

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = async () => {
    try {
      const { form } = this.formRef.props;
      this.setState({ confirmLoading: true });
      form.validateFields(async (err, values) => {
        if (err) {
          this.setState({ confirmLoading: false });
          return;
        }
        const { userId } = values;
        const teamId = this.props.match.params.id;
        let response = await addUserToTeam(userId, teamId);
        this.props.updateTeamAction(response.data.team);
        response = await getUsersByTeamId(teamId);

        this.setState({ users: response.data.users });

        message.success("Member added successfully");
        this.setState({
          visible: false,
          confirmLoading: false
        });
      });
    } catch (error) {
      console.log(error.response);
      message.error(error.response.data.message);
      this.setState({
        confirmLoading: false
      });
    }
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  navigateTo = event => {
    this.props.auth.role
      ? this.props.history.push(`/dashboard/project/${event.target.id}`)
      : message.info("Permission denied visit My Tasks for More Info");
  };

  render() {
    const { auth } = this.props;
    let i = 0;
    return (
      <div>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <h4>Teams</h4>
          </Breadcrumb.Item>
          <Breadcrumb.Item></Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            background: "#fff",
            minHeight: "80vh",
            overflow: "hidden"
          }}
        >
          {this.props.auth.role ? null : (
            <Row>
              <Col>
                <h5 className="mb-3">
                  Team Name: {this.props.auth.teamId.title}
                </h5>
              </Col>
            </Row>
          )}
          <Row>
            <Col span={6}>
              <h3>Members</h3>
              {this.state.users.map(user => {
                return (
                  <Card key={user._id} className="mb-3">
                    <span className="d-flex align-items-center">
                      <Avatar
                        style={{
                          backgroundColor: this.state.colors[i],
                          verticalAlign: "middle"
                        }}
                      >
                        {user.firstName}
                      </Avatar>
                      <p className="ml-3 mt-3">
                        {user.firstName + " " + user.lastName}
                      </p>
                    </span>
                  </Card>
                );
                i = i > 3 ? 0 : i++;
              })}
              <br />
              {auth.role ? (
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  style={{ width: "95%" }}
                  onClick={this.showModal}
                >
                  Add Member
                </Button>
              ) : null}
            </Col>
            <Col span={15} offset={1}>
              <h3>Projects</h3>
              {this.state.projects.length > 0 ? (
                this.state.projects.map(project => {
                  return (
                    <Button
                      key={project._id}
                      id={project._id}
                      style={{
                        minWidth: 200,
                        minHeight: 100,
                        marginRight: 20,
                        marginBottom: 20
                      }}
                      onClick={this.navigateTo}
                      className="btn-success"
                    >
                      <span>
                        <p>{project.title}</p>
                        {/* <Link to={"/workspace" + workspace._id} /> */}
                      </span>
                    </Button>
                  );
                })
              ) : (
                <p>No projects assigned</p>
              )}
            </Col>
          </Row>
        </div>
        <AddMemberForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          confirmLoading={this.state.confirmLoading}
          usersArr={this.state.users}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth: auth.user
});

export default connect(
  mapStateToProps,
  { updateTeamAction }
)(TeamDetail);
