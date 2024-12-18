import type {
  BrandingConfiguration,
  ThemeConfiguration,
} from '@/theme/types/config';

import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const enum Variant {
  CUSTOM = 'custom',
  DARK = 'dark',
  DEFAULT = 'default',
}

const colorsLight = {
  gray100: '#DFDFDF',
  gray200: '#A1A1A1',
  gray400: '#4D4D4D',
  gray50: '#EFEFEF',
  gray800: '#303030',
  primaryColor: '#0aff69',
  purple100: '#E1E1EF',
  purple50: '#1B1A23',
  purple500: '#44427D',
  red500: '#C13333',
  skeleton: '#A1A1A1',
} as const;

const colorsDark = {
  gray100: '#000000',
  gray200: '#BABABA',
  gray400: '#969696',
  gray50: '#EFEFEF',
  gray800: '#E0E0E0',
  purple100: '#252732',
  purple50: '#1B1A23',
  purple500: '#A6A4F0',
  red500: '#C13333',
  skeleton: '#303030',
} as const;

const sizes = [12, 16, 24, 32, 40, 80] as const;

// Define branding configurations for light and dark themes.
const brandingLight: BrandingConfiguration = {
  // fontFamily: 'Roboto-Regular',
  logo: require('@/theme/assets/images/tom.png'),
  textLogo: 'DEFAULT USER THEME',
  // primaryColor: colorsLight.primaryColor,
  // secondaryColor: colorsLight.purple500,
} as const;

const brandingDark: BrandingConfiguration = {
  // fontFamily: 'Roboto-Bold',
  logo: require('@/theme/assets/images/dark/tom.png'),
  textLogo: 'DEFAULT USER DARK THEME',
  // primaryColor: colorsDark.purple500,
  // secondaryColor: colorsDark.red500,
} as const;

// Default theme configuration
export const config = {
  backgrounds: colorsLight,
  borders: {
    colors: colorsLight,
    radius: [4, 16],
    widths: [1, 2],
  },
  branding: brandingLight,
  colors: colorsLight,
  fonts: {
    colors: colorsLight,
    sizes,
    // fontFamily: 'Roboto-Regular',
  },
  gutters: sizes,
  navigationColors: {
    ...DefaultTheme.colors,
    background: colorsLight.gray50,
    card: colorsLight.gray50,
  },
  variants: {
    custom: {
      backgrounds: colorsLight,
      borders: {
        colors: colorsLight,
      },
      branding: brandingLight,
      colors: colorsLight,
      fonts: {
        colors: colorsLight,
        // fontFamily: 'Roboto-Regular',
      },
      navigationColors: {
        ...DefaultTheme.colors,
        background: colorsLight.gray50,
        card: colorsLight.gray50,
      },
    },
    dark: {
      backgrounds: colorsDark,
      borders: {
        colors: colorsDark,
      },
      branding: brandingDark,
      colors: colorsDark,
      fonts: {
        colors: colorsDark,
        // fontFamily: 'Roboto-Regular',
      },
      navigationColors: {
        ...DarkTheme.colors,
        background: colorsDark.purple50,
        card: colorsDark.purple50,
      },
    },
  },
} as const satisfies ThemeConfiguration;
