/* eslint-disable unicorn/prefer-number-properties */
import type { ThemeConfiguration } from '@/theme/types/config';

import { config, mergeTheme } from '@/theme/_config';

// Mocked API data for user-specific themes
const mockUserThemes = {
  1: {
    backgrounds: {
      primary: '#F0F0F0',
      secondary: '#DADADA',
    },
    branding: {
      logo: 'https://dummyimage.com/300x100/000/fff&text=User+1+Logo',
      textLogo: 'USER ONE (1)',
    },
    fonts: {
      colors: {
        gray100: '#FFFFFF',
        primaryColor: 'red',
        purple500: '#FF5733',
        red500: '#FF0000',
      },
    },
  },
  2: {
    backgrounds: {
      primary: '#E8E8E8',
      secondary: '#C2C2C2',
    },
    branding: {
      logo: 'https://dummyimage.com/300x100/000/fff&text=User+2+Logo',
      textLogo: 'USER TWO (2)',
    },
    fonts: {
      colors: {
        gray200: '#CCCCCC',
        primaryColor: 'pink',
        purple100: '#123456',
        skeleton: '#666666',
      },
    },
  },
  3: {
    backgrounds: {
      primary: '#FFF8E1',
      secondary: '#FFD180',
    },
    branding: {
      logo: 'https://dummyimage.com/300x100/000/fff&text=User+3+Logo',
      textLogo: 'USER THREE (3)',
    },
    fonts: {
      colors: {
        gray400: '#FAFAFA',
        primaryColor: 'green',
        purple50: '#654321',
        purple500: '#AA00AA',
      },
    },
  },
  4: {
    backgrounds: {
      primary: '#303030',
      secondary: '#424242',
    },
    branding: {
      logo: 'https://dummyimage.com/300x100/000/fff&text=User+4+Logo',
      textLogo: 'USER THREE (4)',
    },
    fonts: {
      colors: {
        gray800: '#121212',
        primaryColor: 'blue',
        purple100: '#009688',
        red500: '#FF5722',
      },
    },
  },
};

/**
 * Simulates an API call to fetch user-specific theme preferences.
 * @param userId - The ID of the user whose theme preferences are being fetched.
 * @returns A Promise resolving to the user-specific theme preferences.
 */
const mockApiCall = (userId: string): Promise<Record<string, string>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // @ts-ignore
      resolve(mockUserThemes[parseInt(userId, 10)] || {});
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
    //   throw new Error(
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
    console.error('Error fetching user theme:', error);
    return config; // Fallback to default
  }
};
