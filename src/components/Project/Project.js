import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Breadcrumb,
  Button,
  Dropdown,
  Icon,
  message,
  Menu,
  Row,
  Col
} from "antd";
import CreateProjectForm from "../Modals/CreateProject";
import { createProject } from "../../apis/project";
import { addProjectAction } from "../../actions/projectActions";
class Project extends Component {
  state = {
    selectedWorkspace: null,
    visible: false,
    confirmLoading: false
  };
  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({ selectedWorkspace: this.props.match.params.id });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.setState({ selectedWorkspace: nextProps.match.params.id });
    }
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = async () => {
    try {
      const { form } = this.formRef.props;
      this.setState({ confirmLoading: true });
      form.validateFields(async (err, values) => {
        if (err) {
          return;
        }
        const { title } = values;
        const { teamId, dateString, selectedWorkspace } = this.state;
        const project = {
          title,
          workspaceId: selectedWorkspace,
          teamId,
          startDate: dateString[0],
          dueDate: dateString[1]
        };
        const response = await createProject(project);
        if (response) {
          this.props.addProjectAction(response.data.project);
          message.success("Project added successfully");
          this.setState({
            visible: false,
            confirmLoading: false
          });
        } else {
          message.error("Failed to add project");
          this.setState({
            confirmLoading: false
          });
        }
      });
    } catch (error) {
      console.log(error.message);
      message.error(error.data.message);
    }
  };

  handleMenuClick = e => {
    this.setState({
      selectedWorkspace: e.key
    });
  };
  handleDateChange = dateString => {
    this.setState({ dateString });
  };
  handleTeamChange = teamId => {
    this.setState({ teamId });
  };

  navigateTo = event => {
    console.log();
    this.props.history.push(`/dashboard/project/${event.target.id}`);
  };

  render() {
    let { projects } = this.props;
    let tempProjects = [...projects];
    // console.log(projects);
    const { selectedWorkspace } = this.state;
    if (selectedWorkspace) {
      tempProjects = tempProjects.filter(project => {
        return project.workspaceId._id === selectedWorkspace;
      });
    }

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {this.props.workspaces.map(workspace => {
          return <Menu.Item key={workspace._id}>{workspace.title}</Menu.Item>;
        })}
      </Menu>
    );
    return (
      <div>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <h4>Project</h4>
          </Breadcrumb.Item>
          <Breadcrumb.Item></Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            background: "#fff",
            minHeight: "70vh",
            overflow: "hidden"
          }}
        >
          <Row className="mb-3">
            <Col span={24}>
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                className="float-right btn-success"
              >
                <Button type="primary">
                  Select Workspace <Icon type="down" />
                </Button>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                style={{
                  minWidth: 200,
                  minHeight: 100,
                  marginRight: 20,
                  marginBottom: 20
                }}
                type="dashed"
                onClick={this.showModal}
              >
                <p>Create New Project</p>
              </Button>
              {tempProjects.map(project => {
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
              })}
            </Col>
          </Row>

          <CreateProjectForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            handleTeamChange={this.handleTeamChange}
            handleDateChange={this.handleDateChange}
            confirmLoading={this.state.confirmLoading}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ project, workspace }) => ({
  projects: project.project,
  workspaces: workspace.workspace
});

export default connect(
  mapStateToProps,
  { addProjectAction }
)(Project);
