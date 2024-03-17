import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import MapView, {Marker, PROVIDER_GOOGLE, Circle} from 'react-native-maps'
import MapViewStyle from './../../Utils/MapViewStyle.json'
import { UserLocationContext } from '../../Context/UserLocationContext'
import Markers from './Markers'



export default function AppMapView({placeList}) {

    //fetch the user location from the context folder
    const {location, setLocation} = useContext(UserLocationContext);


    //We use location?.latitude&& so that we only show the map when location is loaded
    //Because user location might take a few ms to fetch and load
    return location?.latitude && (
        <View>
            {/*
            -Mapview can have different prodivers, for example google/apple maps
            -showUserLocation should be set to true to see your location
            -custom map style is done through google map style wizard and a json file
            -region basically is where the map will start at when loaded
            -we set it to our current location of course
            -long/lat delta is how zoomed in it is basically*/}
            
            <MapView style={styles.map}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={false}
            customMapStyle={MapViewStyle}
            region={{
                latitude:location?.latitude,
                longitude:location?.longitude,
                latitudeDelta:0.0422,
                longitudeDelta:0.0421,
            }}
            >
                {/*Marker component to show marker(for user) on map
                   Image is the custom marker we want
                   My Image is a bit skewed, so I use anchor to position it correctly
                   Such that the location is centered on the image*/}
                {location ? <Marker coordinate={{
                    latitude:location?.latitude,
                    longitude:location?.longitude,
                }} anchor={{ x: 0.5, y: 0.5 }}>
                    <Image source={require('./../../../assets/images/lambo-car.png')}
                        style={{width:50, height:50, objectFit:'contain'}}/>
                </Marker> : null}
                {/* Blue Radius around user*/}
                <Circle
                    center={location}
                    radius={15} // Adjust radius as needed
                    fillColor="rgba(99, 145, 212, 0.4)" // Blue color with 20% opacity
                    strokeColor="rgba(99, 145, 212, 0.4)" // Blue color with 50% opacity
                    strokeWidth={1}
                />
                <Circle
                    center={location}
                    radius={35} // Adjust radius as needed
                    fillColor="rgba(99, 145, 212, 0.25)" // Blue color with 20% opacity
                    strokeColor="rgba(99, 145, 212, 0.25)" // Blue color with 50% opacity
                    strokeWidth={1}
                />

                {/* Place Markers */}
                {placeList && placeList.map((item,index) => (
                    <Markers key={index}
                    index={index}
                    place={item}
                    />
                ))}

            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });