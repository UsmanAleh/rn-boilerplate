import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';

import { AssetByVariant, Skeleton } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';

function Example() {
  const {
    backgrounds,
    branding,
    changeTheme,
    components,
    fetchUserThemeAndUpdate,
    fonts,
    gutters,
    layout,
    variant,
  } = useTheme();

  const onChangeTheme = () => {
    changeTheme(variant === 'default' ? 'dark' : 'default');
  };

  const onChangeThemeCustom = () => {
    fetchUserThemeAndUpdate('1');
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
            style={[
              layout.relative,
              backgrounds.gray100,
              { height: 120, width: 320 },
            ]}
          />
          <View style={[layout.absolute]}>
            {variant === 'default' ? (
              <AssetByVariant
                path={'tom'}
                resizeMode={'contain'}
                style={{ height: 300, width: 300 }}
              />
            ) : (
              <Image
                source={{ uri: branding?.logo }}
                style={{ height: 100, width: 300 }}
                testID="variant-image"
              />
            )}
          </View>
        </View>

        <View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
          <View style={[gutters.marginTop_40]}>
            <Text
              style={[fonts.size_40, fonts.gray800, fonts.primaryColor, fonts.bold]}
            >
              {branding?.textLogo}
            </Text>
            <Text
              style={[fonts.size_16, fonts.gray200, gutters.marginBottom_40]}
            >
              Do you want to discover some features? Just click on one of the
              three buttons at the bottom of the screen. The first allows you to
              call a REST API. The second lets you change the theme color. And
              the third allows you to change the language.
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
            <Skeleton
              height={64}
              loading={false}
              style={{ borderRadius: components.buttonCircle.borderRadius }}
              width={64}
            >
              <TouchableOpacity
                onPress={onChangeThemeCustom}
                style={[components.buttonCircle, gutters.marginBottom_16]}
                testID="fetch-user-button"
              >
                <AssetByVariant
                  path={'tom'}
                  style={{ height: 24, width: 24 }}
                />
              </TouchableOpacity>
            </Skeleton>

            <TouchableOpacity
              onPress={onChangeTheme}
              style={[components.buttonCircle, gutters.marginBottom_16]}
              testID="change-theme-button"
            >
              <AssetByVariant
                path={'tom'}
                resizeMode={'contain'}
                style={{ height: 24, width: 24 }}
              />
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={toggleLanguage}
              style={[components.buttonCircle, gutters.marginBottom_16]}
              testID="change-language-button"
            >
              <AssetByVariant
                path={'tom'}
                resizeMode={'contain'}
                style={{ height: 24, width: 24 }}
              />
            </TouchableOpacity> */}
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default Example;
