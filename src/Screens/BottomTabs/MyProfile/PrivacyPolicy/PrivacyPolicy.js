import {ScrollView, StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import ArrowLeft from '../../../../assets/Svgs/arrowLeft.svg';
import CustomHeader from '../../../../Components/CustomHeader/CustomHeader';
import { styles } from './Styles';

const PrivacyPolicy = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <CustomHeader
        leftSvg={<ArrowLeft />}
        leftOnpress={() => navigation.goBack()}
        heading={'Privacy Policy'}
        headingStyle={styles.heading}
        containerStyle={{alignItems: 'center'}}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <Text style={styles.policy}>
          Welcome to Visitor App. We are committed to protecting your privacy
          and ensuring that your personal information is handled in a safe and
          responsible manner. This Privacy Policy outlines how we collect, use,
          and protect your information when you use our app. {`\n`} {`\n`}
          When you use our app, we may collect personal information that you
          provide directly, such as your name, email address, phone number, and
          any other details you choose to share through forms or messages. If
          you register for an account, we may request additional information
          including your name, company name, address, email address, and
          telephone number. We also collect information about your interactions
          with the app, including the pages you visit, the features you use, and
          the dates and times of your visits.{`\n`}
          {`\n`}The information we collect is used to provide and maintain our
          services, improve your experience with the app by personalizing
          content and recommendations, and communicate with you, including
          responding to your inquiries and sending notifications. We also
          analyze usage trends to enhance the app and our services.{`\n`}
          {`\n`}Like many other applications, we use cookies and similar
          tracking technologies to improve your experience. Cookies are small
          data files placed on your device to store information such as your
          preferences and usage patterns. We may also use web beacons to monitor
          user activity and track the effectiveness of our advertising efforts.
          {`\n`}
          {`\n`}Our app may contain links to third-party websites and services.
          These third parties may use cookies or other tracking technologies to
          collect information about you, and we do not have control over these
          technologies. We are not responsible for their privacy practices. We
          may work with third-party ad networks that use cookies, JavaScript, or
          web beacons to deliver targeted advertisements and measure ad
          effectiveness. They may automatically receive your IP address and
          other data when you interact with their ads.{`\n`}
          {`\n`}
          We implement appropriate security measures to protect your personal
          information from unauthorized access, alteration, disclosure, or
          destruction. However, please be aware that no security measures are
          100% effective, and we cannot guarantee absolute security.{`\n`}
          {`\n`}You have the option to opt-out of receiving promotional emails
          from us by following the instructions provided in those emails. You
          can also manage cookies through your browser settings, but please note
          that disabling cookies may affect your ability to use certain features
          of the app.{`\n`}
          {`\n`}We may update this Privacy Policy periodically. Any changes will
          be posted on this page with an updated effective date. We encourage
          you to review this policy regularly to stay informed about how we are
          protecting your information.{`\n`}
          {`\n`}If you have any questions or concerns about this Privacy Policy
          or our practices, please contact us at <Text style={{color: 'blue'}} >support@visitorapp.com </Text>
          or at our company address.
        </Text>
      </ScrollView>
      {/* <View style={{marginTop: wp(2)}} >
          <CustomButton
            containerStyle={[styles.btn, {backgroundColor: COLORS.primary}]}
            text={'Accept'}
            textStyle={[styles.btnText, {color: COLORS.white}]}
            // onPress={()=> navigation.navigate('signup')}
            pressedRadius={wp(3)}
          />
        </View> */}
    </View>
  );
};

export default PrivacyPolicy;


