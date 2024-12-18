import type {
  FulfilledThemeConfiguration,
  MergedTheme,
  ThemeConfiguration,
} from '@/theme/types/config';

import { config } from '@/theme/_config';

import AppLogger from '@/helpers/AppLogger';

// Mocked API data for user-specific themes
const mockUserThemes: Record<number, FulfilledThemeConfiguration> = {
  1: {
    backgrounds: {
      primary: '#F0F0F0',
      secondary: '#DADADA',
    },
    borders: config.borders,
    branding: {
      logo: 'https://dummyimage.com/300x100/000/fff&text=User+1+Logo',
      textLogo: 'USER ONE (1)',
    },
    colors: config.colors,
    fonts: {
      colors: {
        gradientColorOne: 'red',
        gradientColorTwo: 'blue',
        primaryColor: 'red',
        secondaryColor: 'blue',
      },
      sizes: [12, 16, 24, 32, 40, 80],
    },
    gutters: config.gutters,
    navigationColors: config.navigationColors,
  },
  2: {
    backgrounds: {
      primary: '#E8E8E8',
      secondary: '#C2C2C2',
    },
    borders: config.borders,
    branding: {
      logo: 'https://dummyimage.com/300x100/000/fff&text=User+2+Logo',
      textLogo: 'USER TWO (2)',
    },
    colors: config.colors,
    fonts: {
      colors: {
        gradientColorOne: '#CCCCCC',
        gradientColorTwo: '#123456',
        primaryColor: 'CCCCCC',
        secondaryColor: '666666',
      },
      sizes: [12, 16, 24, 32, 40, 80],
    },
    gutters: config.gutters,
    navigationColors: config.navigationColors,
  },
  3: {
    backgrounds: {
      primary: '#FFF8E1',
      secondary: '#FFD180',
    },
    borders: config.borders,
    branding: {
      logo: 'https://dummyimage.com/300x100/000/fff&text=User+3+Logo',
      textLogo: 'USER THREE (3)',
    },
    colors: config.colors,
    fonts: {
      colors: {
        gradientColorOne: '#FAFAFA',
        gradientColorTwo: '#654321',
        primaryColor: 'AA00AA',
        secondaryColor: '654321',
      },
      sizes: [12, 16, 24, 32, 40, 80],
    },
    gutters: config.gutters,
    navigationColors: config.navigationColors,
  },
  4: {
    backgrounds: {
      primary: '#303030',
      secondary: '#424242',
    },
    borders: config.borders,
    branding: {
      logo: 'https://dummyimage.com/300x100/000/fff&text=User+4+Logo',
      textLogo: 'USER THREE (4)',
    },
    colors: config.colors,
    fonts: {
      colors: {
        gradientColorOne: '#121212',
        gradientColorTwo: '#009688',
        primaryColor: '009688',
        secondaryColor: 'FF5722',
      },
      sizes: [12, 16, 24, 32, 40, 80],
    },
    gutters: config.gutters,
    navigationColors: config.navigationColors,
  },
};

/**
 * Simulates an API call to fetch user-specific theme preferences.
 * @param userId - The ID of the user whose theme preferences are being fetched.
 * @returns A Promise resolving to the user-specific theme preferences.
 */
const mockApiCall = (userId: string): Promise<FulfilledThemeConfiguration> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const parsedUserId = Number.parseInt(userId, 10);
      resolve(
        mockUserThemes[parsedUserId] || {
          backgrounds: { primary: '', secondary: '' },
          branding: { logo: '', textLogo: '' },
          fonts: { colors: {}, sizes: [] },
        },
      );
    }, 500); // Simulate a 500ms network delay
  });
};

/**
 * Fetches the user's theme preferences from an external API and merges them with the default theme.
 * @param userId - The ID of the user whose theme preferences are being fetched.
 * @returns The merged theme configuration.
 */
export const fetchUserTheme = async (
  userId: string,
): Promise<ThemeConfiguration> => {
  try {
    // const response = await fetch(`https://api.example.com/themes/${userId}`);

    // if (!response.ok) {
    //   throw new CustomError(
    //     `Failed to fetch theme: ${response.status} ${response.statusText}`,
    //   );
    // }

    // Simulating a mock API call
    const userPreferences = await mockApiCall(userId);

    // Call changeTheme to update the context with the new theme
    // changeTheme(userPreferences?.variant || 'default');

    // Merge fetched preferences with default theme
    // changeTheme('custom' as Variant);
    return mergeTheme(userPreferences);
  } catch (error) {
    // eslint-disable-next-line no-console
    AppLogger.error('Error fetching user theme:', error);
    return config; // Fallback to default
  }
};

// Function to merge user preferences with default
export const mergeTheme = async (
  userPreferences: Partial<ThemeConfiguration>,
): Promise<MergedTheme> => {
  const { backgrounds = {}, branding = {}, colors = {} } = userPreferences;

  const mergedTheme: MergedTheme = {
    ...config,
    backgrounds: {
      ...config.backgrounds,
      ...backgrounds,
    },
    branding: {
      ...config.branding,
      ...branding,
    },
    colors: {
      ...config.colors,
      ...colors,
    },
    fonts: {
      ...config.fonts,
      colors: {
        ...userPreferences?.fonts?.colors,
      },
      sizes: config.fonts.sizes,
    },
  };
  return mergedTheme;
};
