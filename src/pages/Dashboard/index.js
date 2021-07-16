import CustomButton from "#/components/CustomButton";
import CustomTable from "#/components/CustomTable";
import React from "react";
import { columns, tableData } from "./data";
import "./styles.scss";

const Dashboard = (props) => {
  const handleRoute = () => {
    props.history.push("/add-contacts");
  };
  return (
    <div className="dashboard">
      <div className="">
        <div className="dashboard--header">
          <div className="welcome-note">
            <h4>Welcome back</h4>
            <p className="mt-1">
              Here's what has been happening in the last <span>7 days</span>
            </p>
          </div>
          <CustomButton type="button" onClick={handleRoute} btnText="Add New Contact" />
        </div>

        <div className="dashboard--main">
          <CustomTable columns={columns} data={tableData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
