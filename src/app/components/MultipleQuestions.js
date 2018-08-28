import React, { Component } from 'react';
import JsonSchemaForm from 'react-jsonschema-form';
import { getLocalizedSchema } from '../utils/survey_ui_helper';

export default class MultipleQuestions extends Component {
  constructor(args) {
    super(args);
    // console.log(this.props);
    const localizedSchema = getLocalizedSchema(this.props.schema);
    this.state = {
      // schema: localizedSchema,
      // schema for the number of members
      singleSchema: this.getSingleSchema(localizedSchema),
      // schema for the questions per member
      // multipleSchema: this.getMultipleSchema(localizedSchema),
      uiSchema: this.applyConditionsIfAny(this.props.uiSchema)
    };
  }
  applyConditionsIfAny(uiSchema) {
    // if (this._hasOwnProperty(uiSchema, 'conditions')) {
    //   const objectWithCond = uiSchema.conditions.keys[0];
    //   if (this._hasOwnProperty(objectWithCond, 'minItems')) {
    //     // construct the handle change function
    //     // according the value of minItems
    //     // the schema objectWithCond should change?
    //   }
    // }
    return uiSchema;
  }

  getSingleSchema(schema) {
    const newSchema = Object.assign({}, schema);
    newSchema.properties = Object.keys(schema.properties)
      .filter(key => schema.properties[key].type !== 'array')
      .map(key => schema.properties[key]);
    return newSchema;
  }

  getMultipleSchema(schema) {
    const newSchema = Object.assign({}, schema);
    newSchema.properties = Object.keys(schema.properties)
      .filter(key => schema.properties[key].type === 'array')
      .map(key => schema.properties[key]);
    return newSchema;
  }

  _hasOwnProperty(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }
  render() {
    return (
      <div>
        <JsonSchemaForm
          schema={this.state.singleSchema}
          uiSchema={this.state.uiSchema}
        />
      </div>
    );
  }
}
