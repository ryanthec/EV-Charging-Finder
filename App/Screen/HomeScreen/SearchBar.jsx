import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

//Pass in searchedLocation with coordinates into the function
export default function SearchBar({searchedLocation}) {
    return (
        <View>
            {/* -Google places api autocomplete feature from online
                -enabledPoweredByContainer to remove the "powered by google" text 
                -fetchDetails set to true so we can fetch the details of the places nearby*/}
            <GooglePlacesAutocomplete
                placeholder='Search EV Charing Station'
                fetchDetails={true}
                enablePoweredByContainer={false}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    //In order to get only coordinates of location, we use searchedLocation and filter location
                    searchedLocation(details?.geometry?.location);
                }}
                query={{
                    //need to put in you r own API key for google places api
                    key: 'AIzaSyDl3RcpKcTdcnDSSXUhrUbZiRB4rj7pMJ8',
                    language: 'en',
                }}
            />
        </View>
    )
}