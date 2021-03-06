import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {Container, Header} from 'native-base';
import Match from './Match';
import Like from './Like';

const MaterialTopTabs = createMaterialTopTabNavigator(
  {
    'Your Matches': {
      screen: props => <Match {...props} />,
    },
    'Your Likes ': {
      screen: props => <Like {...props} />,
    },
  },
  {
    swipeEnabled: true,
    lazy: true,
    tabBarOptions: {
      style: {backgroundColor: 'white'},
      activeTintColor: 'black',
      inactiveTintColor: 'grey',
      indicatorStyle: {opacity: 0},
    },
  },
);

const MaterialTopTabsContainer = createAppContainer(MaterialTopTabs);

export default class Chat extends React.Component {
  render() {
    return (
      <Container>
        <Header style={{height: 0.001}} />
        <MaterialTopTabsContainer
          screenProps={this.props.navigation.getScreenProps()}
        />
      </Container>
    );
  }
}
