import React, { Component } from "react";
import { Avatar, Breadcrumb, Form, Col, Row, Input } from "antd";
import { connect } from "react-redux";
import "./Profile.css";

class Profile extends Component {
  render() {
    const { auth } = this.props;
    return (
      <div>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <h4>Profile</h4>
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
          <Form>
            <Row>
              <Col span={3}>
                <label className="float-right mr-2">
                  <b>First Name</b>
                </label>
              </Col>
              <Col span={5} className="ml-1">
                <Input value={auth.firstName} disabled={true} />
              </Col>
              <Col span={3} offset={3}>
                <label className="float-right mr-2">
                  <b>Last Name</b>
                </label>
              </Col>
              <Col span={5} className="ml-1">
                <Input value={auth.lastName} disabled={true} />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col span={3}>
                <label className="float-right mr-2">
                  <b>Email ID</b>
                </label>
              </Col>
              <Col span={5} className="ml-1">
                <Input value={auth.email} disabled={true} />
              </Col>
              <Col span={3} offset={3}>
                <label className="float-right mr-2">
                  <b>Team</b>
                </label>
              </Col>
              <Col span={5} className="ml-1">
                <Input value={auth.teamId.title} disabled={true} />
              </Col>
            </Row>
          </Form>
        </div>
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
)(Profile);
