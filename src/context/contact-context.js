import React, { createContext, useState, useContext, useEffect } from "react";

const ContactContext = createContext();

const ContactProvider = ({ children }) => {
  const initialState = {
    contacts: [],
    loading: false,
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (state.contacts.length > 0) {
      localStorage.setItem("omni-contacts", JSON.stringify(state));
    }
  }, [state.contacts]);

  const addContacts = (payload, cb) => {
    setState({ ...state, contacts: [...state.contacts, payload] });
    setTimeout(() => {
      cb();
    }, 2000);
  };

  const getContacts = () => {
    const contact = JSON.parse(localStorage.getItem("omni-contacts"));
    setState({ ...state, loading: true });
    setTimeout(() => {
      if (contact) {
        setState({
          ...state,
          contacts: contact.contacts,
          loading: false,
        });
      } else {
        setState({
          ...state,
          contacts: [],
          loading: false,
        });
      }
    }, 3000);
  };

  const { contacts, loading } = state;
  return <ContactContext.Provider value={{ contacts, loading, addContacts, getContacts }}>{children}</ContactContext.Provider>;
};

const useContact = () => {
  const contacts = useContext(ContactContext);
  if (contacts === undefined) {
    throw new Error("useContact must be used within a ContactProvider");
  }
  return contacts;
};

export { ContactProvider, useContact };
