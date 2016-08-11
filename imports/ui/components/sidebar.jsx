import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import CollectionsList from './collections-list.jsx';
import { Collections } from '../../api/collections/client/collections.js';
import Loader from './loader';

class Sidebar extends React.Component {
  render () {
    return (
      <ul id="slide-out" className="side-nav fixed">
         <li className="bold">
           <a href="/" className="waves-effect waves-teal">Home</a>
         </li>
         { !this.props.isLoading ?
           <CollectionsList collections={this.props.collections}/> :
           <Loader/>
         }
      </ul>
    );
  }
}

export default Sidebar = createContainer((props)=> {
  const handle = Meteor.subscribe('allCollections');
  const isLoading = !handle.ready();
  const collections = Collections.find().fetch();

  // register client side collections
  if (!isLoading && collections.length) {
    collections.forEach((collection)=> {
      let exists = Mongo.Collection.get(collection.name);
      if (!exists) {
        new Mongo.Collection(collection.name);
      }
    });
  }

  return {
    isLoading,
    collections,
  };
}, Sidebar);
