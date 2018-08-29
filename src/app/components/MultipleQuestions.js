import React, { Component } from 'react';
import JsonSchemaForm from 'react-jsonschema-form';
import { getLocalizedSchema } from '../utils/survey_ui_helper';

var StepZilla = require('react-stepzilla').default;

export default class MultipleQuestions extends Component {
  constructor(args) {
    super(args);
    this.handleSingleFieldClick = this.handleSingleFieldClick.bind(this);

    const localizedSchema = getLocalizedSchema(this.props.schema);
    const stepSchema = this.getStepSchema(localizedSchema);

    this.state = {
      singleSchema: this.getSingleSchema(localizedSchema),

      stepSchema: this.getStepSchema(localizedSchema),
      // by default on question per family member
      steps: [
        {
          name: '1',
          component: <JsonSchemaForm schema={stepSchema} />
        }
      ]
    };
  }

  getSingleSchema(schema) {
    const newSchema = Object.assign({}, schema);
    newSchema.properties = Object.keys(schema.properties)
      .filter(key => schema.properties[key].type !== 'array')
      .map(key => schema.properties[key]);
    // todo improve this
    return newSchema.properties[0];
  }

  getStepSchema(schema) {
    const newSchema = Object.assign({}, schema);
    newSchema.properties = Object.keys(schema.properties)
      .filter(key => schema.properties[key].type === 'array')
      .map(key => schema.properties[key]);

    return getLocalizedSchema(newSchema.properties[0].items);
  }

  _hasOwnProperty(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  handleSingleFieldClick(e) {
    e.preventDefault();
    // number of family members
    const singleFieldNumber = this.singleField.value;
    if (singleFieldNumber < 2) {
      return null;
    }
    this.setState(() => {
      const newSteps = [];
      for (let i = 0; i < singleFieldNumber; i++) {
        // add one sub-form per family member
        newSteps.push({
          name: `${i + 1}`,
          component: <JsonSchemaForm schema={this.state.stepSchema} />
        });
      }
      return { steps: newSteps };
    });
  }
  render() {
    const { singleSchema, steps } = this.state;
    return (
      <div>
        <div className="rdt form-group field field-number">
          <label className="control-label">{singleSchema.title}</label>
          <div
            className="rdt"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              className="form-control"
              ref={input => {
                this.singleField = input;
                return input;
              }}
              label={`${singleSchema.title}`}
              placeholder=""
            />
            <button onClick={this.handleSingleFieldClick}>Ok</button>
          </div>
        </div>
        <div className="step-progress">
          <StepZilla steps={steps} />
        </div>
      </div>
    );
  }
}
