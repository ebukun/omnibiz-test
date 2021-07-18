import GoogleMapReact from "google-map-react";
import { useState } from "react";
import MarkerBox from "../MarkerBox";
import "./styles.scss";

const Map = ({ contacts, center, zoom }) => {
  const [contactInfo, setContactInfo] = useState(null);
  return (
    <div className="map">
      <GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyBRLlq7SHVxP3KF7jjOtJ1eWnoqOjmNEns" }} defaultCenter={center} defaultZoom={zoom}>
        {contacts &&
          contacts.map((contact) => {
            return (
              <Marker
                key={Math.random() * 100}
                lat={contact.lat}
                lng={contact.lon}
                onClick={() => setContactInfo({ name: contact.name, address: contact.address })}
              />
            );
          })}
      </GoogleMapReact>
      {contactInfo && <MarkerBox contact={contactInfo} />}
    </div>
  );
};

Map.defaultProps = {
  center: {
    lat: 6.524379,
    lng: 3.379206,
  },
  zoom: 1,
};

export default Map;

const Marker = ({ lat, lng, onClick }) => {
  return (
    <div className="marker" onClick={onClick}>
      <span>+</span>
    </div>
  );
};
