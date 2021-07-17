import CustomButton from "#/components/CustomButton";
import CustomTable from "#/components/CustomTable";
import { useContact } from "#/context/contact-context";
import React, { useEffect } from "react";
import { columns, tableData } from "./data";
import "./styles.scss";

const Dashboard = (props) => {
  //context
  const { getContacts, contacts, loading } = useContact();

  useEffect(() => {
    getContacts();
  }, []);

  const handleRoute = () => {
    props.history.push("/add-contacts");
  };
  console.log(contacts);
  const contactList =
    contacts &&
    contacts.map((contact) => {
      return {
        name: contact.name,
        email: contact.email,
        number: contact.number,
        address: contact.address,
        lon: contact.longitude,
        lat: contact.latitude,
      };
    });
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
          <CustomTable columns={columns} data={contactList} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
