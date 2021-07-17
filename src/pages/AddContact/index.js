import React, { useEffect, useState } from "react";
import CustomButton from "#/components/CustomButton";
import CustomInput from "#/components/CustomInput";
import "./styles.scss";
import { validateEmail } from "#/utils/utils";

const AddContact = (props) => {
  //State
  const [state, setState] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    longitude: "",
    latitude: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
  });
  const [dynamicAddressFields, setDynamicAddressFields] = useState([]);

  //Gettting the user current location/positon
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({ ...state, longitude: position.coords.longitude, latitude: position.coords.latitude });
      },
      (error) => {
        alert("Plese turn-on your location. We need your location data to complete this form");
      }
    );
  }, []);

  //binding with the state
  const handleOnChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  //Validating the fields
  const handleOnBlur = (event) => {
    const { name, value } = event.target;

    if (name === "name") {
      const wordCount = value.split(" ").filter(Boolean).length;

      if (value === "") {
        return setErrors({ ...errors, name: "Field is Required" });
      }
      if (wordCount < 2) {
        return setErrors({ ...errors, name: "Name must include First and Last Name" });
      }
      setErrors({ ...errors, name: "" });
    }

    if (name === "number") {
      if (value === "") {
        return setErrors({ ...errors, number: "Field is Required" });
      }
      if (value.length !== 11) {
        return setErrors({ ...errors, number: "Phone number must include 11 characters" });
      }
      if (value[0] !== "0") {
        return setErrors({ ...errors, number: "Nigerian number must start with zero " });
      }
      setErrors({ ...errors, number: "" });
    }

    if (name === "email") {
      const isValid = validateEmail(value);
      if (value === "") {
        return setErrors({ ...errors, email: "Field is Required" });
      }
      if (!isValid) {
        return setErrors({ ...errors, email: "Please enter a valid email" });
      }
      setErrors({ ...errors, email: "" });
    }
    if (name === "address") {
      if (value === "") {
        return setErrors({ ...errors, address: "Field is Required" });
      }
      if (value.length < 5) {
        return setErrors({ ...errors, address: "Please enter your full address" });
      }
      setErrors({ ...errors, address: "" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, number, address, longitude, latitude } = state;

    if ([longitude, latitude].includes("")) {
      alert("Plese turn-on your location. We need your location data to complete this form");
      return;
    }

    if ([name, email, number, address].includes("")) {
      let error = {};
      Object.entries(state).forEach(([key, value]) => {
        if (value === "") {
          error[key] = "Field is Required";
        }
      });

      setErrors(error);
      return;
    }
  };

  //Adds extra new address fields
  const addInputField = () => {
    const uid = Math.random().toString(36).substr(2, 5);
    let newAddyField = {
      title: uid,
      value: "",
      [uid]: "",
    };

    setState({ ...state, [newAddyField.title]: "" });
    setDynamicAddressFields([...dynamicAddressFields, newAddyField]);
  };

  //Remove extra new address fields
  const removeInputField = (id) => {
    let fields = dynamicAddressFields;
    const dynamicFields = fields.filter((item) => {
      return item.title !== id;
    });

    setDynamicAddressFields([...dynamicFields]);
  };

  const { name, email, number, longitude, latitude, address } = state;

  return (
    <div className="add-contact-page">
      <div className="form">
        <p className="form--label">Complete this form with accurate data to create a new user to the system. </p>
        <form noValidate className="form--contact" onSubmit={handleSubmit}>
          <CustomInput
            label="Name"
            name="name"
            value={name}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            placeholder="Enter your FullName"
            error={errors.name && errors.name}
          />
          <CustomInput
            label="Email"
            onBlur={handleOnBlur}
            name="email"
            value={email}
            onChange={handleOnChange}
            type="email"
            placeholder="Enter your Email"
            error={errors.email && errors.email}
          />
          <CustomInput
            label="Phone Number"
            name="number"
            value={number}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            type="number"
            placeholder="Phone Number"
            error={errors.number && errors.number}
          />
          <div className="address-box">
            <CustomInput
              boxClasses="address-box--input"
              label="Address"
              value={address}
              name="address"
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              placeholder="Enter your Address"
              error={errors.address && errors.address}
            />
            <CustomButton
              type="button"
              disabled={dynamicAddressFields.length === 4}
              onClick={addInputField}
              boxClass="address-box--btn"
              btnText="+"
            />
          </div>

          {dynamicAddressFields &&
            dynamicAddressFields.map((field) => {
              return (
                <div className="address-box" key={Math.random() * 1000}>
                  <CustomInput
                    boxClasses="address-box--input"
                    label="Other Address"
                    name={field.title}
                    value={field.title}
                    onChange={handleOnChange}
                    placeholder="Enter your Other Address"
                  />
                  <CustomButton type="button" onClick={() => removeInputField(field.title)} boxClass="address-box--btn" btnText="-" />
                </div>
              );
            })}

          <CustomInput label="Longitude" value={longitude} name="longitude" disabled={true} />
          <CustomInput label="Latitude" name="latitude" value={latitude} disabled={true} />
          <CustomButton boxClass="mt-3" btnText="Submit" />
        </form>
      </div>
    </div>
  );
};

export default AddContact;
