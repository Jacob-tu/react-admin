import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col } from "antd";
import "./index.css";
import { connect } from "react-redux";
import { setHeadTitle } from "../../redux/actions";
/*
前台404页面
 */
function NotFound(props) {
  let navigate = useNavigate();
  return (
    <Row className="not-found">
      <Col span={12} className="left"></Col>
      <Col span={12} className="right">
        <h1>404</h1>
        <h2>抱歉，你访问的页面不存在</h2>
        <div>
          <Button
            type="primary"
            onClick={() => {
              navigate("/home", { replace: true });
              props.setHeadTitle("首页");
            }}
          >
            回到首页
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default connect(null, { setHeadTitle })(NotFound);
