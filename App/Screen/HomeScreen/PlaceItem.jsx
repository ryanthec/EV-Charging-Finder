import { View, Text, Image, Dimensions, StyleSheet, Pressable, ToastAndroid, Platform, Alert, Linking } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import GlobalApi from '../../Utils/GlobalApi'
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from '../../Utils/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

//This placeItem file is basically to help organise our code
//The text here are the places near our current location
export default function PlaceItem({place, isFav, markedFav}) {

    //Base URL to fetch place photos from google api
    const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/"

    const {user} = useUser();
    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    async function onSetFav(place)
    {   
        //This will create a new entry in firebase
        //doc(dbname, name of collection, name of entry in collection, what you want to save)
        await setDoc(doc(db, "ev-fav-place", (place.id).toString()),
            //save place and email address of user
            {place:place,
            email:user?.primaryEmailAddress?.emailAddress},

        );
        markedFav();
        //Send an alert when you fav something(add to database)
        if (Platform.OS === 'android') {
            ToastAndroid.show('Fav Added!', ToastAndroid.TOP);
        } else if (Platform.OS === 'ios') {
            Alert.alert('Fav Added!');
        }
    }


    async function onRemoveFav(placeId)
    {
        await deleteDoc(doc(db, "ev-fav-place", placeId.toString()));
        
        //Send an alert when you remove a fav(remove from database)
        if (Platform.OS === 'android') {
            ToastAndroid.show('Fav Removed!', ToastAndroid.TOP);
        } else if (Platform.OS === 'ios') {
            Alert.alert('Fav Removed!');
        }
        markedFav();
    }

    //Function for the directions button on each card
    function onDirectionClick()
    {
        const url = Platform.select({
            ios:`maps:${place?.location?.latitude},${place?.location?.longitude}?q=${place?.formattedAddress}`,
            android:`geo:${place?.location?.latitude},${place?.location?.longitude}?q=${place?.formattedAddress}`,
        })

        Linking.openURL(url);
    }
    


    return (
        <View style={styles.placeItemsContainer}>

            {!isFav? <Pressable style={{position:'absolute', right:0, margin:5}}
                onPress={()=>onSetFav(place)}>
                <AntDesign name="hearto" size={30} color={Colors.SAGE} />
            </Pressable>
            :
            <Pressable style={{position:'absolute', right:0, margin:5}}
                onPress={()=>onRemoveFav(place.id)}>
                <AntDesign name="heart" size={30} color={Colors.SAGE} />
            </Pressable>
            }
            
            {/* We use the place's photo but if photo not available, we use default photo */}
            <Image source={
                place?.photos?
                {uri: `${PLACE_PHOTO_BASE_URL}${place?.photos[0]?.name} 
                /media?key=${GlobalApi.API_KEY}&maxHeightPx=800&maxWidthPx=1200`}
                : require('./../../../assets/images/logo.png')}
                style={{width:'100%', borderRadius:10, height:150, opacity:0.8, zIndex:-1, objectFit:'contain'}}/>

            

            <View style={{padding:15}}>
                <Text style={styles.stationName}>{place.displayName?.text}</Text>
                <Text style={styles.stationLocation}>{place?.formattedAddress}</Text>
                    
                <View style={styles.btnAndConnector}>
                    <View style={styles.connectorsContainer}>
                        <Text style={styles.connectors}>Connectors: </Text>
                        <Text style={styles.connectorsNum}>{place?.evChargeOptions?.connectorCount? place.evChargeOptions.connectorCount  + ' Points': '-'}</Text>
                    </View>
                                
                    <Pressable
                    onPress = {() => onDirectionClick()}
                    style={styles.locationButton}>
                        <FontAwesome name="location-arrow" size={24} color="white" />
                    </Pressable>
                </View>   
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    placeItemsContainer:{
        width:Dimensions.get('screen').width*0.9,
        margin:5,
        backgroundColor:'rgba(255, 255, 255, 0.7)',
        borderRadius:10,

    },

    stationName:{
        fontSize:23,
        fontFamily:'montserrat-medium'
    },

    stationLocation:{
        color:Colors.GRAY,
        fontFamily:'montserrat'
    },

    connectors:{
        fontFamily:'montserrat-medium',
        fontSize:17,
        color:Colors.GRAY
    },

    connectorsNum:{
        fontFamily:'montserrat-medium',
        fontSize:17
    },

    connectorsContainer:{
        marginTop:5,
    },

    locationButton:{
        padding:12,
        backgroundColor:Colors.SAGE,
        borderRadius:6,
        paddingHorizontal:14,
        height:50,
        width:50,
        alignItems:'center',
        justifyContent:'center'
    },

    btnAndConnector:{
        flexDirection:'row',
        justifyContent:'space-between',
    }
})