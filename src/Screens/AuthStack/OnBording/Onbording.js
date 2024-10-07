import React, {useState, useRef} from 'react';
import {Platform, Text, View} from 'react-native';
import {styles} from './Styles';
import CustomButton from '../../../Components/Buttons/customButton';
import Onbording1 from '../../../assets/Svgs/onbording1.svg';
import Onbording2 from '../../../assets/Svgs/onbording2.svg';
import Onbording3 from '../../../assets/Svgs/onbording3.svg';
import PagerView from 'react-native-pager-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../Constants/COLORS';
import useAppStates from '../../../ReduxToolkit/Hooks/AppHooks/useAppStates/useAppStates';

const Onboarding = ({navigation}) => {
  const [currentPage, setCurrentPage] = useState(0); // Track the current page index
  const pagerRef = useRef(null); // Ref to control pager


  const pages = [
    {
      image: <Onbording1 width={wp(75)} height={hp(35)} />,
      heading: `Welcome to Vizitr! ${`\n`} your Visits at your fingertips`,
    },
    {
      image: <Onbording2 width={wp(75)} height={hp(35)} />,
      heading: 'Manage Your Visit Requests',
      subHeading: `Streamline the Visit Process! Manage Requests and ${`\n`} Approvals with Ease`,
    },
    {
      image: <Onbording3 width={wp(75)} height={hp(35)} />,
      heading: `Secure QR Scanning & ${`\n`}Seamless Visit Invites`,
      subHeading: `Enjoy secure, hassle-free QR scanning—effortless visit management at your fingertips`,
    },
  ];

  const handleContinue = () => {
    // Move to the next page if there is a next page, else navigate to 'CreateAcc'
    if (currentPage < pages.length - 1) {
      pagerRef.current.setPage(currentPage + 1); // Navigate via PagerView
    } else {
      navigation.navigate('CreateAcc');
    }
  };

  const onPageSelected = (e) => {
    // Update the page when the user swipes
    setCurrentPage(e.nativeEvent.position);
    
  };

  const renderPaginationDots = () => {
    return (
      <View
        style={[styles.paginationContainer,{marginTop: hp(12)}]}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: currentPage === index ? '#02AEF1' : COLORS.grayText,
                width: currentPage === index ? wp(6.5) : wp(2),
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{flex: 10, paddingTop: wp(10)}}>
        {/* Skip button */}
        {currentPage !== pages.length - 1 && (
          <CustomButton
            text={'Skip'}
            textStyle={styles.skipBtn}
            containerStyle={{alignSelf: 'flex-end'}}
            onPress={() => navigation.navigate('CreateAcc')}
          />
        )}

        {/* PagerView for swiping */}
        <PagerView
          style={[{height: hp(60), backgroundColor: 'white'}, currentPage === pages.length - 1 && {marginTop: wp(5)}]}
          initialPage={0}
          onPageSelected={onPageSelected}
          
          ref={pagerRef} // Reference to control PagerView programmatically
        >
          {pages.map((page, index) => (
            <View key={index} style={styles.imgContainer}>
              {page.image}
              <Text style={styles.text}>{page.heading}</Text>
              
              {page.subHeading && (
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: wp(3.5),
                    textAlign: 'center',
                    marginTop: hp(3),
                  }}>
                  {page.subHeading}
                </Text>
              )}
            </View>
          ))}
        </PagerView>

        {/* Render Pagination Dots */}
        {renderPaginationDots()}
      </View>

      {/* Continue button */}
      <View style={{flex: 1}}>
        <CustomButton
          text={currentPage === pages.length - 1 ? 'Let’s Get Started' : 'Continue'}
          textStyle={styles.continueButtonText}
          containerStyle={styles.continueButtonContainer}
          onPress={handleContinue}
          pressedRadius={wp(6)}
        />
      </View>
    </View>
  );
};

export default Onboarding;
