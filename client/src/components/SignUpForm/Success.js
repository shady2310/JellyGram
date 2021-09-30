import React from "react";

const Success = (handleSubmit) => {
  return (
    <div>
      <h1>Hello</h1>
      <form onSubmit={handleSubmit}>
        <button >enviar</button>
      </form>
    </div>
  );
};

export default Success;
