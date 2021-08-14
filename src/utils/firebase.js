import axios from "axios";
import {default as app} from "firebase";
import api from './api'
const firebaseConfig = {
    apiKey: "AIzaSyAo9HJkCokSeE8xzU4dQ0cXPmqkm6TlnFE",
    authDomain: "renote-9c306.firebaseapp.com",
    projectId: "renote-9c306",
    storageBucket: "renote-9c306.appspot.com",
    messagingSenderId: "1079283212742",
    appId: "1:1079283212742:web:2cfe33ec7d353c74f952c7",
    measurementId: "G-LYBGY5H6RB"
  };


app.initializeApp(firebaseConfig);
const provider = new app.auth.GoogleAuthProvider();

export async function loginWithGoogle () {
   var output = {
       success:false
   };
  const result = await app.auth().signInWithPopup(provider)

   try {
      var idToken =await result.user.getIdToken();
      try {
          const requestData = {
              idToken: idToken
          }
          const { data} = await axios.post(api.fbLogin,requestData);
          if (!data.success && data.error) {
              output.error = data.error;
              if (data.providerSts && data.providerSts === 0) {
                  try {
                      await result.user.delete();
                  } catch (error) {
                      output.error = "i guess we are fucked now!"
                  }
              } 
          }else{
              output.success = true;
              output.body = data.body.user;
              localStorage.setItem('access_token',data.body.access_token);
          }
      } catch (error) {
          console.log(error);
          output.error = "Something went wrong";
      }
   } catch (error) {
        console.log(error);
        output.error = "Something went wrong";
   }

   return output;
}

export async function registerWithGoogle () {
    var output = {
        success:false
    };
    const result = await app.auth().signInWithPopup(provider);
 
    try {
      
       var idToken =await result.user.getIdToken();
 
       try {
           const requestData = {
               idToken: idToken
           }
           const { data} = await axios.post(api.fbRegister,requestData);
           if (!data.success && data.error) {
               output.error = data.error;
               if (data.providerSts && data.providerSts === 0) {
                   try {
                       await result.user.delete();
                   } catch (error) {
                       output.error = "i guess we are fucked now!"
                   }
               } 
           }else{
               output.success = true;
               output.body = data.body.user;
               localStorage.setItem('access_token',data.body.access_token);
           }
       } catch (error) {
           console.log(error);
           output.error = "Something went wrong";
       }
    } catch (error) {
         console.log(error);
         output.error = "Something went wrong";
    }
 
    return output;
}