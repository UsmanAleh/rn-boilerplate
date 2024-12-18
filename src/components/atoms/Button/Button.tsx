import type { DimensionValue, TextStyle, ViewStyle } from 'react-native';

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  buttonHeight?: DimensionValue;
  buttonStyle?: ViewStyle; // Custom button container styles
  buttonText: string; // Button text
  buttonTextStyle?: TextStyle; // Custom text styles
  buttonWidth?: DimensionValue;
  isGradientButton?: boolean; // Determines the button gradient style
  onPress: () => void; // Action to perform when the button is pressed
};

const Button: React.FC<Props> = ({
  buttonHeight = 55,
  buttonStyle = {},
  buttonText,
  buttonTextStyle = {},
  buttonWidth = '100%',
  isGradientButton = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.button, buttonStyle]}
    >
      <LinearGradient
        colors={isGradientButton ? ['#9A4DFF', '#5C2E99'] : ['#fff', '#fff']}
        end={{ x: 1, y: 0.0001 }}
        start={{ x: 0.2, y: 0.0001 }}
        style={{
          ...styles.gradientButton,
          height: buttonHeight,
          width: buttonWidth,
        }}
      >
        <Text
          style={[
            styles.buttonText,
            { color: isGradientButton ? '#fff' : '#111' },
            buttonTextStyle,
          ]}
        >
          {buttonText}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    width: '80%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  gradientButton: {
    alignItems: 'center',
    borderRadius: 88,
    justifyContent: 'center',
    paddingVertical: 12,
  },
});

export default Button;
