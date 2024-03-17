import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from './../../Utils/Colors.js'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';


WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    async function onPress()
    {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
              await startOAuthFlow();
       
            if (createdSessionId) {
              setActive({ session: createdSessionId });
            } else {
              // Use signIn or signUp for next steps such as MFA
            }
          } catch (err) {
            console.error("OAuth error", err);
          }
    }
    

    return (
        <View style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            marginTop:25
        }}>
            <Image source={require('./../../../assets/images/logo.png')}
                style={styles.logoImage}/>

            <Image source={require('./../../../assets/images/ev-car-background.jpg')}
                style={styles.bgImage}/>

            <View style={{padding:20}}>
                <Text style={styles.heading}>EV Charging Station Finder</Text>
                <Text style={styles.paragraph}>Find EV charging stations near you, plan your trip and so much more</Text>
                <TouchableOpacity style={styles.button}
                    onPress = {onPress}>
                    <Text style={{
                        color:Colors.WHITE,
                        textAlign:'center',
                        fontFamily:'montserrat',
                        fontSize:17,
                    }}>Login with Google</Text>
                </TouchableOpacity>
            </View>
        </View>
  )
}


const styles = StyleSheet.create({
    
    logoImage:{
        width:'60%',
        height:100,
        resizeMode:'contain',
        marginTop:25,
    },
    bgImage:{
        width: '100%',
        height: '40%',
        resizeMode: 'contain',
    },
    heading:{
        fontSize:30,
        fontFamily:'montserrat-bold',
        textAlign:'center',
        marginTop:20,
        color: Colors.OFFBLACK,
    },
    paragraph:{
        fontSize:15,
        fontFamily:'montserrat',
        textAlign:'center',
        marginTop:20,
        color: Colors.GRAY
    },
    button:{
        backgroundColor: Colors.PRIMARY,
        padding:16,
        display:'flex',
        borderRadius: 99,
        marginTop:70,
    }
})