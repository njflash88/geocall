import React from "react";
import ActionButtons from "./ActionButtons";
import { useSelector } from "react-redux";
import { calculateDistanceBetweenCoords } from "../../utils/location";

const Label = ({text, fontSize}) => {
   return (
      <p className="map_page_card_label" style={{fontSize: fontSize}}>
         {text}
      </p>
   );
}
const UserInfoCard = ({username, userLocation, socketId }) => {
   const myLocation = useSelector((state) => state.map.myLocation);

   return (
      <div className="map_page_card_container">
         <Label text={username} fontSize="16px" />
         <Label
            fontSize="14px"
            text={`${calculateDistanceBetweenCoords(userLocation, myLocation)} km`}
         />
         <ActionButtons socketId={socketId} username={username}/>
      </div>
   );
}

export default UserInfoCard;