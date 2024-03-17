import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import { Marker } from 'react-native-maps'
import { SelectMarkerContext } from '../../Context/SelectMarkerContext'

export default function Markers({index, place}) {

  //Save context of selected marker
  const {selectedMarker, setSelectedMarker} = useContext(SelectMarkerContext);


  return place && (
    <Marker coordinate={{
        latitude:place.location?.latitude,
        longitude:place.location?.longitude,
      }}
      //Make marker onpress so that clicking on a marker will bring you to its respective item page
      onPress={()=>{setSelectedMarker(index)}}
    >
        {/* Add your custom marker if you want*/}
        {selectedMarker === index? (
            <Image source={require('./../../../assets/images/EV-ping.webp')}
            style={{width:50, height:50, objectFit:'contain'}}/>
            ) : (
            <Image source={require('./../../../assets/images/pin.png')}
            style={{width:50, height:50, objectFit:'contain'}}/>
            )}
        

    </Marker>
  )
}