import React, { Component } from "react";
import { Breadcrumb, Button } from "antd";
export default class Workspace extends Component {
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
            minHeight: "70vh",
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
          >
            <p>Create New Workspace</p>
          </Button>
        </div>
      </div>
    );
  }
}
