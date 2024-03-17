import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import { Fontisto } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';

export default function Header() {

    const {user} = useUser();

    return (
        <View style={styles.container}>
            {/*Image is for the user icon(in this case the google profile*/}
            <Image source={{uri:user?.imageUrl}}
                style={{width:45, height:45, borderRadius:99}}/>
            
            <Image source={require('./../../../assets/images/logo.png')}
                style={{width:'40%', height:50,marginLeft:-20, objectFit:'contain'}}/>

            <Fontisto name="filter" size={30} color={Colors.PRIMARY} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        backgroundColor: Colors.WHITE_TRANSP,
        paddingHorizontal:20,
        paddingTop:15,
        paddingBottom:15,
        marginTop:'8%',
        marginBottom:'1%',
        borderRadius:10,
    }
})