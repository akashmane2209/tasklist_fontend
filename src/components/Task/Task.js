import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Breadcrumb,
  Menu,
  Row,
  Col,
  Dropdown,
  Button,
  Icon,
  message
} from "antd";
import TaskTable from "./TaskTable";
import CreateTask from "../Modals/CreateTask";
import { addTask } from "../../apis/task";
import { addTaskAction, changeTaskFlagAction } from "../../actions/taskActions";
import { updateTaskFlag, getTasksByUserId } from "../../apis/task";
export class Task extends Component {
  state = {
    selectedProject: null,
    visible: false,
    confirmLoading: false,
    userTasks: []
  };

  componentDidMount = async () => {
    if (this.props.auth.role) {
      const id = this.props.match.params.id;
      if (id) {
        this.setState({ selectedProject: this.props.match.params.id });
      }
    } else {
      try {
        const response = await getTasksByUserId(this.props.auth._id);
        const tasks = response.data.tasks.map(task => {
          return {
            ...task,
            projectName: task.projectId.title
          };
        });
        tasks = tasks.map(task => {
          const seconds = Date.now();
          const currentDate = new Date(seconds);
          const dueDate = new Date(task.dueDate);
          const startDate = new Date(task.startDate);
          if (
            currentDate > startDate &&
            currentDate < dueDate &&
            task.priority !== "Completed"
          ) {
            task.flag = 2;
          } else if (currentDate < startDate && task.priority !== "Completed") {
            task.flag = 1;
          } else if (currentDate > dueDate && task.priority !== "Completed") {
            task.flag = 3;
            task.priority = "High";
          }
          return task;
        });
        this.setState({ userTasks: tasks });
      } catch (error) {
        console.log(error);
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.role) {
      if (nextProps.match.params.id !== this.props.match.params.id) {
        this.setState({ selectedProject: nextProps.match.params.id });
      }
    }
  }

  handleMenuClick = e => {
    this.setState({
      selectedProject: e.key
    });
  };

  handleDateChange = dateString => {
    this.setState({ dateString });
  };
  handleUserChange = userId => {
    this.setState({ userId });
  };

  handlePriorityChange = priority => {
    this.setState({ priority });
  };

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
        const { userId, dateString, selectedProject, priority } = this.state;

        const { title } = values;
        const task = {
          title,
          assignedTo: userId,
          projectId: selectedProject,
          startDate: dateString[0],
          dueDate: dateString[1],
          priority
        };
        const response = await addTask(task);
        if (response.status === 201) {
          this.props.addTaskAction(response.data.task);
          message.success("Task added successfully");
          this.setState({
            visible: false,
            confirmLoading: false
          });
        } else {
          message.error(response.data.message);
          this.setState({
            confirmLoading: false
          });
        }
      });
    } catch (error) {
      console.log(error.response);
      message.error(error.response.data.message);
      this.setState({
        confirmLoading: false
      });
    }
  };
  markComplete = async record => {
    try {
      const response = await updateTaskFlag(record);
      if (response) {
        this.props.changeTaskFlagAction(record);
        message.success("Good Job at completing the task");
      }
    } catch (error) {
      message.error("Update Failed");
    }
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
    tempTasks = tempTasks.map(task => {
      const userName =
        task.assignedTo[0].firstName + " " + task.assignedTo[0].lastName;
      return {
        ...task,
        userName
      };
    });

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
            minHeight: "80vh",
            overflow: "hidden"
          }}
        >
          {this.props.auth.role ? (
            <Row className="mb-3">
              <Col span={24}>
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  className="float-left"
                  onClick={this.showModal}
                >
                  Add Task
                </Button>
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
          ) : null}
          {this.props.auth.role ? (
            <TaskTable tasks={tempTasks} markComplete={this.markComplete} />
          ) : (
            <TaskTable
              tasks={this.state.userTasks}
              markComplete={this.markComplete}
            />
          )}
        </div>
        <CreateTask
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          handleUserChange={this.handleUserChange}
          handlePriorityChange={this.handlePriorityChange}
          handleDateChange={this.handleDateChange}
          confirmLoading={this.state.confirmLoading}
          projectId={this.state.selectedProject}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ project, task, auth }) => ({
  projects: project.project,
  tasks: task.task,
  auth: auth.user
});

export default connect(
  mapStateToProps,
  { addTaskAction, changeTaskFlagAction }
)(Task);
