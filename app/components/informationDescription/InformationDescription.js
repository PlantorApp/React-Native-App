import React from 'react';
import { useFonts } from "expo-font";
import { Box, Heading, HStack, View, VStack } from "native-base";
import { Dimensions, Pressable, ScrollView, Text } from "react-native";
import Svg, { Circle, Path, Rect } from 'react-native-svg';

const InformationDescription = ({ navigation }) => {

  const [loaded] = useFonts({
    DMSerifText: require('../../assets/fonts/DMSerifText-Regular.ttf'),
    QuickSandBold: require('../../assets/fonts/Quicksand-Bold.ttf'),
    QuickSandRegular: require('../../assets/fonts/Quicksand-Regular.ttf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={{backgroundColor: "#FCFAF7", marginTop: 24}}>
      <ScrollView>
        <View style={{ flex: 1, minHeight: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#FCFAF7', paddingTop: 24, paddingBottom: 108}}>
          <Box style={{width: Dimensions.get('window').width - 32}}>
            <Heading style={{fontFamily: 'DMSerifText', fontWeight: 'normal', color: '#827344', fontSize: 32, lineHeight: 38.5 }}>Information Description</Heading>
            <View style={{flex: 1, flexDirection:'row', justifyContent: 'center', paddingBottom: 8}}>
              <VStack style={{width: "100%"}}>
                <Box style={{marginTop: 24}}>
                  <HStack>
                    <Svg width="22" height="22" viewBox="0 -3 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <Path d="M6.53955 12.6523H3V18.9449H6.53955V12.6523Z" stroke="#B7A878" strokeWidth="1.25" stroke-miterlimit="10" strokeLinejoin="round"/>
                      <Path d="M12.7974 8.71875H9.25781V18.9441H12.7974V8.71875Z" stroke="#B7A878" strokeWidth="1.25" stroke-miterlimit="10" strokeLinejoin="round"/>
                      <Path d="M19.0005 4H15.4609V18.9435H19.0005V4Z" fill="white" stroke="#B7A878" strokeWidth="1.25" stroke-miterlimit="10" strokeLinejoin="round"/>
                    </Svg>
                    <Text style={{fontFamily: 'QuickSandBold', fontWeight: 'normal', color: '#827344', fontSize: 20}}> Maintenance level</Text>
                  </HStack>
                  <Text style={{fontFamily: 'QuickSandRegular', fontSize: 16, marginTop: 4}}>Indicates complexity level of the plant’s maintanance.</Text>
                </Box>
                <Box style={{marginTop: 24}}>
                  <HStack>
                    <Svg width="22" height="22" viewBox="0 -3 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <Path d="M3.07076 11.7405C3.16654 11.285 3.32687 10.8712 3.68814 10.5769C4.2545 10.1172 5.204 9.96333 5.89633 9.73039C6.80731 9.41843 6.95827 8.62915 7.89527 8.41077C8.96865 8.16016 9.96708 8.54804 10.8937 9.00767C12.2471 9.67736 12.9155 10.6143 13.4964 12.0556C13.7786 12.7565 13.7047 13.7735 13.3143 14.4224C12.9748 14.9881 12.4543 15.4768 12.1492 16.0623C11.8931 16.5531 11.9108 17.3185 11.6547 17.8083C11.205 18.6662 10.0171 19.1144 9.05923 18.9729C8.10141 18.8315 7.44967 17.9466 6.97701 17.1011C6.72298 16.6553 6.43477 16.2297 6.11497 15.8283C5.4903 15.0578 4.54497 14.9912 3.83389 14.2966C2.90835 13.3991 2.93333 12.3936 3.07076 11.7405Z" fill="white" stroke="#B7A878" strokeWidth="1.25" stroke-miterlimit="10"/>
                      <Path d="M7.22491 3.31131C6.52274 2.73894 5.36574 2.99753 4.61961 3.74672C3.71915 4.64309 3.69156 6.09752 4.31299 6.61368C4.98654 7.17481 6.28561 7.32914 7.35574 6.04131C8.00477 5.26146 7.90358 3.86426 7.22491 3.31131Z" fill="white" stroke="#B7A878" strokeWidth="1.25" stroke-miterlimit="10"/>
                      <Path d="M14.5265 3.31083C13.8243 2.73846 12.6673 2.99909 11.9181 3.74522C11.0187 4.64261 10.99 6.09602 11.6115 6.6132C12.284 7.17432 13.5841 7.32866 14.6532 6.04083C15.3063 5.26098 15.2051 3.86276 14.5265 3.31083Z" fill="white" stroke="#B7A878" strokeWidth="1.25" stroke-miterlimit="10"/>
                      <Path d="M18.4325 7.20398C17.7313 6.63161 16.5733 6.89735 15.8251 7.63939C14.9247 8.53576 14.896 9.99019 15.5185 10.5063C16.191 11.0675 17.4911 11.2218 18.5612 9.93398C19.2133 9.15412 19.1121 7.75795 18.4325 7.20398Z" fill="white" stroke="#B7A878" strokeWidth="1.25" stroke-miterlimit="10"/>
                      <Path d="M18.0985 13.8798C17.3963 13.3074 16.2393 13.5731 15.4911 14.3152C14.5907 15.2115 14.562 16.666 15.1845 17.177C15.857 17.7381 17.1571 17.8925 18.2273 16.6046C18.8793 15.8309 18.7782 14.4348 18.0985 13.8798Z" fill="white" stroke="#B7A878" strokeWidth="1.25" stroke-miterlimit="10"/>
                    </Svg>
                    <Text style={{fontFamily: 'QuickSandBold', fontWeight: 'normal', color: '#827344', fontSize: 20}}> Pet Friendly</Text>
                  </HStack>
                  <Text style={{fontFamily: 'QuickSandRegular', fontSize: 16, marginTop: 4}}>Indicates whether the plant is pet friendly.</Text>
                </Box>
                <Box style={{marginTop: 24}}>
                  <HStack>
                    <Svg width="22" height="22" viewBox="0 -3 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <Path d="M11 12.7452V7.98438" stroke="#B7A878" strokeWidth="1.25" strokeLinecap="round"/>
                      <Circle cx="10.8862" cy="11.7925" r="6.58152" stroke="#B7A878" strokeWidth="1.25"/>
                      <Path d="M7.98828 3H13.4293" stroke="#B7A878" strokeWidth="1.25" strokeLinecap="round"/>
                      <Path d="M3 7.07928L4.81366 5.26562" stroke="#B7A878" strokeWidth="1.25" strokeLinecap="round"/>
                    </Svg>
                    <Text style={{fontFamily: 'QuickSandBold', fontWeight: 'normal', color: '#827344', fontSize: 20}}> Duration</Text>
                  </HStack>
                  <Text style={{fontFamily: 'QuickSandRegular', fontSize: 16, marginTop: 4}}>Indicates the amount of time for the plant to fully grow. </Text>
                </Box>
                <Box style={{marginTop: 24}}>
                  <HStack>
                    <Svg width="22" height="22" viewBox="0 -3 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <Path d="M7 3V19" stroke="#B7A878" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <Path d="M4.25 3.39844V7.73177C4.25 9.89844 7 9.89844 7 9.89844C7 9.89844 9.75 9.89844 9.75 7.73177V3.39844" stroke="#B7A878" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <Path d="M15.4004 9.80078V19.0008" stroke="#B7A878" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <Path d="M17.8 6.25C17.8 8.04481 16.7256 9.5 15.4 9.5C14.0744 9.5 13 8.04481 13 6.25C13 4.45519 14.0744 3 15.4 3C16.7256 3 17.8 4.45519 17.8 6.25Z" stroke="#B7A878" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </Svg>
                    <Text style={{fontFamily: 'QuickSandBold', fontWeight: 'normal', color: '#827344', fontSize: 20}}> Edible</Text>
                  </HStack>
                  <Text style={{fontFamily: 'QuickSandRegular', fontSize: 16, marginTop: 4}}>Indicates whether the plant is edible.</Text>
                </Box>
                <Box style={{marginTop: 24}}>
                  <HStack>
                    <Svg width="22" height="22" viewBox="0 -3 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <Path d="M5.17969 5.26953L16.8158 16.7238M16.8158 5.26953L5.17969 16.7238" stroke="#B7A878" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <Path d="M3 11.0625L19 10.9404M11.0611 3.00143L10.9389 19.0014" stroke="#B7A878" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <Circle cx="10.9984" cy="10.9086" r="5.79529" fill="#FCFAF7" stroke="#B7A878" strokeWidth="1.5"/>
                    </Svg>
                    <Text style={{fontFamily: 'QuickSandBold', fontWeight: 'normal', color: '#827344', fontSize: 20}}> Lightning Duration</Text>
                  </HStack>
                  <Text style={{fontFamily: 'QuickSandRegular', fontSize: 16, marginTop: 4}}>Indicates the illumination time required to grow the plant.</Text>
                </Box>
                <Box style={{marginTop: 24}}>
                  <HStack>
                    <Svg width="22" height="22" viewBox="0 -3 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <Path d="M5.17969 5.26953L16.8158 16.7238M16.8158 5.26953L5.17969 16.7238" stroke="#B7A878" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <Path d="M3 11.0625L19 10.9404M11.0611 3.00143L10.9389 19.0014" stroke="#B7A878" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <Circle cx="10.9984" cy="10.9086" r="5.79529" fill="#FCFAF7" stroke="#B7A878" strokeWidth="1.5"/>
                    </Svg>
                    <Text style={{fontFamily: 'QuickSandBold', fontWeight: 'normal', color: '#827344', fontSize: 20}}> Lightning Intensity</Text>
                  </HStack>
                  <Text style={{fontFamily: 'QuickSandRegular', fontSize: 16, marginTop: 4}}>Indicates the illumination intensity required to grow the plant.</Text>
                </Box>
                <Box style={{marginTop: 24}}>
                  <HStack>
                    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <Rect width="22" height="22" fill="white"/>
                      <Path fillRule="evenodd" clipRule="evenodd" d="M8.18906 5.37433C8.18906 3.92495 9.36402 2.75 10.8134 2.75C12.2628 2.75 13.4377 3.92495 13.4377 5.37433V11.719C14.2686 12.4556 14.7923 13.5311 14.7923 14.7288C14.7923 16.9497 12.992 18.75 10.7712 18.75C8.55033 18.75 6.75 16.9497 6.75 14.7288C6.75 13.491 7.30934 12.3838 8.18906 11.6461V5.37433Z" fill="white"/>
                      <Path fillRule="evenodd" clipRule="evenodd" d="M10.8134 3.5C9.77823 3.5 8.93906 4.33917 8.93906 5.37433L8.93906 11.996L8.67095 12.2208C7.9539 12.8221 7.5 13.7221 7.5 14.7288C7.5 16.5355 8.96455 18 10.7712 18C12.5778 18 14.0423 16.5355 14.0423 14.7288C14.0423 13.7546 13.6173 12.8805 12.9402 12.2802L12.6877 12.0563V5.37433C12.6877 4.33917 11.8486 3.5 10.8134 3.5ZM7.43906 5.37433C7.43906 3.51074 8.9498 2 10.8134 2C12.677 2 14.1877 3.51074 14.1877 5.37433V11.3986C15.0251 12.2576 15.5423 13.4332 15.5423 14.7288C15.5423 17.3639 13.4062 19.5 10.7712 19.5C8.13612 19.5 6 17.3639 6 14.7288C6 13.3901 6.55214 12.1797 7.43906 11.314V5.37433Z" fill="#B7A878"/>
                      <Path fillRule="evenodd" clipRule="evenodd" d="M11.3682 8.25145C11.3722 8.22381 11.3742 8.19555 11.3742 8.16681C11.3742 7.83953 11.1089 7.57422 10.7817 7.57422C10.4544 7.57422 10.1891 7.83953 10.1891 8.16681C10.1891 8.19555 10.1911 8.22381 10.1951 8.25145H10.1891V12.7414C9.35608 12.995 8.75 13.7694 8.75 14.6853C8.75 15.8074 9.65964 16.717 10.7817 16.717C11.9038 16.717 12.8135 15.8074 12.8135 14.6853C12.8135 13.7693 12.2073 12.9949 11.3742 12.7413V8.25145H11.3682Z" fill="#B7A878"/>
                    </Svg>
                    <Text style={{fontFamily: 'QuickSandBold', fontWeight: 'normal', color: '#827344', fontSize: 20}}> Temperature Requirement</Text>
                  </HStack>
                  <Text style={{fontFamily: 'QuickSandRegular', fontSize: 16, marginTop: 4}}>Indicates the ideal temperature range required to grow the plant.</Text>
                </Box>
                <Box style={{marginTop: 24}}>
                  <HStack>
                    <Svg width="22" height="22" viewBox="0 -6 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <Path d="M19 12.6561C19 13.3535 18.7222 14.0223 18.2276 14.5154C17.7331 15.0085 17.0623 15.2855 16.3629 15.2855H5.66804C4.96864 15.2937 4.29464 15.0244 3.79432 14.5371C3.294 14.0497 3.00834 13.3842 3.00018 12.6868C2.99202 11.9894 3.26203 11.3174 3.75081 10.8185C4.23959 10.3197 4.9071 10.0348 5.60651 10.0267C5.4955 9.19728 5.68137 8.35541 6.13141 7.64915C6.58145 6.94289 7.26684 6.41747 8.06702 6.16532C8.86721 5.91316 9.73095 5.95042 10.5063 6.27053C11.2817 6.59064 11.919 7.17311 12.3062 7.91548C12.7089 7.67024 13.1678 7.5315 13.6393 7.51236C14.1109 7.49323 14.5795 7.59435 15.0009 7.80614C15.4223 8.01794 15.7826 8.33342 16.0477 8.72274C16.3127 9.11207 16.4738 9.56237 16.5156 10.0311C17.1875 10.0699 17.819 10.3634 18.2809 10.8515C18.7427 11.3395 19 11.9851 19 12.6561V12.6561Z" stroke="#B7A878" strokeWidth="1.5" strokeLinejoin="round"/>
                    </Svg>
                    <Text style={{fontFamily: 'QuickSandBold', fontWeight: 'normal', color: '#827344', fontSize: 20}}> Season</Text>
                  </HStack>
                  <Text style={{fontFamily: 'QuickSandRegular', fontSize: 16, marginTop: 4}}>Indicates the suitable period of the year to grow the plant.</Text>
                </Box>
              </VStack>
            </View>
          </Box>
        </View>
      </ScrollView>
      <View style={{backgroundColor: "#FFFFFF", height: 80, width: '100%', position: 'absolute', bottom: 0, borderTopWidth: 1, borderTopColor: '#DDDDDD'}}>
        <Box style={{justifyContent: 'center', alignItems: 'center'}}>
          <Pressable style={{borderRadius: 50, borderWidth: 1, borderColor: '#DDDDDD', justifyContent: 'center', padding: 14, width: 270, height: 48, backgroundColor: '#827344', marginTop: 16}} onPress={() => navigation.goBack()}>
            <Text style={{fontFamily: 'QuickSandBold', fontWeight: 'normal', fontSize: 20, lineHeight: 24, color: '#FFFFFF', textAlign: 'center'}}>OK, got it!</Text>
          </Pressable>
        </Box>
      </View>
    </View>
  )
}

export default InformationDescription