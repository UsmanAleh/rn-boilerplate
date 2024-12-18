import type { TextStyle, ViewStyle } from 'react-native';

import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { AssetByVariant } from '@/components/atoms';

type Props = {
  logoPath?: string; // Path for the logo variant
  logoStyle?: ViewStyle; // Style for the logo
  tagline?: string; // The tagline text
  taglineStyle?: TextStyle; // Style for the tagline text
};

const LogoWithTagline: React.FC<Props> = ({
  logoPath = 'loot8logo',
  logoStyle = {},
  tagline = 'Secure, Verified, Connected',
  taglineStyle = {},
}) => {
  return (
    <>
      <AssetByVariant
        path={logoPath}
        resizeMode="contain"
        style={[styles.logo, { ...logoStyle, overflow: 'hidden' }]}
      />
      <Text style={[styles.tagline, taglineStyle]}>{tagline}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 34,
    width: 132,
  },
  tagline: {
    color: '#111111',
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
  },
});

export default LogoWithTagline;
