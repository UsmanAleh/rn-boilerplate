import type { TextStyle } from 'react-native';

import { Platform } from 'react-native';

type Props = {
  children: string;
  size?: number;
  style?: TextStyle;
};

const GradientText = ({ children, size = 32, style = {} }: Props) => {
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
            ...(style as object),
          }}
        >
          {letter}
        </span>
      ));

    return <div>{gradientLetters}</div>;
  }
  return null;
};

export default GradientText;
