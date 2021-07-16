import CustomButton from "#/components/CustomButton";
import CustomInput from "#/components/CustomInput";
import React from "react";
import "./styles.scss";

const AddContact = (props) => {
  return (
    <div className="add-contact-page">
      <div className="form">
        <p className="form--label">Complete this form with accurate data to create a new user to the system. </p>
        <form noValidate className="form--contact">
          <CustomInput label="Name" name="name" placeholder="Enter your FullName" />
          <CustomInput label="Email" name="email" type="email" placeholder="Enter your Email" />
          <CustomInput label="Phone Number" name="number" type="number" placeholder="Phone Number" />
          <CustomInput label="Address" name="address" placeholder="Enter your Address" />
          <CustomInput label="Longitude" name="longitude" disabled={true} />
          <CustomInput label="Latitude" name="latitude" disabled={true} />
          <CustomButton boxClass="mt-3" btnText="Submit" />
        </form>
      </div>
    </div>
  );
};

export default AddContact;
