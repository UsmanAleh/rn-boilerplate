import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { PlanCard } from '@/components/molecules';

const planData = [
  {
    buttonText: 'Select Basic Plan',
    description: 'Perfect for small teams and startups',
    features: [
      { iconPath: 'blue-check', text: 'Up to 5 team members' },
      { iconPath: 'blue-check', text: 'Basic features' },
      { iconPath: 'blue-check', text: 'Community support' },
      { iconPath: 'blue-check', text: 'Regular updates' },
    ],
    iconPath: 'basic-plan',
    id: 0,
    oldPrice: 79,
    planTitle: 'Basic',
    price: 49,
  },
  {
    buttonText: 'Select Professional Plan',
    description: 'Ideal for growing businesses',
    features: [
      { iconPath: 'blue-check', text: 'Up to 20 team members' },
      { iconPath: 'blue-check', text: 'Advanced features' },
      { iconPath: 'blue-check', text: 'Priority support' },
      { iconPath: 'blue-check', text: 'Enhanced 24/7 support' },
      { iconPath: 'blue-check', text: 'Early access to new features' },
    ],
    iconPath: 'professional-plan',
    id: 1,
    oldPrice: 150,
    planTitle: 'Professional',
    price: 99,
  },
  {
    buttonText: 'Select Enterprise Plan',
    description: 'For large organizations with custom needs',
    features: [
      { iconPath: 'white-check', text: 'Unlimited team members' },
      { iconPath: 'white-check', text: 'Custom features' },
      { iconPath: 'white-check', text: 'Dedicated support' },
      { iconPath: 'white-check', text: 'Custom integrations' },
    ],
    iconPath: 'custom-plan',
    id: 2,
    planSubTitle: 'Custom',
    planTitle: 'Enterprise',
  },
];

type Props = {
  // eslint-disable-next-line no-unused-vars
  onSelect: (id: number) => void;
};

const PlanSelection: React.FC<Props> = ({ onSelect }) => {
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

  return (
    <View style={styles.plansContainer}>
      {planData.map((plan, index) => (
        <PlanCard
          buttonText={plan.buttonText}
          cardWidth={isSmallScreen ? '100%' : '32%'}
          description={plan.description}
          features={plan.features}
          iconPath={plan.iconPath}
          isEnterprise={plan.id === 2}
          key={index}
          oldPrice={plan.oldPrice}
          onSelect={() => onSelect(plan.id)}
          planSubTitle={plan.planSubTitle}
          planTitle={plan.planTitle}
          price={plan.price}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  plansContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default PlanSelection;
