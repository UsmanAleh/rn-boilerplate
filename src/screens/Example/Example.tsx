import { useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';
import { useWallet } from '@/hooks/useWallet';

import { AssetByVariant, Skeleton } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';

import RequestStatus from '@/enums/RequestStatus.enum';
import AppLogger from '@/helpers/AppLogger';
import { fetchTodos } from '@/store/Todos/Todo.actions';
import { useAppDispatch, useAppSelector } from '@/store/utils';

function Example() {
  const {
    backgrounds,
    changeTheme,
    components,
    fonts,
    gutters,
    layout,
    variant,
  } = useTheme();

  const { connect, disconnect } = useWallet();

  const { allTodos, error, status } = useAppSelector((state) => state.todos);

  useEffect(() => {
    if (status === RequestStatus.Success) {
      AppLogger.log('Todos:', allTodos);
    } else if (status === RequestStatus.Error) {
      AppLogger.error('Error', error);
    } else {
      AppLogger.info('Status', status);
    }
  }, [allTodos, status, error]);

  const action1 = () => {
    // dispatch(fetchTodos());
    connect();
  };

  const action2 = () => {
    // changeTheme(variant === 'default' ? 'dark' : 'default');
    disconnect();
  };

  return (
    <SafeScreen isError={false} onResetError={() => {}}>
      <ScrollView>
        <View
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            gutters.marginTop_80,
          ]}
        >
          <View
            style={[layout.relative, backgrounds.gray100, components.circle250]}
          />

          <View style={[layout.absolute, gutters.paddingTop_80]}>
            <AssetByVariant
              path={'tom'}
              resizeMode={'contain'}
              style={{ height: 300, width: 300 }}
            />
          </View>
        </View>

        <View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
          <View style={[gutters.marginTop_40]}>
            <Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>
              Welcome on The React Native Boilerplate
            </Text>
            <Text
              style={[fonts.size_16, fonts.gray200, gutters.marginBottom_40]}
            >
              Do you want to discover some features? Just click on one of the
              buttons at the bottom of the screen.
            </Text>
          </View>

          <View
            style={[
              layout.row,
              layout.justifyBetween,
              layout.fullWidth,
              gutters.marginTop_16,
            ]}
          >
            <TouchableOpacity
              onPress={action1}
              style={[
                components.buttonRounded,
                gutters.marginBottom_16,
                gutters.padding_12,
              ]}
              testID="action-button-1"
            >
              <Text>Connect Wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={action2}
              style={[
                components.buttonRounded,
                gutters.marginBottom_16,
                gutters.padding_12,
              ]}
              testID="action-button-2"
            >
              <Text>Disconnect Wallet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default Example;
