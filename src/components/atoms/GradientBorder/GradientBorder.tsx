import type { ViewStyle } from 'react-native';

import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  children: React.ReactNode;
  isGradientBorder?: boolean;
  style?: ViewStyle;
};

const GradientBorder: React.FC<Props> = ({
  children,
  isGradientBorder = true,
  style = {},
}) => {
  return (
    <LinearGradient
      colors={isGradientBorder ? ['#9A4DFF', '#5C2E99'] : ['#fff', '#fff']}
      end={{ x: 1, y: 0.0001 }}
      start={{ x: 0.2, y: 0.0001 }}
      style={[styles.gradientBorder, style]}
    >
      <View style={[styles.innerContainer, style, { padding: 10 }]}>
        {children}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBorder: {
    borderRadius: 50,
    margin: 2,
    overflow: 'hidden',
    padding: 1,
    position: 'relative',
  },
  innerContainer: {
    backgroundColor: '#fff',
    borderRadius: 50,
  },
});
export default GradientBorder;
