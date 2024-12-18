import type { RootScreenProps } from '@/navigation/types';

import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CheckBox } from 'react-native-web';

import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';

import { AssetByVariant, Button, GradientText } from '@/components/atoms';
import { LogoWithTagline } from '@/components/molecules';

import AppLogger from '@/helpers/AppLogger';

const SocialIcon = ({
  onPress,
  path,
  selectedSocialLoginType,
  socialType,
}: {
  onPress: () => void;
  path: string;
  selectedSocialLoginType: string;
  socialType: string;
}) => {
  const isSelected = socialType === selectedSocialLoginType;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.iconContainer}
    >
      <LinearGradient
        colors={isSelected ? ['#9A4DFF', '#5C2E99'] : ['#fff', '#fff']}
        style={{
          ...styles.gradientButton,
          height: 58,
          width: '100%',
        }}
      >
        <AssetByVariant
          path={path}
          resizeMode={'contain'}
          style={{ height: 24, width: 24 }}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

function SignIn({ navigation }: RootScreenProps<Paths.SignIn>) {
  const { colors, fonts, gutters, layout } = useTheme();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(
    Dimensions.get('window').width < 783,
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedSocialLoginType, setSelectedSocialLoginType] =
    useState('Google');

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(Dimensions.get('window').width < 783);
    };

    Dimensions.addEventListener('change', handleResize);

    return () => {
      // remove the resize event
      // Dimensions.removeEventListener('change', handleResize);
    };
  }, []);

  const handleLogin = (socialType: string) => {
    // Handle login logic based on socialTypeF
    setSelectedSocialLoginType(socialType);
    AppLogger.info(`${socialType} login initiated`);
  };

  const handleLegacyEmailLogin = () => {
    // if (!email || !password) {
    //   AppLogger.warn('Email and password are required');
    //   return;
    // }
    // AppLogger.info('Login button clicked with:', { email, password });
    navigation.navigate(Paths.Onboarding);
  };

  return (
    <View style={styles.container}>
      {/* Left Section */}
      {!isSmallScreen && (
        <LinearGradient
          colors={['#9A4DFF', '#5C2E99']}
          style={styles.leftSection}
        >
          <View style={styles.leftContent}>
            <LogoWithTagline
              logoStyle={{ height: 56, width: 222 }}
              taglineStyle={styles.tagline}
            />

            <View style={styles.features}>
              <View style={styles.featureItem}>
                <View style={styles.featureText}>
                  <View style={styles.featureTextTitle}>
                    <AssetByVariant
                      path={'secure'}
                      resizeMode={'contain'}
                      style={{ height: 20, width: 20 }}
                    />
                    <Text style={styles.featureTitle}>Verified Content</Text>
                  </View>
                  <Text style={styles.featureSubTitle}>
                    Blockchain-powered content verification
                  </Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureText}>
                  <View style={styles.featureTextTitle}>
                    <AssetByVariant
                      path={'secure'}
                      resizeMode={'contain'}
                      style={{ height: 20, width: 20 }}
                    />
                    <Text style={styles.featureTitle}>
                      Personal Data Shards
                    </Text>
                  </View>

                  <Text style={styles.featureSubTitle}>
                    Isolated and encrypted data storage
                  </Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureText}>
                  <View style={styles.featureTextTitle}>
                    <AssetByVariant
                      path={'secure'}
                      resizeMode={'contain'}
                      style={{ height: 20, width: 20 }}
                    />
                    <Text style={styles.featureTitle}>
                      Encrypted Transactions
                    </Text>
                  </View>
                  <Text style={styles.featureSubTitle}>
                    End-to-end encryption for all transactions
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <AssetByVariant
            path={'signInArt'}
            resizeMode={'contain'}
            style={styles.signInArt}
          />
        </LinearGradient>
      )}

      {/* Right Section */}
      <View style={styles.rightSection}>
        {isSmallScreen && (
          <View style={{ marginBottom: 20 }}>
            <LogoWithTagline
              logoPath="loot8logo-dark"
              logoStyle={{ height: 56, width: 222 }}
              taglineStyle={{
                ...styles.tagline,
                color: '#111111',
              }}
            />
          </View>
        )}

        <View style={{ marginBottom: 10, width: '74%' }}>
          <GradientText size={32}>{'Sign in to your account'}</GradientText>
        </View>
        {/* Input Fields */}
        <TextInput
          onChangeText={setEmail}
          placeholder="Email Address"
          placeholderTextColor="#A1A1A1"
          style={styles.textInput}
          value={email}
        />
        <TextInput
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#A1A1A1"
          secureTextEntry
          style={styles.textInput}
          value={password}
        />

        {/* Login Button */}
        <Button
          buttonStyle={{ ...styles.gradientButton, marginVertical: 10 }}
          buttonText="Login"
          buttonWidth={'96%'}
          isGradientButton
          onPress={handleLegacyEmailLogin}
        />

        {/* Remember Me / Forgot Password */}
        <View style={styles.row}>
          <View style={{ flexDirection: 'row' }}>
            <CheckBox
              color={'#9A4DFF'}
              disabled={false}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
              value={toggleCheckBox}
            />
            <Text style={styles.rememberMe}>Remember me</Text>
          </View>
          <Text style={styles.forgotPassword}>Forgot Password</Text>
        </View>

        <View style={styles.linesWrap}>
          <View style={styles.line} />
          <Text style={{ ...styles.signInSocialText, marginBottom: 0 }}>
            OR
          </Text>
          <View style={styles.line} />
        </View>

        {/* Social Login */}
        <Text style={styles.signInSocialText}>
          Sign-In to LOOT8 with your social accounts
        </Text>

        {/* Social Icons */}
        <View style={styles.socialIcons}>
          {[
            { path: 'social-icons/google', socialType: 'Google' },
            { path: 'social-icons/discord', socialType: 'Discord' },
            { path: 'social-icons/fb', socialType: 'Facebook' },
            { path: 'social-icons/x', socialType: 'Twitter' },
            { path: 'social-icons/apple', socialType: 'Apple' },
            { path: 'social-icons/github', socialType: 'GitHub' },
            { path: 'social-icons/linkedin', socialType: 'LinkedIn' },
            { path: 'social-icons/twitch', socialType: 'Twitch' },
          ].map(({ path, socialType }) => (
            <SocialIcon
              key={path}
              onPress={() => handleLogin(socialType)}
              path={path}
              selectedSocialLoginType={selectedSocialLoginType}
              socialType={socialType}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    flexDirection: 'row',
  },
  featureItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
  features: {
    marginTop: 40,
    width: '74%',
  },
  featureSubTitle: {
    color: '#D8C8FF',
    fontSize: 12,
    marginLeft: 30,
    marginTop: 8,
  },
  featureText: {
    marginLeft: 10,
  },
  featureTextTitle: {
    flexDirection: 'row',
    textAlign: 'center',
  },
  featureTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 17,
    marginLeft: 10,
  },
  forgotPassword: {
    color: 'grey',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '400',
  },
  gradientButton: {
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    borderColor: '#9A4DFF',
    borderRadius: 8,
    borderWidth: 2.6,
    // height: 62,
    justifyContent: 'center',
    marginBottom: 14,
    marginHorizontal: 10,
    width: 102,
  },
  leftContent: {
    alignItems: 'center',
    flex: 0.7,
    justifyContent: 'center',
    marginTop: 50,
  },
  leftSection: {
    flex: 1,
    padding: 30,
  },
  line: { backgroundColor: '#00000020', height: 1, width: '45%' },
  linesWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 30,
    width: '76%',
  },
  rememberMe: {
    color: '#333333',
    fontSize: 12,
    marginLeft: 10,
  },
  rightSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '76%',
  },
  signInArt: {
    bottom: 0,
    height: 240,
    left: 0,
    position: 'absolute',
    width: 290,
  },
  signInSocialText: {
    color: '#A1A1A1',
    fontSize: 14,
    marginBottom: 30,
    marginHorizontal: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '76%',
  },
  tagline: {
    color: '#FFFFFF',
    fontSize: 17,
    // fontWeight: '500',
    lineHeight: 15,
    marginVertical: 16,
    textAlign: 'center',
  },
  textInput: {
    backgroundColor: '#EFEFEF',
    borderColor: '#C0C0C0',
    borderRadius: 30,
    borderWidth: 1,
    height: 54,
    marginVertical: 10,
    paddingHorizontal: 12,
    width: '76%',
  },
});

export default SignIn;
