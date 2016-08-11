import React from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

class CollectionsList extends React.Component {
  componentDidMount () {
    let $li = $(ReactDOM.findDOMNode(this.refs.li));
    $li.collapsible();
  }

  render () {
    let { collections, activeCollectionName } = this.props;
    return (
      <li className="no-padding">
        <ul className="collapsible collapsible-accordion" ref="li">
          <li className="bold">
            <a className="collapsible-header waves-effect waves-teal">Collections</a>
            <div className="collapsible-body">
              <ul>
                {collections.map((collection, index)=> {
                  let isActive = (activeCollectionName === collection.name) ?
                    'active': '';
                  return (
                    <li className={isActive} key={index}>
                      <a href={`/collections/${collection.name}`}>
                        {collection.name}
                        {/*<span className="badge">{collection.count}</span>*/}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        </ul>
      </li>
    );
  }
}

export default CollectionsList = createContainer((props)=> {
  const activeCollectionName = FlowRouter.getParam('collectionName');
  return {
    activeCollectionName,
  };
}, CollectionsList)
