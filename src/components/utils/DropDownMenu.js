import React, { Component } from "react";
import { Menu, Icon, message } from "antd";

export class DropDownMenu extends Component {
  handleButtonClick = e => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };

  handleMenuClick = e => {
    message.info("Click on menu item.");
    console.log("click", e);
  };
  render() {
    return (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">
          <Icon type="user" />
          1st menu item
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="user" />
          2nd menu item
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="user" />
          3rd item
        </Menu.Item>
      </Menu>
    );
  }
}

export default DropDownMenu;
