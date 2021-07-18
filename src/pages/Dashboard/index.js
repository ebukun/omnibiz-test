import CustomButton from "#/components/CustomButton";
import CustomTable from "#/components/CustomTable";
import Map from "#/components/Map";
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

  const contactList =
    contacts &&
    contacts.map((contact) => {
      return {
        name: contact.name,
        email: contact.email,
        number: contact.number,
        address: contact.address.length > 1 ? contact.address[Math.floor(Math.random() * contact.address.length)] : contact.address[0],
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
          <div className="mt-4">
            <p className="map-text">Click on the marker for contact info</p>
            <Map contacts={contactList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
