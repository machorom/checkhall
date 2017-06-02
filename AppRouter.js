import React, {
  Component,
} from 'react';

import {
  StyleSheet
} from 'react-native';

import {
  Scene,
  Reducer,
  Router
} from 'react-native-router-flux';

import Launch from './components/Launch';
import MainScene from './components/MainScene';

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

class AppRouter extends Component {
  render() {
    return (
      <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
        <Scene key="root" hideNavBar hideTabBar >
          <Scene key="launch" component={Launch} title="Launch" initial />
          <Scene key="mainscene" component={MainScene} title="MainScene" type="replace" />
        </Scene>
      </Router>
    );
  }
}

export default AppRouter;
