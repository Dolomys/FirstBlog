import './map.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import React from 'react';
import ShowPosts from '../ShowPosts/ShowPosts';



export default function Map(post) {

  return (
    <>
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} style={{height:"100%"}}>
             <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
             ></TileLayer>
           <ShowPosts data={post.post} />
      
    </MapContainer>

    </>
  )
}
