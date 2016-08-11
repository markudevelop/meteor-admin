import { createContainer } from 'meteor/react-meteor-data';
import Auth from '../layouts/auth';

export default createContainer(() => {
  let user = Meteor.user();

  return {
    loggingIn: Meteor.loggingIn(),
    hasUser: !!user,
    isPublic(route) {
      let publicRoutes = [
        'login',
      ];
      return publicRoutes.indexOf(route) > -1;
    },
    canView() {
      return this.isPublic(FlowRouter.current().route.name) || !!Meteor.user();
    }
  };
}, Auth);
