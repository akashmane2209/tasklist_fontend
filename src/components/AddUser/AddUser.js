import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Breadcrumb,
  Form,
  Input,
  Row,
  Col,
  Alert,
  Button,
  message
} from "antd";
import SimpleReactValidator from "simple-react-validator";
import { addUser } from "../../apis/user";
import { addUserAction } from "../../actions/userActions";
export class AddUser extends Component {
  constructor() {
    super();
    this.validator = new SimpleReactValidator({
      element: message => (
        <Alert message={message} className="mt-2" type="error" />
      ),
      autoForceUpdate: this
    });
  }

  state = {
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    loading: false
  };

  handleTextChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = async () => {
    if (this.state.password !== this.state.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
    try {
      if (this.validator.allValid()) {
        this.setState({ loading: true });
        const { firstName, lastName, email, password } = this.state;
        const user = {
          firstName,
          lastName,
          email,
          password
        };
        const response = await addUser(user);
        this.props.addUserAction(response.data.user);
        message.success("User added successfully");

        this.resetForm();
      } else {
        this.validator.showMessages();
        this.setState({ loading: false });
      }
    } catch (error) {
      console.log(error);
      message.error("Operation Failed");
      this.resetForm();
    }
  };
  resetForm = () => {
    this.setState({
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      email: "",
      loading: false
    });
  };
  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <h4>Add User</h4>
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
            <Row className="mb-4">
              <Col span={5}>
                <label>First Name</label>
                <Input
                  id="firstName"
                  value={this.state.firstName}
                  onChange={this.handleTextChange}
                ></Input>
                {this.validator.message(
                  "First Name",
                  this.state.firstName,
                  "required"
                )}
              </Col>
              <Col span={5} offset={1}>
                <label>Last Name</label>
                <Input
                  id="lastName"
                  value={this.state.lastName}
                  onChange={this.handleTextChange}
                ></Input>
                {this.validator.message(
                  "lastName",
                  this.state.lastName,
                  "required"
                )}
              </Col>
            </Row>
            <Row className="mb-4">
              <Col span={5}>
                <label>Password</label>
                <Input.Password
                  id="password"
                  value={this.state.password}
                  onChange={this.handleTextChange}
                />
                {this.validator.message(
                  "Password",
                  this.state.password,
                  "required"
                )}
              </Col>
              <Col span={5} offset={1}>
                <label>Confirm Password</label>
                <Input.Password
                  id="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.handleTextChange}
                />
                {this.validator.message(
                  "Password",
                  this.state.confirmPassword,
                  "required"
                )}
              </Col>
            </Row>
            <Row className="mb-4">
              <Col span={12}>
                <label>Email</label>
                <Input
                  id="email"
                  value={this.state.email}
                  onChange={this.handleTextChange}
                />
                {this.validator.message(
                  "Email",
                  this.state.email,
                  "required|email"
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  type="primary"
                  className="mr-3"
                  onClick={this.handleSubmit}
                  loading={this.state.loading}
                >
                  Add User
                </Button>
                <Button type="danger" onClick={this.resetForm}>
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addUserAction }
)(AddUser);
