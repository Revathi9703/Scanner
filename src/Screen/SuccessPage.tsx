import React from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import styles from "../theme/UniveresalStyle"

const SuccessPage = ({navigation}:any) => {
    return(
        <ScrollView contentContainerStyle={{flex:1,justifyContent:'space-between',backgroundColor:'white',paddingVertical:10,marginHorizontal:10}}>

          <View style={{flex:1,alignItems:'center',backgroundColor:'white'}}>
          <Image source={require('../assets/Icons/basket.png')} style={{tintColor: "#05A845"}}/>
          <Text style={styles.greenText}>Eat Green</Text>
          <Text style={styles.greenBold}>Thank you</Text>
          <Image source={require('../assets/images/tick.png')} />
          <Text style={styles.greenBold}>Order Placed Successfully!</Text>
          <Image source={require('../assets/images/succespage.png')} />        
          </View>  

          <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")} style={[styles.container, { backgroundColor: "#05A845" }]}>
            <Text style={{ color: 'white',fontSize:15 }}>Back to Home</Text>
          </TouchableOpacity>
        </ScrollView>
    )
}
export default SuccessPage