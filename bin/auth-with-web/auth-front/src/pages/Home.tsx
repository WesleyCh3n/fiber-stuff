import React from "react";

export const Home = (props: { name: string }) => {
  return (
    <div className="p-3 text-xl">
      {props.name ? "Hi " + props.name : "Unautherized"}
    </div>
  );
};
