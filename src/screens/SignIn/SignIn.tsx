// import CheckBox from '@react-native-community/checkbox';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
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
import type { RootScreenProps } from '@/navigation/types';

import { AssetByVariant } from '@/components/atoms';

// import Google from '../../theme/assets/icons/apple.svg';

const GradientText = ({
  children,
  size,
}: {
  children: string;
  size: number;
}) => {
  if (Platform.OS === 'web') {
    const gradientLetters = children
      .split('')
      .map((letter: string, index: number) => (
        <span
          key={index}
          style={{
            background: `-webkit-linear-gradient(top, ${'#9A4DFF'}, ${'#5C2E99'})`,
            fontFamily: 'sans-serif',
            fontSize: size,
            fontWeight: '800',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {letter}
        </span>
      ));

    return <div>{gradientLetters}</div>;
  }
  return null;
};

function SignIn({ navigation }: RootScreenProps<Paths.SignIn>) {
  const { colors, fonts, gutters, layout } = useTheme();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(
    Dimensions.get('window').width < 783,
  );

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

  const handleLogin = () => {
    // eslint-disable-next-line no-console
    console.log('Login button clicked');
    navigation.navigate(Paths.PlanSelection);
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
            <AssetByVariant
              path={'loot8logo'}
              resizeMode={'contain'}
              style={{ height: 56, width: 222 }}
            />
             {/* <svg
              className="bi bi-google"
              fill="currentColor"
              height="36"
              viewBox="0 0 36 36"
              width="36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.6576 28.2105C19.0596 29.7217 17.3148 29.4831 15.6353 28.7673C13.8579 28.0356 12.2273 28.0037 10.352 28.7673C8.00395 29.7535 6.76468 29.4672 5.36234 28.2105C-2.59511 20.2091 -1.42106 8.02412 7.6126 7.57872C9.81394 7.69007 11.3467 8.75586 12.6349 8.85131C14.5591 8.46953 16.4017 7.37192 18.4563 7.51509C20.9185 7.70598 22.7774 8.66042 24.0004 10.3784C18.9128 13.3531 20.1195 19.891 24.7831 21.7203C23.8536 24.1064 22.647 26.4766 20.6413 28.2264L20.6576 28.2105ZM12.4719 7.48328C12.2273 3.93594 15.1787 1.00899 18.5704 0.722656C19.0433 4.82675 14.7547 7.88096 12.4719 7.48328Z"
                fill="#6B7280"
              />
            </svg> */}
            <Text style={styles.tagline}>Secure, Verified, Connected</Text>

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
            style={{
              bottom: 0,
              height: 240,
              left: 0,
              position: 'absolute',
              width: 290,
            }}
          />
        </LinearGradient>
      )}

      {/* Right Section */}
      <View style={styles.rightSection}>
        {isSmallScreen && (
          <View style={{ marginBottom: 20 }}>
            <AssetByVariant
              path={'loot8logo-dark'}
              resizeMode={'contain'}
              style={{ height: 56, width: 222 }}
            />
            <Text
              style={{
                ...styles.tagline,
                color: '#111111',
              }}
            >
              Secure, Verified, Connected
            </Text>
          </View>
        )}

        <View style={{ marginBottom: 10, width: '74%' }}>
          <GradientText size={32}>{'Sign in to your account'}</GradientText>
        </View>
        {/* Input Fields */}
        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#A1A1A1"
          style={styles.textInput}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#A1A1A1"
          secureTextEntry
          style={styles.textInput}
        />

        {/* Login Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleLogin}
          style={styles.loginButton}
        >
          <LinearGradient
            colors={['#9A4DFF', '#5C2E99']}
            style={{ ...styles.gradientButton, borderRadius: 30 }}
          >
            <Text style={styles.loginText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

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

        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginVertical: 30,
            width: '76%',
          }}
        >
          <View
            style={{ backgroundColor: '#00000020', height: 1, width: '45%' }}
          />
          <Text style={{ ...styles.signInSocialText, marginBottom: 0 }}>
            OR
          </Text>
          <View
            style={{ backgroundColor: '#00000020', height: 1, width: '45%' }}
          />
        </View>

        {/* Social Login */}
        <Text style={styles.signInSocialText}>
          Sign-In to LOOT8 with your social accounts
        </Text>

        {/* Social Icons */}
        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.iconContainer}>
            {/* <Google height={50} width={50} /> */}
            <LinearGradient
              colors={['#9A4DFF', '#5C2E99']}
              style={{
                ...styles.gradientButton,
                height: 62,
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <AssetByVariant
                path={'social-icons/google'}
                resizeMode={'contain'}
                style={{ height: 24, width: 24 }}
              />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <AssetByVariant
              path={'social-icons/discord'}
              resizeMode={'contain'}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <AssetByVariant
              path={'social-icons/fb'}
              resizeMode={'contain'}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <AssetByVariant
              path={'social-icons/x'}
              resizeMode={'contain'}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <AssetByVariant
              path={'social-icons/apple'}
              resizeMode={'contain'}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <AssetByVariant
              path={'social-icons/github'}
              resizeMode={'contain'}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <AssetByVariant
              path={'social-icons/linkedin'}
              resizeMode={'contain'}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <AssetByVariant
              path={'social-icons/twitch'}
              resizeMode={'contain'}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
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
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    borderColor: '#9A4DFF',
    borderRadius: 8,
    borderWidth: 2.6,
    height: 62,
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
  loginButton: {
    borderRadius: 30,
    height: 54,
    marginVertical: 10,
    width: '76%',
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  logoText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
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
  signInSocialText: {
    color: '#A1A1A1',
    fontSize: 14,
    marginBottom: 30,
    marginHorizontal: 10,
  },
  signInTitle: {
    color: '#333333',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
