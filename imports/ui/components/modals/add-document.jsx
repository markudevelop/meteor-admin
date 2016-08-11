import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { FormFromDocument as FormFromSchema } from './edit-document';
import { documentNew } from '../../../api/collections/methods';
import { ReactiveVar } from 'meteor/reactive-var';
import Loader from '../loader';

const _schema = new ReactiveVar(null);

// find some demo document for schema
// TODO: possibly add a way to add schemas, it will be wrong to keep 2 scheams
// at 2 different apps, we either auto detect schema or think about some other
// way of doing it
export const setSchemaFromDoc = () => {
  _schema.set(null);
  const collectionName = FlowRouter.getParam('collectionName');
  const collection = Mongo.Collection.get(collectionName);
  const doc = collection.findOne();
  // strip values and non string properties
  for(let key in doc) {
    let value = doc[key];
    if (!typeof value === "string") {
      delete doc[key];
    } else {
      doc[key] = ""
    }
  }

  if (doc) {
    _schema.set({
      collectionName,
      doc,
    });
  }
};

// const FormFromSchema = ({ schema }) => (
//   <div className="row">
//     {schema.map((field)=> {
//       return (
//         <div key={field.name} className="input-field col s12">
//           <input id={field.name} type="text" className="validate" />
//           <label className="active" htmlFor={field.name}>{field.name}</label>
//         </div>
//        );
//      })}
//   </div>
// );

class AddDocumentModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      doc: null,
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let doc = nextProps.doc.doc;
    this.setState({
      doc: doc
    });
  }

  handleAdd() {
    const collectionName = FlowRouter.getParam('collectionName');
    documentNew.call({
      collectionName,
      doc: this.state.doc,
    });
  }

  handleChange(key, event) {
    let newValue = event.target.value;
    this.setState((previousState, currentProps)=>{
      return {
        doc: {
          ...previousState.doc,
          [key]: newValue,
        }
      };
    });
  }

  render() {
    let { doc } = this.props;

    return (
      <div id="addDocumentModal" className="modal">
        <div className="modal-content">
          <h4>Add New Document</h4>
          <form>
            {doc ?
              <FormFromSchema doc={this.state.doc} handleChange={this.handleChange}/> :
              <p>No schema to use, we need at least 1 document to discover the structure of a document</p>
            }
          </form>
        </div>
        <div className="modal-footer">
          <a onClick={this.handleAdd}
            className="modal-action modal-close waves-effect waves-green btn-flat">Add</a>
        </div>
      </div>
    );
  }
}

export default AddDocumentModal = createContainer((props)=> {
  const doc = _schema.get();

  return {
    doc,
  };

}, AddDocumentModal)
