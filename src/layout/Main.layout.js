// import {useEffect, useState} from 'react';
// import {f7} from 'framework7-react';
// import {connect} from 'react-redux';
// import {HOME_TAB_INDEX, HOME_TABS_ID} from 'config/home-tab.config';
// import {setSelectedTab} from 'redux/action/general.action';
// import {isEmptyObject, setStatusbarColor} from 'utils/functions.util';
import {MainTemplate} from './Main.template';

const MainLayout = props => {
  // const [layout, setLayout] = useState(null);
  //
  // useEffect(() => {
  //   f7.views.main.router.on('routeChange', (newRoute, previousRoute) => {
  //     const layout = isEmptyObject(newRoute.route.tab) ? newRoute.route.layout : newRoute.route.tab.layout;
  //     const statusBarColor = isEmptyObject(newRoute.route.tab) ? newRoute.route.statusBarColor : newRoute.route.tab.statusBarColor;
  //     setStatusbarColor(statusBarColor);
  //     setStyleActiveTab(previousRoute, false);
  //     setStyleActiveTab(newRoute);
  //     setLayout(layout);
  //     if (!isEmptyObject(newRoute.route.tab)) {
  //       const index = Object.values(HOME_TABS_ID).findIndex(i => i === newRoute.route.tab.id);
  //       const tabName = Object.keys(HOME_TABS_ID)[index];
  //       props.setSelectedTab(HOME_TAB_INDEX[tabName]);
  //     }
  //   });
  // }, []);
  //
  // const setStyleActiveTab = (newRoute, isAdd = true) => {
  //   if (isEmptyObject(newRoute.route.tab)) return;
  //   const tabId = newRoute.route.tab.id;
  //   const tabEl = document.getElementById(tabId);
  //   if (!tabEl) return;
  //   isAdd ? !newRoute.route.tab.layout && tabEl.classList.add('!padding__remove__top') : tabEl.classList.remove('!padding__remove__top');
  // };

  return <MainTemplate {...props} />;
};
//
// const mapStateToProps = state => ({
//   user: state.user.user
// });
//
// const mapDispatchToProps = dispatch => ({
//   setSelectedTab: tabIndex => dispatch(setSelectedTab(tabIndex))
// });

// const MainLayout = connect(mapStateToProps, mapDispatchToProps)(Main);

export {MainLayout};
