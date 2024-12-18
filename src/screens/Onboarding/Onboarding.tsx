import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

import { LogoWithTagline, PlanStepsHeader } from '@/components/molecules';
import {
  FeatureSelection,
  PlanSelection,
  TemplateSelection,
} from '@/components/organisms';

const stepDescriptions = [
  'Select a plan that best fits your needs. Each plan includes core features with additional capabilities as you scale.',
  'Select a template that best matches your project needs. Each template comes with pre-configured features and optimized workflows.',
  'Enhance your selected template with additional features. Select the features that best suit your needs.',
];

const Onboarding = () => {
  const [step, setStep] = useState(2);
  const [isSmallScreen, setIsSmallScreen] = useState(
    Dimensions.get('window').width < 1126,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(Dimensions.get('window').width < 1126);
    };

    Dimensions.addEventListener('change', handleResize);

    return () => {
      // remove the resize event
      // Dimensions.removeEventListener('change', handleResize);
    };
  }, []);

  const handleSelectPlan = (id: number) => {
    setStep(id);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LogoWithTagline
        logoPath="loot8logo-dark"
        tagline="Secure, Verified, Connected"
      />

      <View style={styles.stepsWrap}>
        <PlanStepsHeader
          currentStep={step}
          isSmallScreen={isSmallScreen}
          onSelect={handleSelectPlan}
        />
      </View>
      <View style={styles.innerContainer}>
        {/* Plan Steps Header */}
        <Text style={styles.selectPlanText}>{stepDescriptions[step]}</Text>

        {/* Plan Options */}
        <View style={styles.plansContainer}>
          {step === 0 && <PlanSelection onSelect={handleSelectPlan} />}
          {step === 1 && <TemplateSelection onSelect={handleSelectPlan} />}
          {step === 2 && <FeatureSelection />}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flexGrow: 1,
    padding: 10,
  },
  innerContainer: {
    alignSelf: 'center',
    borderRadius: 10,
    flex: 1,
    padding: 12,
  },
  plansContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  selectPlanText: {
    color: '#000000',
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 28,
    marginBottom: 30,
    marginTop: 20,
    paddingHorizontal: 22,
    textAlign: 'center',
  },
  stepsWrap: { alignSelf: 'center', width: '70%' },
});

export default Onboarding;
