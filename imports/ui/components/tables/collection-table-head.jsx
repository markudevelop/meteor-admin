import React from 'react';

const CollectionTableHead = ({ cells }) => (
  <thead>
    <tr>
      { cells.map((cell, index)=> {
        return (
          <th key={index}>{cell}</th>
        );
      })}
      <th>Actions</th>
    </tr>
  </thead>
);

export default CollectionTableHead;
