import React from "react";
import ListPlayers from "./list-players";
import AddPlayer from "./add-player";

interface Index {
  changeTab: () => void;
}

export default (props: Index) => {
  return (
    <React.Fragment>
      <AddPlayer changeTab={props.changeTab} />
      <ListPlayers />
    </React.Fragment>
  );
};
