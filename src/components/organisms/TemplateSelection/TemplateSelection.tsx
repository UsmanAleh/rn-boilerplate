import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { PlanCard } from '@/components/molecules';

const templatesData = [
  {
    buttonText: 'Continue With Game',
    description:
      'Create an interactive game experience with real-time features and player engagement.',
    features: [
      { iconPath: 'blue-check', text: 'Real-time multiplayer support' },
      { iconPath: 'blue-check', text: 'Player profiles and progression' },
      { iconPath: 'blue-check', text: 'In-game chat system' },
      { iconPath: 'blue-check', text: 'Achievement system' },
      { iconPath: 'blue-check', text: 'Leaderboards' },
      { iconPath: 'blue-check', text: 'Asset management' },
    ],
    iconPath: 'game',
    id: 0,
    planTitle: 'Game',
  },
  {
    buttonText: 'Continue With Business',
    description:
      'Build a professional business application with team collaboration and workflow management.',
    features: [
      { iconPath: 'blue-check', text: 'Team management' },
      { iconPath: 'blue-check', text: 'Project tracking' },
      { iconPath: 'blue-check', text: 'Document sharing' },
      { iconPath: 'blue-check', text: 'Task assignments' },
      { iconPath: 'blue-check', text: 'Analytics dashboard' },
      { iconPath: 'blue-check', text: 'Role-based access' },
    ],
    iconPath: 'business',
    id: 1,
    planTitle: 'Business',
  },
  {
    buttonText: 'Continue With E-commerce',
    description:
      'Set up an online store with product management, cart functionality, and secure checkout.',
    features: [
      { iconPath: 'blue-check', text: 'Product catalog' },
      { iconPath: 'blue-check', text: 'Shopping cart' },
      { iconPath: 'blue-check', text: 'Secure payments' },
      { iconPath: 'blue-check', text: 'Order management' },
      { iconPath: 'blue-check', text: 'Customer profiles' },
      { iconPath: 'blue-check', text: 'Inventory tracking' },
    ],
    iconPath: 'e-commerce',
    id: 2,
    planTitle: 'E-commerce',
  },
  {
    buttonText: 'Continue With Social',
    description:
      'Develop a social networking platform with user profiles, feeds, and real-time messaging.',
    features: [
      { iconPath: 'blue-check', text: 'User profiles' },
      { iconPath: 'blue-check', text: 'News feed' },
      { iconPath: 'blue-check', text: 'Direct messaging' },
      { iconPath: 'blue-check', text: 'Content sharing' },
      { iconPath: 'blue-check', text: 'Friend connections' },
      { iconPath: 'blue-check', text: 'Activity notifications' },
    ],
    iconPath: 'social',
    id: 3,
    planTitle: 'Social',
  },
];

type Props = {
  // eslint-disable-next-line no-unused-vars
  onSelect: (id: number) => void;
};

const TemplateSelection: React.FC<Props> = ({ onSelect }) => {
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
      {templatesData.map((plan, index) => (
        <PlanCard
          buttonText={plan.buttonText}
          cardWidth={isSmallScreen ? '100%' : '24%'}
          description={plan.description}
          features={plan.features}
          iconPath={plan.iconPath}
          key={index}
          onSelect={() => onSelect(plan.id)}
          planTitle={plan.planTitle}
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
    width: '100%'
  },
});

export default TemplateSelection;
