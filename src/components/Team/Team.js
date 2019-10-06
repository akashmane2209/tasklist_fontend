import React, { Component } from "react";
import { Breadcrumb, Button, message } from "antd";
import { connect } from "react-redux";
import CreateTeam from "../Modals/CreateTeam";
import { addTeam } from "../../apis/team";
import { addTeamAction } from "../../actions/teamActions";
class Team extends Component {
  state = {
    selectedWorkspace: null,
    visible: false,
    confirmLoading: false
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

  navigateTo = event => {
    this.props.history.push(`/dashboard/team/${event.target.id}`);
  };

  handleCreate = async () => {
    try {
      const { form } = this.formRef.props;
      this.setState({ confirmLoading: true });
      form.validateFields(async (err, values) => {
        if (err) {
          return;
        }
        let { membersList } = values;
        membersList = membersList.map(member => {
          return {
            _id: member
          };
        });
        console.log(membersList);
        const response = await addTeam({
          title: values.title,
          membersList
        });
        if (response.status === 201) {
          this.props.addTeamAction(response.data.team);
          message.success("Team added successfully");
          this.setState({
            visible: false,
            confirmLoading: false
          });
        } else {
          message.error("Failed to add team");
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

  render() {
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
            <p>Create New Team</p>
          </Button>
          {this.props.teams.map(team => {
            return (
              <Button
                key={team._id}
                id={team._id}
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
                  <p>{team.title}</p>
                  {/* <Link to={"/team" + team._id} /> */}
                </span>
              </Button>
            );
          })}
        </div>
        <CreateTeam
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          confirmLoading={this.state.confirmLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ team }) => ({
  teams: team.team
});

export default connect(
  mapStateToProps,
  { addTeamAction }
)(Team);
