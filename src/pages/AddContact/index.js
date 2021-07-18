import React, { useEffect, useRef, useState } from "react";
import CustomButton from "#/components/CustomButton";
import CustomInput from "#/components/CustomInput";
import "./styles.scss";
import { validateEmail } from "#/utils/utils";
import { useContact } from "#/context/contact-context";

const AddContact = (props) => {
  //State
  const [loading, setLoading] = useState(false);
  const [submitnote, setsubmitnote] = useState(false);
  const [state, setState] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    longitude: "",
    latitude: "",
  });
  const [dynamicState, setdynamicState] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
  });

  //context
  const { addContacts } = useContact();

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
      setErrors({ ...errors, address: "" });
    }
  };

  //Validating dynamic Fields
  const checkedDynamicFields = () => {
    let err = false;

    const fields = dynamicState;
    fields.forEach((element) => {
      if (element.value === "") {
        err = true;
        element.error = "Field is Required";
      }
    });
    setdynamicState([...fields]);
    return err;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, number, address, longitude, latitude } = state;

    if ([longitude, latitude].includes("")) {
      alert("Plese turn-on your location. We need your location data to complete this form");
      return;
    }

    if (checkedDynamicFields()) {
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

    //Getting the dynamic values
    const addressValues = dynamicState.map((element) => element.value).filter(Boolean);
    const addressFields = [...addressValues, address];

    setLoading(true);
    const payload = {
      name,
      email,
      number,
      address: addressFields,
      longitude,
      latitude,
    };

    addContacts(payload, () => {
      //clearing the fields
      setState({
        ...state,
        name: "",
        email: "",
        number: "",
        address: "",
      });
      setsubmitnote(true);
      setdynamicState([]);
      setLoading(false);
    });

    setTimeout(() => {
      setsubmitnote(false);
    }, 5000);
  };

  //Adds extra new address fields
  const addInputField = () => {
    const arr = [];
    const newFields = {
      title: Math.random().toString(36).substr(2, 5),
      value: "",
      error: "",
    };
    arr.push(newFields);
    setdynamicState([...dynamicState, ...arr]);
  };

  //Dynamic fields handler
  const handleAddressesOnchange = (title, e) => {
    const value = e.target.value;

    const newFields = dynamicState.map((ip) => {
      if (ip.title === title) {
        ip.value = value;
      }
      return ip;
    });
    setdynamicState([...newFields]);
  };

  //Remove extra new address fields
  const removeInputField = (title) => {
    const newFields = dynamicState.filter((item) => {
      return item.title !== title;
    });

    setdynamicState([...newFields]);
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
            <CustomButton type="button" disabled={dynamicState.length === 4} onClick={addInputField} boxClass="address-box--btn" btnText="+" />
          </div>

          {dynamicState &&
            dynamicState.map((field) => {
              return (
                <div className="address-box" key={field.title}>
                  <CustomInput
                    boxClasses="address-box--input"
                    label="Other Address"
                    name={field.title}
                    error={field.error && field.error}
                    onChange={(e) => handleAddressesOnchange(field.title, e)}
                  />
                  <CustomButton type="button" onClick={() => removeInputField(field.title)} boxClass="address-box--btn" btnText="-" />
                </div>
              );
            })}

          <CustomInput label="Longitude" value={longitude} name="longitude" disabled={true} />
          <CustomInput label="Latitude" name="latitude" value={latitude} disabled={true} />

          {submitnote ? <p className="submit-note">Submitted.....</p> : null}
          <CustomButton boxClass="mt-3" btnText="Submit" loading={loading} />
        </form>
      </div>
    </div>
  );
};

export default AddContact;
