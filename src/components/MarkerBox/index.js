import React from "react";
import "./styles.scss";

const MarkerBox = ({ contact }) => {
  return (
    <div className="marker-box">
      <h2>Contact Location Info</h2>
      <ul>
        <li>
          <strong>{contact.name}</strong>
        </li>
        <li>
          <strong>{contact.address}</strong>
        </li>
      </ul>
    </div>
  );
};

export default MarkerBox;
