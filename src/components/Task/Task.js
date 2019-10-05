import React, { Component } from "react";
import { connect } from "react-redux";
import { Breadcrumb, Menu, Row, Col, Dropdown, Button, Icon } from "antd";

export class Task extends Component {
  state = {
    selectedProject: null,
    visible: false,
    confirmLoading: false
  };

  componentDidMount = async () => {
    const id = this.props.match.params.id;
    if (id) {
      this.setState({ selectedProject: this.props.match.params.id });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.setState({ selectedProject: nextProps.match.params.id });
    }
  }

  handleMenuClick = e => {
    this.setState({
      selectedProject: e.key
    });
  };

  render() {
    const { tasks } = this.props;
    let tempTasks = [...tasks];
    const { selectedProject } = this.state;
    if (selectedProject) {
      tempTasks = tempTasks.filter(task => {
        return task.projectId === selectedProject;
      });
    }
    console.log(selectedProject);
    console.log(tempTasks);

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {this.props.projects.map(project => {
          return <Menu.Item key={project._id}>{project.title}</Menu.Item>;
        })}
      </Menu>
    );
    return (
      <div>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <h4>Tasks</h4>
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
                  Select Project <Icon type="down" />
                </Button>
              </Dropdown>
            </Col>
          </Row>
          {tempTasks.map(task => {
            return <h1>{task.title}</h1>;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ project, task }) => ({
  projects: project.project,
  tasks: task.task
});

export default connect(
  mapStateToProps,
  null
)(Task);
