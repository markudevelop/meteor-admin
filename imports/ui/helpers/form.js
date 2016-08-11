import {
  StringInput,
  DateInput,
  ArrayInput,
  ObjectInput,
  BooleanInput,
} from './form-templates.jsx';

export const propertyType = (property) => {
  let typeOfProp = typeof property;

  if (typeOfProp === 'string') {
    return 'STRING';
  }

  if (typeOfProp === 'boolean') {
    return 'BOOLEAN';
  }

  if (property instanceof Date) {
    return 'DATE';
  }

  if (typeOfProp === "object") {
    if (_.isArray(property)) {
      return 'ARRAY';
    } else {
      return 'OBJECT';
    }
  }
};

export const inputBuilder = (property) => {
  let typeOfProp = propertyType(property);

  switch (typeOfProp) {
    case 'STRING':
      return <StringInput/>;
    case 'BOOLEAN':
      return <BooleanInput/>;
    case 'DATE':
      return <DateInput/>;
    case 'ARRAY':
      return <ArrayInput/>;
    case 'OBJECT':
      return <ObjectInput/>;
    default:
      return <StringInput/>;
  }
};
