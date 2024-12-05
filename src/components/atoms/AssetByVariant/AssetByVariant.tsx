import type { ImageProps } from 'react-native';

import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { z } from 'zod';

import { useTheme } from '@/theme';
import getAssetsContext from '@/theme/assets/getAssetsContext';

import AppLogger from '@/helpers/AppLogger';

type Props = {
  extension?: string;
  path: string;
} & Omit<ImageProps, 'source'>;

const images = getAssetsContext('images');

function AssetByVariant({ extension = 'png', path, ...props }: Props) {
  const [image, setImage] = useState<string>();
  const { variant } = useTheme();

  useEffect(() => {
    try {
      const defaultSource = z
        .custom<{ default: string }>()
        .parse(images(`./${path}.${extension}`));

      if (variant === 'default') {
        setImage(defaultSource.default);
        return;
      }

      try {
        const fetchedModule = z
          .custom<string>()
          .parse(images(`./${variant}/${path}.${extension}`));
        setImage(fetchedModule);
      } catch (error) {
        // eslint-disable-next-line no-console
        AppLogger.warn(
          `Couldn't load the image: ${path}.${extension} for the variant ${variant}, Fallback to default`,
          error,
        );
        setImage(defaultSource.default);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      AppLogger.error(`Couldn't load the image: ${path}`, error);
    }
  }, [variant, extension, path]);

  return (
    image && <Image source={{ uri: image }} testID="variant-image" {...props} />
  );
}

export default AssetByVariant;
