import {ScrollView, StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import ArrowLeft from '../../../../assets/Svgs/arrowLeft.svg';
import CustomHeader from '../../../../Components/CustomHeader/CustomHeader';
import { styles } from '../PrivacyPolicy/Styles';

const TermsCondition = ({navigation}) => {
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
        heading={'Terms and Conditions '}
        headingStyle={styles.heading}
        containerStyle={{alignItems: 'center'}}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <Text style={styles.policy}>
          Welcome to Visitor App. By accessing or using our application, you
          agree to comply with and be bound by the following Terms and
          Conditions. If you do not agree with these terms, please do not use
          the app.{`\n`} {`\n`}
          Visitor App is provided for your personal use and enjoyment. You are
          responsible for ensuring that your use of the app complies with all
          applicable laws and regulations. You agree not to use the app for any
          unlawful or prohibited purpose.{`\n`}
          {`\n`}You may be required to create an account to access certain
          features of the app. When you register, you agree to provide accurate,
          current, and complete information and to update it as necessary to
          keep it accurate. You are responsible for maintaining the
          confidentiality of your account credentials and for all activities
          that occur under your account.{`\n`}
          {`\n`}We reserve the right to modify, suspend, or terminate the app or
          any part of it at any time without notice. We may also update these
          Terms and Conditions from time to time. Any changes will be effective
          when posted on this page, and your continued use of the app
          constitutes acceptance of those changes.
          {`\n`}
          {`\n`}You agree not to engage in any activity that interferes with or
          disrupts the app or its servers, including but not limited to,
          introducing viruses, worms, or other malicious code. You also agree
          not to attempt to gain unauthorized access to any part of the app or
          its systems.{`\n`}
          {`\n`}
          The app may contain links to third-party websites or services. These
          links are provided for your convenience, and we are not responsible
          for the content or practices of these third parties. Your use of
          third-party websites is at your own risk.{`\n`}
          {`\n`}We make no warranties or representations about the accuracy or
          completeness of the content provided in the app. The app is provided
          "as is" and "as available," and we disclaim all warranties, whether
          express or implied, including but not limited to implied warranties of
          merchantability or fitness for a particular purpose.{`\n`}
          {`\n`}We may update this Privacy Policy periodically. Any changes will
          be posted on this page with an updated effective date. We encourage
          you to review this policy regularly to stay informed about how we are
          protecting your information.{`\n`}
          {`\n`}If you have any questions or concerns about this Privacy Policy
          or our practices, please contact us at{' '}
          <Text style={{color: 'blue'}}>support@visitorapp.com </Text>
          or at our company address.
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsCondition;

