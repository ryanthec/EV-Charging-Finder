
import axios from 'axios'


//Base url for the api call and api key
const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";
const API_KEY = "INSERT YOUR OWN API KEY HERE";

//config for google places api
//field mask is so the places api only shows certain info
const config = {
    headers:{
        'Content-ype':'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': ['places.displayName',
                            'places.formattedAddress',
                            'places.location',
                            'places.evChargeOptions',
                            'places.photos',
                            'places.id',]
    }
}


const NewNearByPlace = (data)=>axios.post(BASE_URL, data, config);

export default{
    NewNearByPlace,
    API_KEY
}
