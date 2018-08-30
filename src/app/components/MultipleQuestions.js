/**
 * TODO to complete the behaviour of this component:
 * 1. [] Hide te submit button for each step.
 * 2. [] When clicking next/previous go to the next/previous step.
 *  Now goes to the next question in the parent survey
 * 3. [] When updating the number of families, the progess on top of the
 * steps are not rendering well, there is an issue with the CSS (maybe)
 * 4. [] When clicking the arrow to go to the next question in the parent
 * survey, verify that the formData is filled correctly with the excpected
 * json for the backend. Maybe this will take some manual implementation in
 * order to fill the formData with the expected values.
 * The expected JSON for formData is documented in a google docs:
 * https://docs.google.com/document/d/1hwO54jujbF485tzWMRmYXo2hqY28ashFvX_ybyTKxbs/edit?ts=5b7d9a60
 */

import React, { Component } from 'react';
import JsonSchemaForm from 'react-jsonschema-form';
import { getLocalizedSchema } from '../utils/survey_ui_helper';

// Third party library that will allow
// to show a 'wizard' like UI, with
// Next,Previous buttons for each set of questions
// per family member.
// It will also show a progress bar on top
// with a number per step or set of questions.
// https://github.com/newbreedofgeek/react-stepzilla
var StepZilla = require('react-stepzilla').default;

export default class MultipleQuestions extends Component {
  constructor(args) {
    super(args);

    this.handleSingleFieldClick = this.handleSingleFieldClick.bind(this);
    this.updateSteps = this.updateSteps.bind(this);

    const localizedSchema = getLocalizedSchema(this.props.schema);
    const stepSchema = this.getStepSchema(localizedSchema);

    this.state = {
      // The schema representing the number of
      // family members input single input field
      singleSchema: this.getSingleSchema(localizedSchema),

      stepSchema: this.getStepSchema(localizedSchema),
      // by default one set of questions per family member
      // the set of questions are represented by 'stepSchema'
      steps: [
        {
          name: '1', // the sequence number on the progess bar
          // TODO This shows a warning on the console
          // due to having a form inside a form
          // Should be corrected
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

  handleSingleFieldClick(e) {
    e.preventDefault();

    // number of family members
    const singleFieldNumber = this.singleField.value;
    if (singleFieldNumber < 2) {
      return null;
    }

    this.setState(this.updateSteps(singleFieldNumber));
  }

  updateSteps(singleFieldNumber) {
    return () => {
      const newSteps = [];
      for (let i = 0; i < singleFieldNumber; i++) {
        // add one sub-form per family member
        newSteps.push({
          name: `${i + 1}`,
          component: <JsonSchemaForm schema={this.state.stepSchema} />
        });
      }
      return { steps: newSteps };
    };
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
