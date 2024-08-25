import { StyleSheet } from "react-native";
import fonts from "./fonts";
import { SearchSource } from "jest";

const styles = StyleSheet.create({
    backgroundImage: {
    width:'100%',
    height:250,
    marginBottom:10
    },
    overlay: {
      position: 'absolute',
      marginTop:'25%',
      alignSelf:'center'
    },
    inputbox: {
    height:50,
    elevation:0.2,
    width:'100%',
    borderRadius:10,
    borderColor:'#F6FFFA'
    },
    boldText:{
      alignSelf: "center",
      fontFamily: fonts.type.montserratSemiBold,
      color:'black',
     fontSize: fonts.size.font20,
    },
    textinput:{
      marginVertical:10,
      height:50,
      width:'100%',
      backgroundColor:'#F6FFFA',
      borderRadius:18,
      color:'black',
      paddingHorizontal:15,
      fontFamily: fonts.type.montserratSemiBold,
      fontSize: fonts.size.font13,
    },
    lightText:{   
      fontFamily: fonts.type.montserratLight,
      color:'grey',
     fontSize: fonts.size.font12,
    },
    container:{
      flexDirection:'row',
      borderColor:'#05A845',
      borderWidth:1,
      borderRadius:15,
      paddingVertical:14,
      justifyContent:'center',
      columnGap:10,
      marginVertical:12
    },
    greenText:{
      alignSelf: "center",
      fontFamily: fonts.type.montserratRegular,
      color:'#05A845',
      fontSize: fonts.size.font12,
      marginVertical:15
    },
    whiteText:{
      alignSelf: "center",
      fontFamily: fonts.type.montserratMedium,
      color:'white',
     fontSize: fonts.size.font12,
    },
    SearchContainer:{
      height:50,
      borderRadius:9,
      borderColor:'#05A845',
      borderWidth:1,
      marginVertical:10,
      flexDirection:'row'
    },
    headerText:{
      fontFamily: fonts.type.montserratBold,
      color:'black',
     fontSize: fonts.size.font24,
    },
    rowSpaceCenter:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between'
    },
    rowCenter:{
      flexDirection:'row',
       alignItems:'center',
    },
    searchText:{
      width:'85%',
      borderRadius:9,
      color:'black',
      paddingHorizontal:15,
      fontFamily:fonts.type.montserratBold,
      fontSize:fonts.size.font16
    },
    greenSearch:{
      height:50,
      width:'16%',
      borderRadius:9,
      backgroundColor:"#05A845",
      justifyContent:'center',
      alignItems:'center'
    },
    category: {
      marginHorizontal: 20,
      marginVertical:20
    },
    categoryName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      color:'black',
      alignSelf:'center'
    },
    image: {
      width: 100,
      height: 120,
      borderRadius:10,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    cartGreen:{
      borderColor: '#05A845', // Green border
      borderWidth: 2,         // Border thickness
      borderRadius: 10,       // Rounded corners
       paddingHorizontal: 5,  
       paddingVertical:15,          // Padding inside the container
      position: 'relative',   // For positioning the like icon
      alignItems: 'center',   // Center the image horizontally
      justifyContent: 'center', // Center
    },
    greenBold:{
      alignSelf: "center",
      fontFamily: fonts.type.montserratBold,
      color:'#05A845',
      fontSize: fonts.size.font20,
      marginVertical:15
    },
    errorText:{
      alignSelf: "center",
      fontFamily: fonts.type.montserratBold,
      color:'red',
      fontSize: fonts.size.font18,
    }
  });

  export default styles