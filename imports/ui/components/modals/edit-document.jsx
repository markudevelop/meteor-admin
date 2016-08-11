import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { documentEdit } from '../../../api/collections/methods';
import { currentDocument } from './modal-state';
import Loader from '../loader';
import { ArrayInput } from '../../helpers/form-templates.jsx';

export const FormFromDocument = ({ doc, handleChange }) => (
  <div className="row">
    {Object.keys(doc).map((key)=> {
      // if (_.isArray(doc[key])) {
      //   return <ArrayInput doc={doc} docKey={key}/>
      // }

      if (!typeof doc[key] === 'string') {
        return (
          <span key={key}>{typeof doc[key]}</span>
        );
      }

      if (key === '_id') {
        return (
          <div key={key} className="input-field col s12">
            <input disabled id={key} type="text" className="validate" value={doc[key]}/>
            <label className="active" htmlFor={key}>{key}</label>
          </div>
        );
      }

      return (
        <div key={key} className="input-field col s12">
          <input onChange={handleChange.bind(null, key)} id={key} type="text" className="validate" value={doc[key]}/>
          <label className="active" htmlFor={key}>{key}</label>
        </div>
       );
     })}
  </div>
);

class EditDocumentModal extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      doc: null,
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let doc = nextProps.doc.doc;
    this.setState({
      doc: doc
    });
  }

  handleSave() {
    let { collectionName } = currentDocument.get();
    documentEdit.call({
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

  render () {
    return (
      <div id="editDocumentModal" className="modal">
        <div className="modal-content">
          <h4>Edit Document</h4>
          <div>
            <form>
              {this.state.doc ?
                <FormFromDocument doc={this.state.doc} handleChange={this.handleChange}/> :
                <Loader/>
              }
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <a onClick={this.handleSave}
            className="modal-action modal-close waves-effect waves-green btn-flat">Save</a>
        </div>
      </div>
    );
  }
}

export default EditDocumentModal = createContainer((props)=> {
  const doc = currentDocument.get();

  return {
    doc,
  };
}, EditDocumentModal)
