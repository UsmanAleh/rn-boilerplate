import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeScreen } from '@/components/templates';
import { useTheme } from '@/theme';

function SignIn() {
  const { colors, gutters } = useTheme(); // Use theme for colors and gutters
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleLogin = () => {
    // Handle Google login
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login
  };

  const handleSignIn = () => {
    // Handle sign-in logic
  };

  return (
    <SafeScreen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        
        <TextInput
          onChangeText={setEmail}
          placeholder="Email"
          style={[styles.input, gutters.marginBottom_16]}
          value={email}
        />
        
        <TextInput
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          style={[styles.input, gutters.marginBottom_16]}
          value={password}
        />

        <TouchableOpacity
          onPress={handleSignIn}
          style={[styles.button, gutters.marginBottom_16]}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity
            onPress={handleGoogleLogin}
            style={styles.socialButton}
          >
            <Text style={styles.socialButtonText}>Login with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleFacebookLogin}
            style={styles.socialButton}
          >
            <Text style={styles.socialButtonText}>Login with Facebook</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  socialButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  socialButtonText: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default SignIn;
