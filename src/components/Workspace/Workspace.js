import React, { Component } from "react";
import { connect } from "react-redux";
import { Breadcrumb, Button, message } from "antd";

import CreatWorkspaceForm from "../Modals/CreateWorkspace";

import { addWorkspace } from "../../apis/workspace";
import { addWorkspaceAction } from "../../actions/workspaceActions";
import { Link } from "react-router-dom/cjs/react-router-dom";

class Workspace extends Component {
  state = {
    visible: false,
    confirmLoading: false
  };

  showModal = () => {
    this.setState({ visible: true });
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
        const createdBy = this.props.user._id;
        const { title } = values;
        const data = {
          createdBy,
          title
        };
        const response = await addWorkspace(data);
        if (response) {
          this.props.addWorkspaceAction(response.data.workspace);
          message.success("Workspace added successfully");
          this.setState({
            visible: false,
            confirmLoading: false
          });
        } else {
          message.error("Failed to add workspace");
          this.setState({
            confirmLoading: false
          });
        }
      });
    } catch (error) {
      console.log(error.message);
      message.error(error.response.message);
    }
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  navigateTo = event => {
    console.log();
    this.props.history.push(`/dashboard/workspace/${event.target.id}`);
  };

  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <h4>Workspace</h4>
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
            <p>Create New Workspace</p>
          </Button>
          {this.props.workspaces.map(workspace => {
            return (
              <Button
                key={workspace._id}
                id={workspace._id}
                style={{
                  minWidth: 200,
                  minHeight: 100,
                  marginRight: 20,
                  marginBottom: 20
                }}
                onClick={this.navigateTo}
                type="primary"
              >
                <span>
                  <p>{workspace.title}</p>
                  {/* <Link to={"/workspace" + workspace._id} /> */}
                </span>
              </Button>
            );
          })}
          <CreatWorkspaceForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            confirmLoading={this.state.confirmLoading}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, workspace }) => ({
  user: auth.user,
  workspaces: workspace.workspace
});

export default connect(
  mapStateToProps,
  { addWorkspaceAction }
)(Workspace);
