import type { DimensionValue, ViewStyle } from 'react-native';

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { AssetByVariant, Button } from '@/components/atoms';

type Feature = {
  iconPath?: string; // Path for the feature's icon (optional)
  text: string;
};

type Props = {
  buttonText: string; // Text for the call-to-action button
  cardWidth: DimensionValue;
  description: string; // Description of the plan
  features: Feature[]; // List of features included in the plan
  iconPath: string; // Path for the plan icon
  isEnterprise?: boolean;
  oldPrice?: number; // Optional old price to show discounts
  onSelect: () => void;
  planSubTitle?: string;
  planTitle: string; // Title of the plan (e.g., "Basic", "Professional", "Enterprise")
  price?: number; // Current price of the plan
  priceSuffix?: string; // Price suffix (e.g., "/month")
  style?: ViewStyle; // Custom container styles
};

const PlanCard: React.FC<Props> = ({
  buttonText,
  cardWidth,
  description,
  features,
  iconPath,
  isEnterprise = false,
  oldPrice = null,
  onSelect,
  planSubTitle = '',
  planTitle,
  price = null,
  priceSuffix = '/month',
  style = {},
}) => {
  const renderFeatures = () => (
    <View style={styles.featureList}>
      {features.map((feature, index) => (
        <View key={index} style={styles.featureWrap}>
          {feature.iconPath && (
            <AssetByVariant
              path={feature.iconPath}
              resizeMode="contain"
              style={styles.featureIcon}
            />
          )}
          <Text
            style={
              isEnterprise
                ? { ...styles.featureText, color: '#fff' }
                : styles.featureText
            }
          >
            {feature.text}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <TouchableOpacity
      onPress={onSelect}
      style={{ marginBottom: 20, width: cardWidth }}
    >
      <LinearGradient
        colors={isEnterprise ? ['#9A4DFF', '#5C2E99'] : ['#fff', '#fff']}
        style={{
          ...styles.planCard,
          ...style,
        }}
      >
        <AssetByVariant
          path={iconPath}
          resizeMode="contain"
          style={styles.iconStyle}
        />
        <Text
          style={{ ...styles.planTitle, color: isEnterprise ? '#fff' : '#333' }}
        >
          {planTitle}
        </Text>
        {isEnterprise ? (
          <Text style={styles.customPrice}>{planSubTitle}</Text>
        ) : (
          <View style={styles.priceContainer}>
            {price && <Text style={styles.price}>${price}</Text>}
            {oldPrice && (
              <View>
                <Text style={styles.oldPrice}>${oldPrice}</Text>
                <Text style={styles.priceSuffix}>{priceSuffix}</Text>
              </View>
            )}
          </View>
        )}
        <Text
          style={{
            ...styles.planDescription,
            color: isEnterprise ? '#fff' : '#333',
          }}
        >
          {description}
        </Text>
        {renderFeatures()}
        <Button
          buttonStyle={styles.button}
          buttonText={buttonText}
          buttonTextStyle={{
            ...styles.buttonText,
            color: isEnterprise ? '#111' : '#fff',
          }}
          isGradientButton={!isEnterprise}
          onPress={onSelect}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    borderRadius: 88,
    bottom: 20,
    marginBottom: 30,
    position: 'absolute',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  customPrice: {
    color: '#fff',
    fontSize: 47,
    fontWeight: '500',
    lineHeight: 54,
  },
  featureIcon: {
    height: 14,
    width: 14,
  },
  featureList: {
    marginVertical: 10,
  },
  featureText: {
    color: '#555',
    fontSize: 12,
    marginLeft: 8,
  },
  featureWrap: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  gradientButton: {
    alignItems: 'center',
    borderRadius: 88,
    height: 40,
    justifyContent: 'center',
  },
  iconStyle: {
    height: 56,
    width: 50,
  },
  oldPrice: {
    color: '#aaa',
    fontSize: 14,
    marginLeft: 10,
    textDecorationLine: 'line-through',
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    height: '100%',
    marginBottom: 20,
    marginHorizontal: 5,
    padding: 40,
    paddingBottom: 120,
    width: '100%',
  },
  planDescription: {
    color: '#777',
    fontSize: 14,
    marginBottom: 10,
    marginTop: 10,
  },
  planTitle: {
    color: '#333',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    marginTop: 10,
  },
  price: {
    color: '#000',
    fontSize: 47,
    fontWeight: '500',
    lineHeight: 54,
  },
  priceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  priceSuffix: {
    color: '#aaa',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default PlanCard;
