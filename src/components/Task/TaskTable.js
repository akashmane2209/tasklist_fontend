import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Tag, Button } from "antd";

export class TaskTable extends Component {
  state = {
    filteredInfo: null,
    sortedInfo: null
  };
  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
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
        ) : (
          <Button
            type="link"
            onClick={() => this.props.markComplete(record._id)}
          >
            Mark As Completed
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
