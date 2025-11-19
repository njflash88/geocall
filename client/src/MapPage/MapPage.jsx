import React from "react";
import GoogleMapReact from 'google-map-react';
import { useSelector } from "react-redux";
import './MapPage.css';
import Marker from "./Marker";
import UserInfoCard from "./UserInfoCard/UserInfoCard";
import Messenger from "../Messenger/Messenger";

const MapPage = () => {
  const myLocation = useSelector((state) => state.map.myLocation);
  const onlineUsers = useSelector((state) => state.map.onlineUsers);
  const CardChosenOption = useSelector((state) => state.map.cardChosenOption);

  const defaultMapProps = {
    center: {
      lat: myLocation.lat,
      lng: myLocation.lng,
    },
    zoom: 13
  }
  return (
    <div className="map_page_container">
    <GoogleMapReact
      bootstrapURLKeys={{key: "AIzaSyDzVCRaOcCvdlv3jxVaPQlfikvatWZrN9Y"}}
      defaultCenter={defaultMapProps.center}
      defaultZoom={defaultMapProps.zoom}
    >
      {onlineUsers.map((onlineUsers) => {
        return (
          <Marker
          lat={onlineUsers.coords.lat}
          lng={onlineUsers.coords.lng}
          key={onlineUsers.socketId}
          socketId={onlineUsers.socketId}
          username={onlineUsers.username}
          myself={onlineUsers.myself}
          coords={onlineUsers.coords}
          />
        );
      })}
    </GoogleMapReact>
    <Messenger />
    {CardChosenOption && <UserInfoCard
    socketId={CardChosenOption.socketId}
    username={CardChosenOption.username}
    userLocation={CardChosenOption.coords}
     />}
    </div>
  );
};

export default MapPage;
