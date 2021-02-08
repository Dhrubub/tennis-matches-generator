import React from "react";
import Matches from "./matches";

interface Index {
  changeTab: () => void;
}

export default (props: Index) => {
  return (
    <React.Fragment>
      <Matches changeTab={props.changeTab} />
    </React.Fragment>
  );
};
