import React,{useEffect, useState} from "react";
import { Text, Box, FlatList, Image, Heading, HStack, View, Stack, } from 'native-base';
import { useFonts } from 'expo-font';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import EditEnv from "../components/dropDown/EditEnv";
import { getUserIDAsync } from "expo-facebook";
import Svg, { Ellipse, Path, Rect } from "react-native-svg";
import Modal from 'react-native-modal';
import ActionSheet from "../components/dropDown/ActionSheet";
import { AntDesign} from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { LogBox } from "react-native";

const SavedScreen = (props) => {

  const loggedInUser = props.loggedInUser
  // console.log("inside saved screen" , loggedInUser)
  // const [environmentList, setEnvironmentList] = useState([])
  const [currentId, setCurrentId] = useState('0')

  const [showModal, setShowModal] = useState(false)
  const [actionSheet, setActionSheet] = useState(false);
  const closeActionSheet = () => setActionSheet(false);

  // const [loaded] = useFonts({
  //   DMSerifText: require('../assets/fonts/DMSerifText-Regular.ttf'),
  //   QuickSandBold: require('../assets/fonts/Quicksand-Bold.ttf'),
  //   QuickSandRegular: require('../assets/fonts/Quicksand-Regular.ttf')
  // });


  const data = [
    {
      "id" : "1",
      "image": require("../assets/savedpage/illusOutdoorSaved.png"),
      "title" : "Home Balcony",
      "season" : "winter",
      "locationField" : "Vancouver",
      "temperature": "20C",
      "light":"Artificial light",
      "dateField":"12/09/2021",
      "outdoor" : true
    },
    {
      "id" : "2",
      "image": require("../assets/savedpage/illusIndoorSaved.png"),
      "title" : "Home Living Room",  
      "season" : "winter",
      "locationField" : "Vancouver",
      "temperature": "20C",
      "light":"Artificial light",
      "dateField":"12/09/2021"
    },
    {
      "id" : "3",
      "image": require("../assets/savedpage/illusIndoorSaved.png"),
      "title" : "Office Desk",
      "season" : "winter",
      "locationField" : "Vancouver",
      "temperature": "20C",
      "light":"Artificial light",
      "dateField":"12/09/2021"
    },
    {
      "id" : "4",
      "image": require("../assets/savedpage/illusIndoorSaved.png"),
      "title" : "Dining Room",
      "season" : "winter",
      "locationField" : "Vancouver",
      "temperature": "20C",
      "light":"Artificial light",
      "dateField":"12/09/2021"
    },
    {
      "id" : "5",
      "image": require("../assets/savedpage/illusIndoorSaved.png"),
      "title" : "Bed Room",
      "season" : "winter",
      "locationField" : "Vancouver",
      "temperature": "20C",
      "light":"Artificial light",
      "dateField":"12/09/2021"
    }
  ]
  
  // if (!loaded) {
  //   return null;
  // }

  // {
  //   outdoorField : loggedInUser.savedEnvironments.outdoorField,
  //   cityField : loggedInUser.savedEnvironments.cityField,
  //   tempField : loggedInUser.savedEnvironments.tempField,
  //   dateField : loggedInUser.savedEnvironments.dateField,
  //   cityLightingDurationField : loggedInUser.savedEnvironments.cityLightingDurationField,
  //   petFriendlyField : loggedInUser.savedEnvironments.petFriendlyField 
  // }

  // useFocusEffect(() => {
  //     if(!loggedInUser){
  //       props.navigation.navigate('Profile');
  //     }
  // },[props.navigation,loggedInUser])

  useFocusEffect(
    React.useCallback(() => {
      if(!loggedInUser){
              props.navigation.navigate('Profile');
            }
    }, [props.navigation,loggedInUser])
  );

  useEffect(() => {
    LogBox.ignoreLogs(["Warning: Can't perform a React state update on an unmounted component."]);
  }, []);


  const actionItems = [
    {
      id: 1,
      label: 'Rename Environment',
      onPress: () => {
        setActionSheet(false);
        const index = loggedInUser.savedEnvironments.findIndex( (el) => el.id === currentId );
        //console.log(loggedInUser.savedEnvironments[index])
        props.navigation.navigate('EnvironmentName',loggedInUser.savedEnvironments[index])
      }
    },
    {
      id: 2,
      label: 'Delete Environment',
      onPress: () => {
        setActionSheet(false);
        // console.log("delete pressed on element", currentId)

        const resultList = loggedInUser.savedEnvironments.filter(el => el.id !== currentId);

        const updateList = async () => {
          const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ savedEnvironments: resultList }),
          };
          const response2 = await fetch(`https://app.plantor.app/backend-users/users/${loggedInUser.sub}`,
          // const response2 = await fetch(`http://192.168.0.18:3003/users/${loggedInUser.sub}`,
            requestOptions
          );
          const data2 = await response2.json();
          props.setMongoLoggedInUser(data2);
          
          //console.log("after update: ", data2)
        }
        updateList()
      }
    }
  ];

  const handlePress = (option) => {
    console.log('Pressed')
    setShowModal(option)
  }

 


  return (
    <View style={{ flex: 1, minHeight: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#FCFAF7', marginTop: 24, paddingBottom: 28}}>
         {/* <Box style={{position: 'absolute', top: 16, right: 16, zIndex: 10}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Svg style={{alignSelf: 'flex-end'}} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Line x1="8" y1="22.8787" x2="22.8492" y2="8.02944" stroke="#B7A878" strokeWidth="3" strokeLinecap="round"/>
            <Line x1="8.12132" y1="8" x2="22.9706" y2="22.8492" stroke="#B7A878" strokeWidth="3" strokeLinecap="round"/>
          </Svg>
        </TouchableOpacity>
      </Box> */}
      <Box style={{width: Dimensions.get('window').width - 32, paddingTop: 20}}>
        <Heading style={styles.mainTitle}>Saved</Heading>
        {loggedInUser?.savedEnvironments[0] ? <FlatList
          data={loggedInUser?.savedEnvironments} style={{height: Dimensions.get('window').height, marginTop: 24}}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Box style={{marginBottom: 36}}>
              <HStack justifyContent="space-between">
                <Image source={item.outdoor ? require("../assets/savedpage/illusOutdoorSaved.png") : require("../assets/savedpage/illusIndoorSaved.png")} alt="Saved environment indoor or outdoor illustration" style={{width: 86, height: 110}} />
                <Box style={{width: Dimensions.get('window').width - 134}}>
                  <Stack>
                    <HStack justifyContent="space-between">
                    <Text onPress = { () => props.navigation.navigate('Suggestions',{
                      outdoor : item.outdoor,
                      city : item.city,
                      temp : item.temp,
                      date : item.date,
                      cityLightingDuration : item.cityLightingDuration,
                      petFriendly : item.petFriendly 
                    })} style={styles.titleStyle}>{item.title}</Text>
                      {/* <EditEnv /> */}
                      <AntDesign name="ellipsis1" size={24} color="black" onPress={(id) => {
                        setActionSheet(true); 
                        setCurrentId(item.id)
                      }}/>
                    </HStack>
                    <Text style={{fontFamily: 'QuickSandRegular', fontSize: 14, lineHeight: 22, color: '#AAAAAA'}}>
                      {item.date} | {item.outdoor ? "Outdoor" : "Indoor"}
                    </Text>
                    <HStack style={{marginTop: 8}}>
                      <Svg width="22" height="22" viewBox="0 -1 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M19 12.6561C19 13.3535 18.7222 14.0223 18.2276 14.5154C17.7331 15.0085 17.0623 15.2855 16.3629 15.2855H5.66804C4.96864 15.2937 4.29464 15.0244 3.79432 14.5371C3.294 14.0497 3.00834 13.3842 3.00018 12.6868C2.99202 11.9894 3.26203 11.3174 3.75081 10.8185C4.23959 10.3197 4.9071 10.0348 5.60651 10.0267C5.4955 9.19728 5.68137 8.35541 6.13141 7.64915C6.58145 6.94289 7.26684 6.41747 8.06702 6.16532C8.86721 5.91316 9.73095 5.95042 10.5063 6.27053C11.2817 6.59064 11.919 7.17311 12.3062 7.91548C12.7089 7.67024 13.1678 7.5315 13.6393 7.51236C14.1109 7.49323 14.5795 7.59435 15.0009 7.80614C15.4223 8.01794 15.7826 8.33342 16.0477 8.72274C16.3127 9.11207 16.4738 9.56237 16.5156 10.0311C17.1875 10.0699 17.819 10.3634 18.2809 10.8515C18.7427 11.3395 19 11.9851 19 12.6561V12.6561Z" stroke="#B7A878" strokeWidth="1.5" strokeLinejoin="round"/>
                      </Svg>
                      <Text style={styles.descriptionText}> {item.season}</Text>
                      <Svg style={{marginLeft: 20}} width="22" height="22" viewBox="0 -1 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Ellipse rx="2.52632" ry="2.59649" transform="matrix(-1 0 0 1 11.0967 9.80743)" stroke="#B7A878" strokeWidth="1.5" strokeLinejoin="round"/>
                        <Path d="M11.0264 3C14.6308 3 17.5527 5.9222 17.5527 9.52691C17.5527 10.7914 17.1932 12.0625 16.5708 13.0623C15.6291 14.7092 12.1595 19 11.0264 19C10.0747 19 6.58991 15.2682 5.48204 13.0623C4.85963 12.0625 4.5001 10.7914 4.5001 9.52691C4.5001 5.9222 7.42203 3 11.0264 3Z" stroke="#B7A878" strokeWidth="1.5" strokeLinejoin="round"/>
                      </Svg>
                      <Text style={styles.descriptionText}> {item.city}</Text>
                    </HStack>
                    <HStack style={{marginTop: 4}}>
                      <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Rect width="22" height="22" fill="white"/>
                        <Path fillRule="evenodd" clipRule="evenodd" d="M8.18906 5.37433C8.18906 3.92495 9.36402 2.75 10.8134 2.75C12.2628 2.75 13.4377 3.92495 13.4377 5.37433V11.719C14.2686 12.4556 14.7923 13.5311 14.7923 14.7288C14.7923 16.9497 12.992 18.75 10.7712 18.75C8.55033 18.75 6.75 16.9497 6.75 14.7288C6.75 13.491 7.30934 12.3838 8.18906 11.6461V5.37433Z" fill="white"/>
                        <Path fillRule="evenodd" clipRule="evenodd" d="M10.8134 3.5C9.77823 3.5 8.93906 4.33917 8.93906 5.37433L8.93906 11.996L8.67095 12.2208C7.9539 12.8221 7.5 13.7221 7.5 14.7288C7.5 16.5355 8.96455 18 10.7712 18C12.5778 18 14.0423 16.5355 14.0423 14.7288C14.0423 13.7546 13.6173 12.8805 12.9402 12.2802L12.6877 12.0563V5.37433C12.6877 4.33917 11.8486 3.5 10.8134 3.5ZM7.43906 5.37433C7.43906 3.51074 8.9498 2 10.8134 2C12.677 2 14.1877 3.51074 14.1877 5.37433V11.3986C15.0251 12.2576 15.5423 13.4332 15.5423 14.7288C15.5423 17.3639 13.4062 19.5 10.7712 19.5C8.13612 19.5 6 17.3639 6 14.7288C6 13.3901 6.55214 12.1797 7.43906 11.314V5.37433Z" fill="#B7A878"/>
                        <Path fillRule="evenodd" clipRule="evenodd" d="M11.3682 8.25145C11.3722 8.22381 11.3742 8.19555 11.3742 8.16681C11.3742 7.83953 11.1089 7.57422 10.7817 7.57422C10.4544 7.57422 10.1891 7.83953 10.1891 8.16681C10.1891 8.19555 10.1911 8.22381 10.1951 8.25145H10.1891V12.7414C9.35608 12.995 8.75 13.7694 8.75 14.6853C8.75 15.8074 9.65964 16.717 10.7817 16.717C11.9038 16.717 12.8135 15.8074 12.8135 14.6853C12.8135 13.7693 12.2073 12.9949 11.3742 12.7413V8.25145H11.3682Z" fill="#B7A878"/>
                      </Svg>
                      <Text style={styles.descriptionText}> {item.temp}</Text>
                      <Svg style={{marginLeft: 20}} width="22" height="22" viewBox="0 -1 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M16.4458 8.59791C16.4458 9.1237 16.2353 9.73235 15.8539 10.4174C15.4762 11.0961 14.9731 11.7773 14.4647 12.4476C14.0622 12.9782 13.9242 13.4729 13.8274 13.8202C13.8209 13.8433 13.8147 13.8658 13.8085 13.8876C13.7138 14.223 13.6569 14.3599 13.4879 14.5063C13.2308 14.7292 13.0304 14.7886 12.7969 14.8076C12.6592 14.8188 12.5057 14.8156 12.3004 14.8062C12.266 14.8047 12.23 14.8029 12.1926 14.8011C12.0186 14.7926 11.8139 14.7826 11.5979 14.7826C11.3891 14.7826 11.2164 14.7871 11.0651 14.791C10.8044 14.7977 10.6071 14.8028 10.3975 14.7806C10.1367 14.753 9.95058 14.6854 9.75775 14.5134C9.62747 14.3972 9.54707 14.2255 9.40328 13.8155C9.39683 13.7971 9.39025 13.7783 9.38353 13.759C9.25675 13.3956 9.07715 12.8808 8.68524 12.4168C8.09799 11.7216 7.60532 10.9952 7.26298 10.3149C6.91486 9.62304 6.75 9.03393 6.75 8.59791C6.75 5.92048 8.92048 3.75 11.5979 3.75C14.2753 3.75 16.4458 5.92048 16.4458 8.59791Z" stroke="#B7A878" strokeWidth="1.5"/>
                        <Rect x="9.50781" y="16.5781" width="4.17755" height="0.751958" rx="0.375979" fill="#B7A878" stroke="#B7A878" strokeWidth="0.25"/>
                        <Rect x="10.1777" y="18.2461" width="2.84073" height="0.751958" rx="0.375979" fill="#B7A878" stroke="#B7A878" strokeWidth="0.25"/>
                      </Svg>
                      <Text style={styles.descriptionText}> {item.locationField}</Text>
                    </HStack>
                  </Stack>
                </Box>
              </HStack>
              <Modal
                isVisible={actionSheet}
                style={{
                  margin: 0,
                  justifyContent: 'flex-end'
                }}
              >
              <ActionSheet
                  actionItems={actionItems}
                  onCancel={closeActionSheet}
              />
            </Modal>
            </Box>
          )}
        /> : <Text style={{marginTop: 24}}>Looks like there isn't any saved environment. If not logged in, try logging in.</Text>}
      </Box>
    </View>
  )
};

export default SavedScreen;

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: "DMSerifText",
    color: "#827344",
    fontSize: 32,
    fontWeight: 'normal',
    lineHeight: 38
  },
  titleStyle: {
    marginTop: 4,
    color: "#666666",
    fontSize: 20,
    lineHeight: 28,
    fontFamily: "QuickSandBold"
  },
  descriptionText: {
    fontFamily: 'QuickSandRegular',
    fontSize: 14,
    lineHeight: 22,
    color: '#666666'
  }
});