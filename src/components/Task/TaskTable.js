import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Tag, Button } from "antd";

import ShowMessages from "../Modals/ShowMessges";

export class TaskTable extends Component {
  state = {
    visible: false,
    taskId: ""
  };

  componentDidMount() {}

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  showModal = record => {
    this.setState({ visible: true, taskId: record });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  assigned = this.props.auth.role
    ? {
        title: "Assigned To",
        dataIndex: "userName",
        key: "userName",
        render: text => <p>{text}</p>
      }
    : {
        title: "Project",
        dataIndex: "projectName",
        render: text => <p>{text}</p>
      };
  columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: text => <p>{text}</p>
    },
    this.assigned,
    {
      title: "Priority",
      dataIndex: "priority",
      render: text => {
        if (text === "High") {
          return <Tag color="#d9534f">{text}</Tag>;
        } else if (text === "Medium") {
          return <Tag color="#f0ad4e">{text}</Tag>;
        } else if (text === "Completed") {
          return <Tag color="#5cb85c">{text}</Tag>;
        } else {
          return <Tag color="#0275d8">{text}</Tag>;
        }
      }
    },
    {
      title: "Status",
      dataIndex: "flag",
      sorter: (a, b) => a.flag > b.flag,
      render: number => {
        if (number === 1) {
          return <Tag color="#f0ad4e">Pending</Tag>;
        } else if (number === 2) {
          return <Tag color="#0275d8">Ongoing</Tag>;
        } else if (number === 3) {
          return <Tag color="#d9534f">Delayed</Tag>;
        } else if (number === 0) {
          return <Tag color="#5cb85c">Completed</Tag>;
        }
      }
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: text => <p>{text.substring(0, 10)}</p>
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      render: text => <p>{text.substring(0, 10)}</p>
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: record => {
        return record.flag === 0 ? (
          <p>Completed</p>
        ) : record.assignedTo[0]._id === this.props.auth._id ? (
          <Button
            type="link"
            onClick={() => this.props.markComplete(record._id)}
          >
            Mark As Completed
          </Button>
        ) : (
          <Button
            type="link"
            disabled={true}
            onClick={() => this.props.markComplete(record._id)}
          >
            Mark As Completed
          </Button>
        );
      }
    },
    {
      title: "Messages",
      dataIndex: "",
      key: "y",
      render: record => {
        return (
          <Button type="link" onClick={() => this.showModal(record._id)}>
            Show Messages
          </Button>
        );
      }
    }
  ];
  render() {
    return (
      <div>
        <Table
          rowKey={task => task._id}
          columns={this.columns}
          dataSource={this.props.tasks}
          onChange={this.handleChange}
        />
        <ShowMessages
          visible={this.state.visible}
          onCancel={this.handleCancel}
          taskId={this.state.taskId}
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
  null
)(TaskTable);
