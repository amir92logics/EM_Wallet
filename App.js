

import React, { useEffect } from 'react';
import { Platform,Image, StatusBar, StyleSheet, View ,Text, PermissionsAndroid, Alert,  TouchableOpacity,} from 'react-native';
import FirstNavbar from './components/firstnavbar';
import CalendarMenu from './components/calendarMenu';
import Calendar from './components/calendar';
import configureStore  from './components/store';
import {Provider} from 'react-redux';
import { createAppContainer} from 'react-navigation';  
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import IncomeScreen from './screens/incomeScreen';  
import BalanceScreen from './screens/balanceScreen'
import expenseScreen from './screens/expenseScreen';  
// import LodingScreen from './lodingScreen'
import SplashScreen from 'react-native-splash-screen'
import {
  AdMobBanner,
  AdMobRewarded,
  AdMobInterstitial,
  PublisherBanner
} from 'react-native-admob';
// import RNGRP from 'rea'
import { CameraKitCameraScreen } from 'react-native-camera-kit';
import { RNCamera } from 'react-native-camera';
const store = configureStore()
   
const TopNavugation = createMaterialTopTabNavigator({  
    //Constant which holds all the screens like index of any book   
    Income: { screen: IncomeScreen },
    Balance: {screen : BalanceScreen},   
    //First entry by default be our first screen if we do not define initialRouteName  
    Expense: { screen: expenseScreen },   
  },  
  {  
    initialRouteName: 'Income',  
  }  
);  
const TopNav = createAppContainer(TopNavugation);  
const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);
export default class App extends React.Component {
  constructor( props) {
    super(props);
    this.state={
      image: null
    }
   
  }
  takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data);
    // var URI = "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAABMLAAATCwAAAAAAAAAAAABsiqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/iKC3/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/2uLp///////R2uP/dZGs/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/////////////////+3w9P+IoLf/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv///////////+3w9P+tvc3/dZGs/2yKpv9siqb/bIqm/2yKpv9siqb/TZbB/02Wwf9NlsH/TZbB/02Wwf9NlsH////////////0+Pv/erDR/02Wwf9NlsH/TZbB/02Wwf9NlsH/TZbB/02Wwf9NlsH/TZbB/02Wwf9NlsH/TZbB//////////////////////96sNH/TZbB/02Wwf9NlsH/TZbB/02Wwf9NlsH/TZbB/02Wwf9NlsH/TZbB/02Wwf////////////////+Ft9T/TZbB/02Wwf9NlsH/TZbB/02Wwf9NlsH/E4zV/xOM1f8TjNX/E4zV/yKT2P/T6ff/////////////////4fH6/z+i3f8TjNX/E4zV/xOM1f8TjNX/E4zV/xOM1f8TjNX/E4zV/xOM1f+m1O/////////////////////////////w+Pz/IpPY/xOM1f8TjNX/E4zV/xOM1f8TjNX/E4zV/xOM1f8TjNX////////////T6ff/Tqng/6bU7////////////3u/5/8TjNX/E4zV/xOM1f8TjNX/AIv//wCL//8Ai///AIv/////////////gMX//wCL//8gmv////////////+Axf//AIv//wCL//8Ai///AIv//wCL//8Ai///AIv//wCL///v+P///////+/4//+Axf//z+n/////////////YLf//wCL//8Ai///AIv//wCL//8Ai///AIv//wCL//8Ai///gMX/////////////////////////////z+n//wCL//8Ai///AIv//wCL//8Ai///AHr//wB6//8Aev//AHr//wB6//+Avf//7/f/////////////v97//xCC//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
   this.setState({
     image: data.uri
   })
   };
  convertURIToImageData(URI) {
    return new Promise(function(resolve, reject) {
      if (URI == null) return reject();
      var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d'),
          image = new Image();
      image.addEventListener('load', function() {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(context.getImageData(0, 0, canvas.width, canvas.height));
      }, false);
      image.src = URI;
    });
  }
  // var URI = "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAABMLAAATCwAAAAAAAAAAAABsiqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/iKC3/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/2uLp///////R2uP/dZGs/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/////////////////+3w9P+IoLf/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv9siqb/bIqm/2yKpv///////////+3w9P+tvc3/dZGs/2yKpv9siqb/bIqm/2yKpv9siqb/TZbB/02Wwf9NlsH/TZbB/02Wwf9NlsH////////////0+Pv/erDR/02Wwf9NlsH/TZbB/02Wwf9NlsH/TZbB/02Wwf9NlsH/TZbB/02Wwf9NlsH/TZbB//////////////////////96sNH/TZbB/02Wwf9NlsH/TZbB/02Wwf9NlsH/TZbB/02Wwf9NlsH/TZbB/02Wwf////////////////+Ft9T/TZbB/02Wwf9NlsH/TZbB/02Wwf9NlsH/E4zV/xOM1f8TjNX/E4zV/yKT2P/T6ff/////////////////4fH6/z+i3f8TjNX/E4zV/xOM1f8TjNX/E4zV/xOM1f8TjNX/E4zV/xOM1f+m1O/////////////////////////////w+Pz/IpPY/xOM1f8TjNX/E4zV/xOM1f8TjNX/E4zV/xOM1f8TjNX////////////T6ff/Tqng/6bU7////////////3u/5/8TjNX/E4zV/xOM1f8TjNX/AIv//wCL//8Ai///AIv/////////////gMX//wCL//8gmv////////////+Axf//AIv//wCL//8Ai///AIv//wCL//8Ai///AIv//wCL///v+P///////+/4//+Axf//z+n/////////////YLf//wCL//8Ai///AIv//wCL//8Ai///AIv//wCL//8Ai///gMX/////////////////////////////z+n//wCL//8Ai///AIv//wCL//8Ai///AHr//wB6//8Aev//AHr//wB6//+Avf//7/f/////////////v97//xCC//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AHr//wB6//8Aev//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==";
  // convertURIToImageData(URI).then(function(imageData) {
  //   // Here you can use imageData
  //   console.log(imageData);
  // });
  componentDidMount() {
        SplashScreen.hide();
        // this.takePicture();
// console.log(
//   <RNCamera
//   style={styles.preview}
//   type={RNCamera.Constants.Type.back}
//   flashMode={RNCamera.Constants.FlashMode.on}
//   androidCameraPermissionOptions={{
//     title: 'Permission to use camera',
//     message: 'We need your permission to use your camera',
//     buttonPositive: 'Ok',
//     buttonNegative: 'Cancel',
//   }}
//   androidRecordAudioPermissionOptions={{
//     title: 'Permission to use audio recording',
//     message: 'We need your permission to use your audio',
//     buttonPositive: 'Ok',
//     buttonNegative: 'Cancel',
//   }}
// >
//   {({ camera, status, recordAudioPermissionStatus }) => {
//     if (status !== 'READY') return <PendingView />;
//     return (
//       // <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
//         <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
//           <Text style={{ fontSize: 14 }}> SNAP </Text>
//         </TouchableOpacity>
//       // </View>
//     );
//   }}
// </RNCamera>
// )
        
  }
  onBottomButtonPressed(event) {
    const captureImages = JSON.stringify(event.captureImages);
    Alert.alert(
      `${event.type} button pressed`,
      `${captureImages}`,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: true }
    )
  }
  render() {
    //  const App=()=>{ 
    //    useEffectcreate:()=>{
    //      SplashScreen.hide();
        
    //    }, InputAccessoryView: []
    //    )
      return (
        // <View style={styles.container}>
        //   {Platform.OS === 'ios' && <StatusBar barStyle="default" />}

          <Provider store={store}>
             {/* <AdMobRewarded
  bannerSize="fullBanner"
  adUnitID="ca-app-pub-3940256099942544/6300978111"
  testDeviceID="EMULATOR"
  didFailToReceiveAdWithError={this.bannerError}
  admobDispatchAppEvent={this.adMobEvent} /> */}
 {/* <PublisherBanner
  bannerSize="fullBanner"
  adUnitID="ca-app-pub-3940256099942544/6300978111"
  testDeviceID="EMULATOR"
  didFailToReceiveAdWithError={this.bannerError}
  admobDispatchAppEvent={this.adMobEvent} /> */}
     {/* <RNCamera
          ref={(cam) => {
            this.Camera = cam;
          }}
          style={styles.preview}
          >
         <  TouchableOpacity><Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text></TouchableOpacity> 
        </RNCamera> */}
        {/* <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        /> */}
         {/* <View style={styles.container}> */}
        {/* <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.fill}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              // <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
              // </View>
            );
          }}
        </RNCamera>
      {this.state.image?<Image style={styles.stretch} source={{uri:this.state.image}}/> :null
      }   */}

       {/* <CameraKitCameraScreen
        actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
        onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
        flashImages={{
          on: require('./../images/flashOn.png'),
          off: require('./../images/flashOff.png'),
          auto: require('./../images/flashAuto.png')
        }}
        cameraFlipImage={require('./../images/cameraFlipIcon.png')}
        captureButtonImage={require('./../images/cameraButton.png')}
      /> */}
       <FirstNavbar/>
    

         <TopNav />
         
          <CalendarMenu />
         <Calendar />  
        </Provider>
         
      );
    }
  }

 
// }
// export default App;
const styles = StyleSheet.create({
  container: {
    // height:8,
    // flex:1,
    // flexWrap: 'wrap', 
    // alignItems: 'flex-start',
    // flexDirection:'column',
    // justifyContent:"space-between",
    // color:'red',
    backgroundColor: '#0275d8',
  },
  stretch: {
    width: 500,
    height: 400,
    resizeMode: 'stretch'
  }
});





// import React from 'react';
// import { View, Text, Button } from 'react-native';
// import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Home Screen</Text>
//         <Button
//           title="Go to Details"
//           onPress={() => {
//             this.props.navigation.dispatch(StackActions.reset({
//               index: 0,
//               actions: [
//                 NavigationActions.navigate({ routeName: 'Details' })
//               ],
//             }))
//           }}
//         />
//       </View>
//     );
//   }  
// }

// class DetailsScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Details Screen</Text>
//       </View>
//     );
//   }  
// }

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: HomeScreen,
//   },
//   Details: {
//     screen: DetailsScreen,
//   },
// }, {
//     initialRouteName: 'Home',
// });

// export default createAppContainer(AppNavigator);
