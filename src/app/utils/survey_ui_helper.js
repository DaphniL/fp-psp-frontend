import _ from 'lodash';

export function getLocalizedSchema(unlocalizedSchema) {
  const newSchema = Object.assign({}, unlocalizedSchema);

  const newProps = _.mapValues(newSchema.properties, obj =>
    _.mapValues(obj, obj2 => {
      if (
        _.isObject(obj2) &&
        Object.prototype.hasOwnProperty.call(obj2, 'es')
      ) {
        return obj2.es;
      } else if (
        _.isObject(obj2) &&
        Object.prototype.hasOwnProperty.call(obj2, 'en')
      ) {
        return obj2.en;
      }
      return obj2;
    })
  );
  newSchema.properties = newProps;
  return newSchema;
}

export default { getLocalizedSchema };
