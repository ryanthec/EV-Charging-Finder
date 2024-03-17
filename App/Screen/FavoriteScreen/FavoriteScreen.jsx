import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../Utils/Colors'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../Utils/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import PlaceItem from '../HomeScreen/PlaceItem';

export default function FavoriteScreen() {


    //Get data from firestore db
    const db = getFirestore(app);
  
    //get user
    const {user} = useUser();
    //useState to save user's fav list
    const [favList,setFavList] = useState([]);

    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        user && getFav();
    }, [user])

    //function to fetch favourites list from database
    async function getFav()
    {
        setLoading(true);
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
        setLoading(false);
        });
    }  




    return(
      <View style={{alignItems:'center'}}>

        <Text style={{
          padding:10,
          paddingTop:40,
          fontFamily:'montserrat-bold',
          fontSize:40,
          textDecorationLine:'underline',
          color:Colors.SAGE,
        }}>Favorite Stations</Text>

        


        {!favList? <View style={{
          height:'100%',
          display:'flex',
          alignItems:'center',
          justifyContent:'center'
        }}>
           <ActivityIndicator
          size={'large'}
          color={Colors.PRIMARY}/>
          <Text style={{fontFamily:'montserrat', fontSize:20}}>Loading...</Text>
        </View>:null}
        
        {/*Have to provide onRefresh and refreshing to enable the swipe up to refresh favorites page*/}
        <FlatList
          
          data={favList}
          onRefresh={() => getFav()}
          refreshing={loading}
          renderItem={({item,index})=>(
            <PlaceItem place={item.place} isFav={true}
              markedFav={() => getFav()}/>
          )}
        />

        <View style={{marginBottom:100}}>

        </View>
        
      </View>
    )
}
