import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AppMapView from './AppMapView'
import Header from './Header'
import SearchBar from './SearchBar'
import { UserLocationContext } from '../../Context/UserLocationContext'
import GlobalApi from '../../Utils/GlobalApi'
import PlaceListView from './PlaceListView'
import { SelectMarkerContext } from '../../Context/SelectMarkerContext'


export default function HomeScreen() {

    //This location is user location
    const {location, setLocation} = useContext(UserLocationContext);
    
    const [placeList,setPlaceList] = useState([]);

    const [selectedMarker, setSelectedMarker] = useState([]);

    //useEffect to call api whenever location changes
    useEffect(()=>{
      location && GetNearByPlace();
    }, [location])


    //Function to getNearby EV stations
    function GetNearByPlace()
    {
        const data={
          "includedTypes": ["electric_vehicle_charging_station"],
          "maxResultCount": 10,
          "locationRestriction": {
            "circle": {
              "center": {
                "latitude": location?.latitude,
                "longitude": location?.longitude},
              "radius": 5000.0
            }
          }
        }
        
        //Uses NewNearByPlace function from GlobalApi to get some data
        GlobalApi.NewNearByPlace(data)
          .then(resp => {
            //console.log(JSON.stringify(resp.data));
            //Gets an array of places objects and save to place data useState
            setPlaceList(resp.data?.places);
          })
    }

    return (
        //Use a context provider to pass in marker location
        <SelectMarkerContext.Provider value={{selectedMarker, setSelectedMarker}}>
          <View>
            <View style={styles.headerContainer}>
              <Header/>
              <SearchBar searchedLocation={(location)=>setLocation({
                latitude: location.lat,
                longitude: location.lng,
              })}/>
            </View>
          
            {placeList && <AppMapView placeList={placeList}/>}
            <View style={styles.placeListContainer}>
              {placeList && <PlaceListView placeList={placeList}/>}
            </View>
          </View>
        </SelectMarkerContext.Provider>
    )
}


const styles = StyleSheet.create({
  headerContainer:{
    position:'absolute',
    zIndex:10,
    padding:10,
    width:'100%',
    paddingHorizontal:10,
  },

  placeListContainer:{
    position: 'absolute',
    bottom:0,
    zIndex:10,
    width:'100%',
  }
})