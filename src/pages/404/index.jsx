import React from "react";
import { useNavigate } from "react-router-dom";

export default function Error(props) {
  let navigate = useNavigate();

  return (
    <main style={{ padding: "1rem" }}>
      <h1>404 Not Found</h1>
      <p>There's nothing here!</p>
      <button
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        返回主页
      </button>
    </main>
  );
}
