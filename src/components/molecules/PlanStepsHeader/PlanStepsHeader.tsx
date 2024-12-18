import type { ViewStyle } from 'react-native';

import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { GradientText } from '@/components/atoms';

type Props = {
  currentStep: number;
  isSmallScreen: boolean; // To dynamically handle text size
  onSelect: (id: number) => void;
  style?: ViewStyle; // Additional styles for the container
};

const PlanStepsHeader: React.FC<Props> = ({
  currentStep,
  isSmallScreen,
  onSelect,
  style = {},
}) => {
  const steps = ['Choose Your Plan', 'Select Template', 'Select Features']; // Steps to display

  return (
    <View
      style={[
        styles.container,
        style,
        { flexDirection: isSmallScreen ? 'column' : 'row' },
      ]}
    >
      {isSmallScreen ? (
        <GradientText size={isSmallScreen ? 16 : 26} style={styles.title}>
          {steps[currentStep]}
        </GradientText>
      ) : (
        steps.map((step, index) => (
          <React.Fragment key={index}>
            <TouchableOpacity onPress={() => onSelect(index)}>
              <GradientText size={isSmallScreen ? 16 : 26} style={styles.title}>
                {step}
              </GradientText>
            </TouchableOpacity>
            {index < steps.length - 1 && (
              <LinearGradient
                colors={['#9A4DFF', '#5C2E99']}
                end={{ x: 1, y: 0.0001 }}
                start={{ x: 0.2, y: 0.0001 }}
                style={{
                  ...styles.connector,
                  opacity:
                    (currentStep === 1 && index === 0) || currentStep === 2
                      ? 1
                      : 0.5,
                }}
              />
            )}
          </React.Fragment>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  connector: {
    borderRadius: 4,
    height: 5,
    marginHorizontal: 12, 
    opacity: 0.5,
    width: '16%',
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
  },
  title: {
    fontWeight: 'bold',
    marginHorizontal: 100
  },
});

export default PlanStepsHeader;
