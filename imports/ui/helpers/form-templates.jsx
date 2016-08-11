import React from 'react';

export const StringInput = (key) => {
  return (
    <div key={key} className="input-field col s12">
      <input id={key} type="text" className="validate" value={doc[key]}/>
      <label className="active" htmlFor={key}>{key}</label>
    </div>
  );
};

export const DateInput = () => {

};

export const ArrayInput = ({doc, docKey}) => {
  return (
    <div className="row">
      <div className="col s12">
        <div className="card-panel">
          <p>{docKey}</p>
          {/* { doc[key].map((key)=> {
            // detect type & render the correct input
            return (
              <StringInput key={key}/>
            );
          })} */}
          <p>Add New</p>
        </div>
      </div>
    </div>
  );
};

export const ObjectInput = () => {

};

export const BooleanInput = (key) => (
  <div key={key}>
    <input type="checkbox" id={key} />
    <label for={key}>{key}</label>
  </div>
);
