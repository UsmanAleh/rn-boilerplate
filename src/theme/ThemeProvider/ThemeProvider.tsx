import type { PropsWithChildren } from 'react';
import type {
  FulfilledThemeConfiguration,
  Variant,
} from '@/theme/types/config';
import type { ComponentTheme, Theme } from '@/theme/types/theme';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  generateBackgrounds,
  staticBackgroundStyles,
} from '@/theme/backgrounds';
import {
  generateBorderColors,
  generateBorderRadius,
  generateBorderWidths,
  staticBorderStyles,
} from '@/theme/borders';
import componentsGenerator from '@/theme/components';
import {
  generateFontColors,
  generateFontSizes,
  staticFontStyles,
} from '@/theme/fonts';
import { generateGutters, staticGutterStyles } from '@/theme/gutters';
import layout from '@/theme/layout';
import generateConfig from '@/theme/ThemeProvider/generateConfig';

import AsyncStorageKeys from '@/enums/asyncStorage.enum';
import { fetchUserTheme } from '@/helpers/themeHelper';

type Context = {
  // eslint-disable-next-line no-unused-vars
  changeTheme: (variant: Variant) => void;
} & Theme;

export const ThemeContext = createContext<Context | undefined>(undefined);

function ThemeProvider({ children = false }: PropsWithChildren) {
  const { getItem, setItem } = useAsyncStorage(AsyncStorageKeys.Theme);

  // Current theme variant
  const [variant, setVariant] = useState<Variant>('default');
  const [mergedConfig, setMergedConfig] =
    useState<FulfilledThemeConfiguration>();

  // Initialize theme at default if not defined
  useEffect(() => {
    async function initializeTheme() {
      const config = await getItem();
      if (!config) {
        await setItem('default');
        setVariant('default');
      }
    }
    initializeTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeTheme = useCallback(async (nextVariant: Variant) => {
    setVariant(nextVariant);
    await setItem(nextVariant);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Flatten config with current variant
  const fullConfig = useMemo(() => {
    return generateConfig(variant) satisfies FulfilledThemeConfiguration;
  }, [variant]);

  const fonts = useMemo(() => {
    return {
      ...generateFontSizes(),
      ...generateFontColors(fullConfig),
      // @ts-ignore
      ...(mergedConfig ? generateFontColors(mergedConfig) : {}),
      ...staticFontStyles,
    };
  }, [fullConfig, mergedConfig]);

  const backgrounds = useMemo(() => {
    return {
      ...generateBackgrounds(fullConfig),
      ...staticBackgroundStyles,
    };
  }, [fullConfig]);

  const gutters = useMemo(() => {
    return {
      ...generateGutters(fullConfig),
      ...staticGutterStyles,
    };
  }, [fullConfig]);

  const branding = useMemo(() => {
    return {
      ...fullConfig.branding,
      ...mergedConfig?.branding,
    };
  }, [fullConfig, mergedConfig]);

  const borders = useMemo(() => {
    return {
      ...generateBorderColors(fullConfig),
      ...generateBorderRadius(),
      ...generateBorderWidths(),
      ...staticBorderStyles,
    };
  }, [fullConfig]);

  const navigationTheme = useMemo(() => {
    return {
      colors: fullConfig.navigationColors,
      dark: variant === 'dark',
    };
  }, [variant, fullConfig.navigationColors]);

  const fetchUserThemeAndUpdate = useCallback(
    async (userId: string) => {
      try {
        const userTheme = await fetchUserTheme(userId);
        if (userTheme) {
          const mergedUserTheme = generateConfig('custom', userTheme);
          setMergedConfig(mergedUserTheme);
          changeTheme('custom');
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching and applying user theme:', error);
      }
    },
    [changeTheme],
  );

  const theme = useMemo(() => {
    return {
      backgrounds,
      borders,
      branding,
      colors: { ...fullConfig.colors, ...mergedConfig?.fonts },
      fetchUserThemeAndUpdate,
      fonts: { ...fonts, ...mergedConfig?.fonts },
      gutters,
      layout,
      variant,
    } satisfies ComponentTheme;
  }, [
    backgrounds,
    borders,
    branding,
    fullConfig.colors,
    fonts,
    gutters,
    variant,
    mergedConfig,
    fetchUserThemeAndUpdate,
  ]);

  const components = useMemo(() => {
    return componentsGenerator(theme);
  }, [theme]);

  const value = useMemo(() => {
    return { ...theme, changeTheme, components, navigationTheme };
  }, [theme, components, navigationTheme, changeTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
