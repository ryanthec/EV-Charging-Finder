import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import PlaceItem from './PlaceItem';
import { SelectMarkerContext } from '../../Context/SelectMarkerContext';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../Utils/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function PlaceListView({placeList}) {
    

    /* The FlatList component in React Native is a high-performance list 
    component that renders a scrollable list of items.*/
    //FlatList property horizontal = true to make the list horizontal
    const flatListRef = useRef(null);

    //get user
    const {user} = useUser();
    //useState to save user's fav list
    const [favList,setFavList] = useState([]);


    //Passing in the values from the context and then assigning to the useEffect so that the panels will switch when a marker is pressed 
    const {selectedMarker, setSelectedMarker} = useContext(SelectMarkerContext);

    //Make sure to check selectedMarker and placeList is properly loaded before scrollToIndex can work, else an error
    useEffect(() => {
        if (selectedMarker !== null && placeList.length > 0) {
            scrollToIndex(selectedMarker);
        }
    }, [selectedMarker, placeList]);
    

    //Whatever index you prodive, it will scroll there
    function scrollToIndex(index)
    {
        flatListRef.current?.scrollToIndex({animated:true, index})
    }

    //To get item index(for the scroll to index to work)
    const getItemLayout=(_,index)=>({
        length: Dimensions.get('window').width,
        //Index is the index of the placeList
        offset: Dimensions.get('window').width*index,
        index
    });

    //Get data from firestore db
    const db = getFirestore(app);

    useEffect(() => {
        user && getFav();
    }, [user])

    //function to fetch favourites list from database
    async function getFav()
    {
        //Ensure to clear fav list each time you refresh else we will fetch too large of a list
        setFavList([]);
        const q = query(collection(db, "ev-fav-place"),
        //where is like a filter, so we only fetch favourites of the user 
        where("email", "==", user?.primaryEmailAddress?.emailAddress));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setFavList(favList => [...favList, doc.data()]);
        });
    }

    //Boolean function to check if a placeItem is favourited or not
    function isFav(place)
    {
        const result = favList?.find(item => item.place.id == place.id);
        console.log(result);
        return result?true:false;
    }



    return (
        <View>
            <FlatList
                data={placeList}
                horizontal={true}
                pagingEnabled
                ref={flatListRef}
                getItemLayout={getItemLayout}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{flexGrow:1, justifyContent:'center'}}
                renderItem={({item,index}) => (
                    <View key={index} style={{ width: Dimensions.get('window').width , justifyContent:'center', alignItems:'center'}}>
                        <PlaceItem place={item}
                            isFav = {isFav(item)}
                            markedFav = {() => getFav()}/>
                    </View>
                )}
                />
        </View>
    )
}