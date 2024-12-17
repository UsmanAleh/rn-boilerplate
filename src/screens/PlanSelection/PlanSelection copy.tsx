import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { AssetByVariant } from '@/components/atoms';

const PlanSelectionScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{}}>
        <AssetByVariant
          path={'loot8logo-dark'}
          resizeMode={'contain'}
          style={{ height: 34, width: 132 }}
        />
        <Text style={styles.tagline}>Secure, Verified, Connected</Text>
      </View>

      <View
        style={{
          alignSelf: 'center',
          borderRadius: 10,
          flex: 1,
          padding: 12,
          width: '70%',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '76%',
          }}
        >
          <Text style={styles.title}>Choose Your Plan</Text>
          <LinearGradient
            colors={['#9A4DFF', '#5C2E99']}
            style={{
              backgroundColor: '#00000020',
              borderRadius: 4,
              height: 5,
              opacity: 0.5,
              width: '10%',
            }}
          />

          <Text style={styles.title}>Select Template</Text>
          <LinearGradient
            colors={['#9A4DFF', '#5C2E99']}
            style={{
              backgroundColor: '#00000020',
              borderRadius: 4,
              height: 5,
              opacity: 0.5,
              width: '10%',
            }}
          />
          <Text style={styles.title}>Select Features</Text>
        </View>
        <Text style={styles.selectPlanText}>
          Select a plan that best fits your needs. Each plan includes core
          features with additional capabilities as you scale.
        </Text>
        {/* Plan Options */}

        <View style={styles.plansContainer}>
          {/* Basic Plan */}
          <View style={styles.planCard}>
            <AssetByVariant
              path={'basic-plan'}
              resizeMode={'contain'}
              style={{ height: 56, width: 50 }}
            />
            <Text style={styles.planTitle}>Basic</Text>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Text style={styles.price}>$49</Text>
              <View style={{}}>
                <Text style={styles.oldPrice}>$79</Text>
                <Text style={styles.month}>/month</Text>
              </View>
            </View>
            <Text style={styles.planDescription}>
              Perfect for small teams and startups
            </Text>
            <View style={styles.featureList}>
              <Text style={styles.feature}>✓ Up to 5 team members</Text>
              <Text style={styles.feature}>✓ Basic features</Text>
              <Text style={styles.feature}>✓ Community support</Text>
              <Text style={styles.feature}>✓ Regular updates</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <LinearGradient
                colors={['#9A4DFF', '#5C2E99']}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Select basic plan</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Professional Plan */}
          <View style={[styles.planCard]}>
            <AssetByVariant
              path={'professional-plan'}
              resizeMode={'contain'}
              style={{ height: 56, width: 50 }}
            />
            <Text style={styles.planTitle}>Professional</Text>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Text style={styles.price}>$99</Text>
              <View style={{}}>
                <Text style={styles.oldPrice}>$150</Text>
                <Text style={styles.month}>/month</Text>
              </View>
            </View>
            <Text style={styles.planDescription}>
              Ideal for growing businesses
            </Text>
            <View style={styles.featureList}>
              <Text style={styles.feature}>✓ Up to 20 team members</Text>
              <Text style={styles.feature}>✓ Advanced features</Text>
              <Text style={styles.feature}>✓ Priority support</Text>
              <Text style={styles.feature}>✓ Enhanced 24/7 support</Text>
              <Text style={styles.feature}>✓ Early access to new features</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <LinearGradient
                colors={['#9A4DFF', '#5C2E99']}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>Select professional plan</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Enterprise Plan */}
          <LinearGradient
            colors={['#9A4DFF', '#5C2E99']}
            style={styles.planCard}
          >
            <AssetByVariant
              path={'custom-plan'}
              resizeMode={'contain'}
              style={{ height: 56, width: 50 }}
            />
            <Text style={{ ...styles.planTitle, color: '#fff' }}>
              Enterprise
            </Text>
            <Text style={styles.customPrice}>Custom</Text>
            <Text style={{ ...styles.planDescription, color: '#fff' }}>
              For large organizations with custom needs
            </Text>
            <View style={styles.featureList}>
              <Text style={{ ...styles.feature, color: '#fff' }}>
                ✓ Unlimited team members
              </Text>
              <Text style={{ ...styles.feature, color: '#fff' }}>
                ✓ Custom features
              </Text>
              <Text style={{ ...styles.feature, color: '#fff' }}>
                ✓ Dedicated support
              </Text>
              <Text style={{ ...styles.feature, color: '#fff' }}>
                ✓ Custom integrations
              </Text>
            </View>
            {/* <TouchableOpacity style={styles.buttonEnterprise}>
              <Text style={{ ...styles.buttonText, color: '#111' }}>
                Select Enterprise plan
              </Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.button}>
              <LinearGradient
                colors={['#fff', '#fff']}
                style={styles.gradientButton}
              >
                <Text style={{ ...styles.buttonText, color: '#111' }}>
                  Select basic plan
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  activeStep: {
    color: '#6C47FF',
    fontSize: 14,
    fontWeight: '700',
  },
  button: {
    alignSelf: 'center',
    borderRadius: 88,
    bottom: 20,
    marginBottom: 30,
    position: 'absolute',
    width: '80%',
  },
  buttonEnterprise: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 10,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    padding: 10,
  },
  customPrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  enterpriseCard: {
    backgroundColor: '#6C47FF',
    color: '#fff',
  },
  feature: {
    color: '#555',
    fontSize: 12,
    marginBottom: 16,
  },
  featureList: {
    marginVertical: 10,
  },
  gradientButton: {
    alignItems: 'center',
    borderRadius: 88,
    height: 40,
    justifyContent: 'center',
  },
  month: {
    color: '#aaa',
    fontSize: 14,
    marginLeft: 10,
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
    marginBottom: 20,
    marginHorizontal: 5,
    padding: 40,
    paddingBottom: 120,
    width: '32%',
  },
  planDescription: {
    color: '#777',
    fontSize: 14,
    marginBottom: 10,
    marginTop: 20,
  },
  plansContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  planTitle: {
    color: '#333',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 10,
  },
  price: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  professionalCard: {
    borderColor: '#6C47FF',
  },
  selectPlanText: {
    color: '#000000',
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 28,
    marginBottom: 20,
    marginVertical: 10,
    textAlign: 'center',
  },
  step: {
    color: '#aaa',
    fontSize: 14,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '90%',
  },
  tagline: {
    color: '#111111',
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
  },
  title: {
    color: '#6C47FF',
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 30,
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default PlanSelectionScreen;
