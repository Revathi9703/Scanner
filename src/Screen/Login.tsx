import React, { useState } from "react";
import { Image, ImageBackground, ScrollView, StyleSheet,  Text,  TextInput,  TouchableOpacity,  View } from "react-native";
import styles from '../theme/UniveresalStyle';


const LoginScreen =  ({navigation}:any) => { 
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [emailErr,setEmailErr] = useState('');
  const [passwordErr,setPasswordErr] = useState('');
  
   const Validation = () =>{
    const mail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(!email){
      setEmailErr("Please Enter Email");
    }
    else if(mail.test(email)==false){
      setEmailErr("Please Enter Valid Email");
    }
    else{
      setEmailErr("");
    }
    if(!password){
      setPasswordErr("Please Enter Password")
    }
    else{
      setPasswordErr('')
    }
    if(!email||!password||mail.test(email)==false){
      return false
    }
   else{
    navigation.navigate("HomeScreen")
   }

   }
  
  return(
    <View style={{flex:1,backgroundColor:'white'}}>
      <ImageBackground source={require('../assets/images/background.png')}style={styles.backgroundImage}>
       <Image source={require('../assets/images/greenbackground.png')} style={styles.backgroundImage}></Image>
       <View style={styles.overlay}>
       <Image source={require('../assets/Icons/basket.png')}/>
       <Text style={styles.whiteText}>Eat Green</Text>
       </View>
      </ImageBackground>
      <ScrollView  style={{paddingHorizontal:15}}>
    
      <Text style={styles.boldText}>Login In</Text>

      <TextInput style={styles.textinput} placeholder="Email"
      value={email} onChangeText={(text:string)=>{
        setEmail(text)
      }} placeholderTextColor={'grey'}></TextInput>
      {emailErr ? <Text style={styles.errorText}>{emailErr}</Text> :null}
      <TextInput style={styles.textinput} placeholder="Password"
       value={password} onChangeText={(text:string)=>{
        setPassword(text)
      }} placeholderTextColor={'grey'}></TextInput>
      {passwordErr ? <Text style={styles.errorText}>{passwordErr}</Text> :null}
      <TouchableOpacity onPress={Validation} style={[styles.container,{backgroundColor:"#05A845"}]}>
      <Text style={{color:'white'}}>Log In</Text>
      </TouchableOpacity>
     
      <Text style={[styles.lightText,{alignSelf: "center"}]}>Forget Password</Text>
      <Text style={styles.boldText}>OR</Text>
  
      <View style={styles.container}>
      <Image source={require('../assets/Icons/google.png')}></Image>
      <Text style={{color:'black'}}>Login With Google</Text>
      </View>

      <View style={styles.container}>
      <Image source={require('../assets/Icons/facebook.png')}></Image>
      <Text style={{color:'black'}}>Login With Facebook</Text>
      </View>

      <Text style={styles.greenText}>Don't have an Account? Sign up</Text>
      </ScrollView>

    </View>
  )
}
export default LoginScreen

