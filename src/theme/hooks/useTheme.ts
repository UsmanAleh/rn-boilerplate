import { useContext } from 'react';

import CustomError from '@/helpers/CustomError';

import { ThemeContext } from '../ThemeProvider/ThemeProvider';

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new CustomError('useTheme must be used within a ThemeProvider');
  }

  return context;
};

export default useTheme;
