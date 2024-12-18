import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { AssetByVariant, Button, GradientBorder } from '@/components/atoms';

const { width } = Dimensions.get('window');

const FeatureSelection = () => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Data for categories and features
  const defaultFeature = [
    {
      features: [
        {
          default: true,
          description: 'Build and manage user communities',
          title: 'Communities',
        },
        {
          default: true,
          description: 'Digital collectibles management',
          title: 'Collectibles',
        },
        {
          default: true,
          description: 'Friend connections and social features',
          title: 'Friends',
        },
        {
          default: true,
          description: 'Interactive map functionality',
          title: 'Map',
        },
        {
          default: true,
          description: 'Built-in marketplace features',
          title: 'Marketplace',
        },
        {
          default: true,
          description: 'Encrypted messaging system',
          title: 'Secure Messaging',
        },
      ],
      title: 'Default Features',
    },
  ];

  const socialFeatures = [
    {
      features: [
        {
          description: 'Create topic-based discussion channels',
          title: 'Channels',
        },
        { description: 'Team collaboration features', title: 'Teams' },
        { description: 'Community voting and polls', title: 'Voting' },
      ],
      title: 'Social Features',
    },
    {
      features: [
        { description: 'Content Management System', title: 'CMS' },
        { description: 'File storage and sharing', title: 'Files' },
        { description: 'Information linking system', title: 'Infolink' },
      ],
      title: 'Content Features',
    },
  ];

  const engagementAdvanceFeatures = [
    {
      features: [
        {
          description: 'Event scheduling and management',
          title: 'Calendar',
        },
        {
          description: 'Event management and ticketing',
          title: 'Events/Tickets',
        },
        {
          description: 'Player engagement with leaderboards',
          title: 'Leaderboards',
        },
      ],
      title: 'Engagement Features',
    },
    {
      features: [
        {
          description: 'Intelligent AI-powered assistance',
          title: 'AI Assistant',
        },
        { description: 'AI-powered engagement tools', title: 'Asset Transfer' },
        { description: 'Digital asset auction system', title: 'Auction' },
      ],
      title: 'Advance Features',
    },
  ];

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const isSmallScreen = width < 400;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Feature Categories */}
      <View style={styles.featureCategoriesContainer}>
        {defaultFeature.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.featureCategory}>
            <Text style={styles.featureCategoryTitle}>{category.title}</Text>
            <View style={styles.featureCardsContainer}>
              {category.features.map((feature, featureIndex) => (
                <TouchableOpacity
                  disabled
                  key={featureIndex}
                  style={styles.featureCard}
                >
                  <GradientBorder style={styles.featuredCardGradient}>
                    <View style={styles.featureCardContent}>
                      <AssetByVariant
                        path={'feature-icon'}
                        resizeMode="contain"
                        style={styles.featureIcon}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text numberOfLines={1} style={styles.featureCardTitle}>
                          {feature.title}
                        </Text>
                        <Text
                          numberOfLines={2}
                          style={styles.featureCardDescription}
                        >
                          {feature.description}
                        </Text>
                      </View>
                    </View>
                    {/* {feature?.default && (
                      <Text style={styles.featureCardBadge}>Default</Text>
                    )} */}
                  </GradientBorder>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View
          style={{ flex: 1, flexDirection: isSmallScreen ? 'column' : 'row' }}
        >
          <View style={{ flex: isSmallScreen ? 1 : 0.5 }}>
            {socialFeatures.map((category, categoryIndex) => (
              <View key={categoryIndex} style={styles.featureCategory}>
                <Text style={styles.featureCategoryTitle}>
                  {category.title}
                </Text>
                <View style={styles.featureCardsContainer}>
                  {category.features.map((feature, featureIndex) => (
                    <TouchableOpacity
                      key={featureIndex}
                      onPress={() => toggleFeature(feature.title)}
                      style={[
                        styles.featureCard,
                        { width: isSmallScreen ? '98%' : '44%' },
                      ]}
                    >
                      <GradientBorder
                        isGradientBorder={selectedFeatures.includes(
                          feature.title,
                        )}
                        style={styles.featuredCardGradient}
                      >
                        <View style={styles.featureCardContent}>
                          <AssetByVariant
                            path={'feature-icon'}
                            resizeMode="contain"
                            style={styles.featureIcon}
                          />
                          <View style={{ marginLeft: 10 }}>
                            <Text
                              numberOfLines={1}
                              style={styles.featureCardTitle}
                            >
                              {feature.title}
                            </Text>
                            <Text
                              numberOfLines={2}
                              style={styles.featureCardDescription}
                            >
                              {feature.description}
                            </Text>
                          </View>
                        </View>
                      </GradientBorder>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
          {/* Feature Preview */}
          {!isSmallScreen && (
            <View style={{ flex: 0.5 }}>
              <GradientBorder style={styles.featurePreviewContainer}>
                <View style={{ padding: 10 }}>
                  <Text style={styles.featurePreviewTitle}>
                    Feature Preview
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={styles.previewText}>
                      Plan: <Text style={styles.previewLabel}>Basic</Text>
                    </Text>
                    <Text style={styles.previewText}>
                      Seats: <Text style={styles.previewLabel}>01</Text>
                    </Text>
                    <Text style={styles.previewText}>
                      Template: <Text style={styles.previewLabel}>Game</Text>
                    </Text>
                    <Text style={styles.previewText}>
                      Total Price:{' '}
                      <Text style={styles.previewLabel}>$49 / Month</Text>
                    </Text>
                  </View>
                  <View style={styles.divider} />
                  <View>
                    {defaultFeature.map((category, categoryIndex) => (
                      <View key={categoryIndex} style={styles.featureCategory}>
                        <View style={styles.featureCardsContainer}>
                          {category.features.map((feature, featureIndex) => (
                            <GradientBorder key={featureIndex}>
                              <Text
                                style={styles.defaultSelectedFeatureTagTitle}
                              >
                                {feature.title}
                              </Text>
                            </GradientBorder>
                          ))}
                        </View>
                      </View>
                    ))}
                  </View>

                  {/* Selected Features */}
                  <View style={styles.selectedFeatures}>
                    {selectedFeatures.map((feature, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => toggleFeature(feature)}
                        style={styles.selectedFeatureTag}
                      >
                        <Text
                          numberOfLines={1}
                          style={styles.selectedFeatureText}
                        >
                          {feature}
                        </Text>
                        <Text style={styles.selectedFeatureRemove}> ×</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Checkout Button */}
                  <Button
                    buttonStyle={styles.checkoutButton}
                    buttonText="Checkout"
                    isGradientButton
                    onPress={() => null}
                  />
                </View>
              </GradientBorder>
            </View>
          )}
        </View>

        {engagementAdvanceFeatures.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.featureCategory}>
            <Text style={styles.featureCategoryTitle}>{category.title}</Text>

            <View style={styles.featureCardsContainer}>
              {category.features.map((feature, featureIndex) => (
                <TouchableOpacity
                  key={featureIndex}
                  onPress={() => toggleFeature(feature.title)}
                  style={[
                    styles.featureCard,
                    selectedFeatures.includes(feature.title) &&
                      styles.featureCardSelected,
                  ]}
                >
                  <GradientBorder
                    isGradientBorder={selectedFeatures.includes(feature.title)}
                    style={styles.featuredCardGradient}
                  >
                    <View style={styles.featureCardContent}>
                      <AssetByVariant
                        path={'feature-icon'}
                        resizeMode="contain"
                        style={styles.featureIcon}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text numberOfLines={1} style={styles.featureCardTitle}>
                          {feature.title}
                        </Text>
                        <Text
                          numberOfLines={2}
                          style={styles.featureCardDescription}
                        >
                          {feature.description}
                        </Text>
                      </View>
                    </View>
                  </GradientBorder>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        {/* Feature Preview */}
        {isSmallScreen && (
          <View style={{ flex: 0.5 }}>
            <GradientBorder style={styles.featurePreviewContainer}>
              <View style={{ padding: 10 }}>
                <Text style={styles.featurePreviewTitle}>Feature Preview</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={styles.previewText}>
                    Plan: <Text style={styles.previewLabel}>Basic</Text>
                  </Text>
                  <Text style={styles.previewText}>
                    Seats: <Text style={styles.previewLabel}>01</Text>
                  </Text>
                  <Text style={styles.previewText}>
                    Template: <Text style={styles.previewLabel}>Game</Text>
                  </Text>
                  <Text style={styles.previewText}>
                    Total Price:{' '}
                    <Text style={styles.previewLabel}>$49 / Month</Text>
                  </Text>
                </View>
                <View style={styles.divider} />
                <View>
                  {defaultFeature.map((category, categoryIndex) => (
                    <View key={categoryIndex} style={styles.featureCategory}>
                      <View style={styles.featureCardsContainer}>
                        {category.features.map((feature, featureIndex) => (
                          <GradientBorder key={featureIndex}>
                            <Text style={styles.defaultSelectedFeatureTagTitle}>
                              {feature.title}
                            </Text>
                          </GradientBorder>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>

                {/* Selected Features */}
                <View style={styles.selectedFeatures}>
                  {selectedFeatures.map((feature, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => toggleFeature(feature)}
                      style={styles.selectedFeatureTag}
                    >
                      <Text
                        numberOfLines={1}
                        style={styles.selectedFeatureText}
                      >
                        {feature}
                      </Text>
                      <Text style={styles.selectedFeatureRemove}> ×</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Checkout Button */}
                <Button
                  buttonStyle={styles.checkoutButton}
                  buttonText="Checkout"
                  isGradientButton
                  onPress={() => null}
                />
              </View>
            </GradientBorder>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  checkoutButton: {
    alignSelf: 'center',
    marginTop: 30,
    width: '100%',
  },
  checkoutButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  container: {
    padding: 16,
  },
  defaultSelectedFeatureTag: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    margin: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  defaultSelectedFeatureTagTitle: {
    fontSize: 12,
    // fontWeight: '500',
    lineHeight: 18,
    // maxWidth: 100,
  },
  divider: {
    backgroundColor: '#ddd',
    height: 1,
    marginVertical: 8,
  },
  featureCard: {
    // borderColor: '#ddd',
    borderRadius: 8,
    // borderWidth: 1,
    margin: 8,
    // minWidth: 346,
    // padding: 12,
    width: width < 400 ? '98%' : '22%',

    // backgroundColor: '#fff',
    // borderRadius: 8,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    // width: '100%',
  },
  featureCardBadge: {
    color: '#9A4DFF',
    fontSize: 10,
    textAlign: 'right',
  },
  featureCardContent: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  featureCardDescription: {
    color: '#777',
    maxWidth: '95%',
  },
  featureCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureCardSelected: {
    backgroundColor: '#F3E9FF',
    borderColor: '#9A4DFF',
  },
  featureCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureCategoriesContainer: {
    marginBottom: 16,
    paddingHorizontal: width < 400 ? 8 : 16,
  },
  featureCategory: {
    marginBottom: 16,
  },
  featureCategoryTitle: {
    color: '#6C47FF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  featuredCardGradient: {
    borderRadius: 8,
    margin: 0,
    padding: 2,
  },
  featureIcon: {
    height: 28,
    width: 34,
  },
  featurePreviewContainer: {
    borderRadius: 8,
  },
  featurePreviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  gradientButton: {
    alignItems: 'center',
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 12,
    width: 582,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  headerStepText: {
    color: '#9A4DFF',
    fontWeight: '600',
  },
  previewLabel: {
    fontWeight: '600',
  },
  previewText: {
    marginBottom: 8,
  },
  selectedFeatureRemove: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  selectedFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  selectedFeatureTag: {
    alignItems: 'center',
    backgroundColor: '#E9F2FF',
    borderRadius: 50,
    flexDirection: 'row',
    margin: 4,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  selectedFeatureText: {
    fontSize: 12,
    maxWidth: 100,
  },
  stepDivider: {
    backgroundColor: '#9A4DFF',
    height: 2,
    marginHorizontal: 8,
    width: 30,
  },
  subHeader: {
    color: '#555',
    fontSize: 16,
    marginVertical: 12,
    textAlign: 'center',
  },
});

export default FeatureSelection;
