import type { RootScreenProps } from '@/navigation/types';

import { useEffect } from 'react';
import { View } from 'react-native';

import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';

import { AssetByVariant } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';

function Startup({ navigation }: RootScreenProps<Paths.Startup>) {
  const { layout } = useTheme();

  useEffect(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: Paths.Example }],
    });
  }, [navigation]);

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
        ]}
      >
        <AssetByVariant
          path={'tom'}
          resizeMode={'contain'}
          style={{ height: 300, width: 300 }}
        />
      </View>
    </SafeScreen>
  );
}

export default Startup;
