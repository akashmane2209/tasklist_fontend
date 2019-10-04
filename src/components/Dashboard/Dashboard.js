import React, { Component } from "react";

//MODULES
import { Link, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

//UI
import { Layout, Menu, Icon, Button, Dropdown, Row, Col, message } from "antd";

//APIS

//COMPONENTS
import Workspace from "../Workspace/Workspace";
import Project from "../Project/Project";
import Team from "../Team/Team";
import { deleteUser } from "../../apis/storage";
import { logoutAction } from "../../actions/authActions";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Dashboard extends Component {
  state = {
    collapsed: false,
    loginCollapse: false
  };

  componentDidMount() {}

  handleMenuClick = e => {
    message.success("Logout Successful");
    deleteUser();
    this.props.logoutAction();
    this.props.history.push("/login");
  };
  menu = (
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item>
        <span>
          <p>Logout</p>
        </span>
      </Menu.Item>
    </Menu>
  );

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  navigateTo = event => {
    const { key } = event;
    if (key === "workspaces") {
      this.props.history.push("/dashboard/workspace");
    } else if (key === "projects") {
      this.props.history.push("/dashboard/project");
    } else if (key === "teams") {
      this.props.history.push("/dashboard/team");
    }
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.toggleCollapsed}
        >
          <div className="logo" />
          <Button
            type="primary"
            className="mt-3 ml-3"
            onClick={this.toggleCollapsed}
            style={{ marginBottom: 16 }}
          >
            <Icon type={this.state.collapsed ? "menu-unfold" : "menu-fold"} />
          </Button>
          <Menu
            defaultSelectedKeys={["workspaces"]}
            defaultOpenKeys={["workspaces"]}
            mode="inline"
            theme="dark"
          >
            <SubMenu
              onTitleClick={this.navigateTo}
              key="workspaces"
              title={
                <span>
                  <Icon type="slack" />
                  <span>Workspaces</span>
                </span>
              }
            >
              <Menu.Item key="5">
                <span>Workspace 1</span>
                <Link to="/dashboard/workspace" />
              </Menu.Item>
              <Menu.Item key="6">Workspace 2</Menu.Item>
            </SubMenu>
            <SubMenu
              onTitleClick={this.navigateTo}
              key="projects"
              title={
                <span>
                  <Icon type="branches" />
                  <span>Projects</span>
                </span>
              }
            >
              <Menu.Item key="5">Project 1</Menu.Item>
              <Menu.Item key="6">Project 2</Menu.Item>
            </SubMenu>

            <SubMenu
              onTitleClick={this.navigateTo}
              key="teams"
              title={
                <span>
                  <Icon type="team" />
                  <span>Teams</span>
                </span>
              }
            >
              <Menu.Item key="5">Team 1</Menu.Item>
              <Menu.Item key="6">Team 2</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Row>
              <Col span={12}>
                <h3 className="p-3">TASKLIST</h3>
              </Col>
              <Col span={12}>
                <Dropdown overlay={this.menu}>
                  <Button
                    type="primary"
                    className="float-right mr-4 mt-3"
                    onClick={this.toggleLoginCollapsed}
                    style={{ marginBottom: 16 }}
                  >
                    &nbsp;
                    <Icon type="user" />
                    &nbsp;
                  </Button>
                </Dropdown>
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Switch>
              <Route path="/dashboard/workspace" component={Workspace} />
              <Route exact path="/dashboard/project" component={Project} />
              <Route exact path="/dashboard/team" component={Team} />
            </Switch>
          </Content>

          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  null,
  { logoutAction }
)(Dashboard);
