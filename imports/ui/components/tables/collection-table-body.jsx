import React from 'react';

const parseValue = docValue => {
  if (docValue instanceof Date) {
    docValue = moment.utc(docValue).format('D MMM YYYY, HH:mm');
  }

  if (Array.isArray(docValue)) {
    docValue.join(','); // not checking if we have nested objects
  }

  if (!Array.isArray(docValue) && typeof docValue === 'object') {
    // handle object case for now we just dont show
    docValue = 'Object';
  }
  return docValue;
};

const CollectionTableBody = ({ documents, cells, handleEdit, handleDelete, collectionName }) => (
  <tbody>
    {documents.map((doc, index)=> {
      return (
        <tr key={index}>
          { cells.map((cell, index)=> {
            let docValue = doc[cell];
            docValue = parseValue(docValue);

            return (
              <td key={index}>{docValue}</td>
            );
          })}
          <td>
            <a onClick={()=> handleEdit(collectionName, doc._id)}
              className="waves-effect waves-light green btn" style={{marginRight: '0.5rem'}}>
              <i className="material-icons">mode_edit</i>
            </a>
            <a onClick={()=> handleDelete(collectionName, doc._id)}
              className="waves-effect waves-light red btn">
              <i className="material-icons">delete</i>
            </a>
          </td>
        </tr>
      );
    })}
  </tbody>
);

export default CollectionTableBody;
