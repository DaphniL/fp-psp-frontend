/* eslint {"no-prototype-builtins": 0, "react/no-unused-state": 0} */

import React from 'react';
import SelectWithTags from './selectWithTags';
import Indicators from './Indicators';
import Economics from './Economics';
import TimePeriod from './timePeriod';
import ResultsTable from './resultsTable'
import env from '../../env';

export default class FormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.session = props.session;
    this.state = {
      selectedSurvey: null,
      indicators: [],
      economics: [],
      selectedIndicators: {},
      selectedEconomics: {},
      organizations: [],
      applications: [],
      selectedOrganizations: [],
      selectedApplications: [],
      selectedPeriod: [],
      multipleSnapshots: false,
      reportPreview: [],
      match: 'ALL',
      recordsFound: null
    };

    this.selectSurvey = this.selectSurvey.bind(this);
    this.selectOrganization = this.selectOrganization.bind(this);
    this.deselectOrganization = this.deselectOrganization.bind(this);
    this.selectApplication = this.selectApplication.bind(this);
    this.deselectApplication = this.deselectApplication.bind(this);
    this.selectIndicator = this.selectIndicator.bind(this);
    this.deselectIndicator = this.deselectIndicator.bind(this);
    this.selectEconomic = this.selectEconomic.bind(this);
    this.deselectEconomic = this.deselectEconomic.bind(this);
    this.changeNumberEconomic = this.changeNumberEconomic.bind(this);
    this.selectFilter = this.selectFilter.bind(this);
    this.deselectFilter = this.deselectFilter.bind(this);
    this.toggleSelectedColors = this.toggleSelectedColors.bind(this);
    this.selectPeriod = this.selectPeriod.bind(this);
    this.toggleMultipleSnapshots = this.toggleMultipleSnapshots.bind(this);
    this.getFilteredEconomics = this.getFilteredEconomics.bind(this);
    this.showPreview = this.showPreview.bind(this);
    this.downloadCSVReport = this.downloadCSVReport.bind(this);
    this.changeMatch = this.changeMatch.bind(this);
  }

  componentDidMount() {
    if (this.props.surveyData && this.state.selectedSurvey === null) {
      this.selectSurvey(this.props.surveyData[0].title);
    }
  }

  getSurveys(data) {
    return data.map(item => item.title);
  }

  selectSurvey(survey) {
    this.setState({
      selectedSurvey: this.props.surveyData.filter(
        item => item.title === survey
      )[0],
      selectedApplications: [],
      selectedOrganizations: [],
      selectedIndicators: {},
      selectedEconomics: {}
    });
    this.getIndicators(survey);
    this.getOrganizationsAndApps(survey);
    this.getFilteredEconomics(survey);
  }

  getIndicators(survey) {
    const data =
      this.props.surveyData &&
      this.props.surveyData.filter(item => item.title === survey)[0];

    this.setState({
      indicators: data ? data.survey_ui_schema['ui:group:indicators'] : []
    });
  }

  selectIndicator(indicator) {
    const selectedIndicators = this.state.selectedIndicators;
    selectedIndicators[indicator] = ['RED', 'YELLOW', 'GREEN'];
    this.setState({
      selectedIndicators
    });
  }

  deselectIndicator(indicator) {
    const selectedIndicators = this.state.selectedIndicators;
    delete selectedIndicators[indicator];
    this.setState({
      selectedIndicators
    });
  }

  selectEconomic(economic) {
    const selectedEconomics = this.state.selectedEconomics;
    selectedEconomics[economic.name] = economic;
    this.setState({
      selectedEconomics
    });
  }

  deselectEconomic(economic) {
    const selectedEconomics = this.state.selectedEconomics;
    delete selectedEconomics[economic.name];
    this.setState({
      selectedEconomics
    });
  }

  changeNumberEconomic(economicName, type, value) {
    const selectedEconomics = this.state.selectedEconomics;
    selectedEconomics[economicName][type] = value;
    this.setState({
      selectedEconomics
    });
  }

  selectFilter(economicName, filter) {
    const selectedEconomics = this.state.selectedEconomics;
    selectedEconomics[economicName].selectedFilters.push(filter);
    this.setState({
      selectedEconomics
    });
  }

  deselectFilter(economicName, filter) {
    const selectedEconomics = this.state.selectedEconomics;

    selectedEconomics[economicName].selectedFilters = selectedEconomics[
      economicName
    ].selectedFilters.filter(item => item !== filter);

    this.setState({
      selectedEconomics
    });
  }

  getFilteredEconomics(survey) {
    const data =
      this.props.surveyData &&
      this.props.surveyData.filter(item => item.title === survey)[0];

    if (data) {
      const tmp = [];
      data.survey_ui_schema['ui:group:economics'].forEach(item => {
        const factor =
          data.survey_ui_schema['ui:custom:fields'][item] ||
          data.survey_schema.properties[item];

        if (factor && factor['ui:field'] === 'numberFormat') {
          tmp.push({ name: item });
        }

        if (factor && factor.enum) {
          tmp.push({ name: item, enum: factor.enum, selectedFilters: [] });
        }
      });

      this.setState({
        economics: tmp
      });
    }
  }

  getOrganizationsAndApps(survey) {
    const data =
      this.props.surveyData &&
      this.props.surveyData.filter(item => item.title === survey)[0];

    this.setState({
      organizations: data ? data.organizations : [],
      applications: data && data.applications ? data.applications : []
    });
  }

  selectOrganization(organization) {
    this.setState({
      selectedOrganizations: [
        ...this.state.selectedOrganizations,
        this.state.organizations.filter(item => item.name === organization)[0]
      ]
    });
  }

  deselectOrganization(organization) {
    this.setState({
      selectedOrganizations: this.state.selectedOrganizations.filter(
        item => item.name !== organization
      )
    });
  }

  selectApplication(application) {
    this.setState({
      selectedApplications: [
        ...this.state.selectedApplications,
        this.state.applications.filter(item => item.name === application)[0]
      ]
    });
  }

  deselectApplication(application) {
    this.setState({
      selectedApplications: this.state.selectedApplications.filter(
        item => item.name !== application
      )
    });
  }

  toggleSelectedColors({ color, indicator }) {
    if (this.state.selectedIndicators[indicator].includes(color)) {
      let selectedIndicators = this.state.selectedIndicators;
      selectedIndicators[indicator] = selectedIndicators[indicator].filter(
        item => item !== color
      );
      this.setState({
        selectedIndicators
      });
    } else {
      let selectedIndicators = this.state.selectedIndicators;
      selectedIndicators[indicator].push(color);
      this.setState({
        selectedIndicators
      });
    }
  }

  selectPeriod(from, to) {
    if (from && to) {
      this.setState({ selectedPeriod: [from, to] });
    } else this.setState({ selectedPeriod: [] });
  }

  toggleMultipleSnapshots() {
    this.setState({ multipleSnapshots: !this.state.multipleSnapshots });
  }

  showPreview() {
    let filters = this.getFilters();
    fetch(`${env.API}/reports/snapshots/json`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.session.getAccessToken()}`,
        'Content-Type': 'application/json; charset=utf-8',
        'X-Locale': this.session.getLocale()
      },
      body: JSON.stringify(filters)
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          reportPreview: json,
          recordsFound: json.length
        });
      });
  }

  downloadCSVReport() {
    let filters = this.getFilters();
    fetch(`${env.API}/reports/snapshots/csv`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.session.getAccessToken()}`,
        'Content-Type': 'application/json; charset=utf-8',
        'X-Locale': this.session.getLocale()
      },
      body: JSON.stringify(filters)
    })
      .then(response => response.blob())
      .then(blob => {
        const a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'snapshots.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
  }

  getFilters() {
    const {
      selectedApplications,
      selectedOrganizations,
      selectedSurvey,
      selectedPeriod,
      multipleSnapshots,
      selectedIndicators,
      selectedEconomics,
      match
    } = this.state;

    const socioeconomicFilters = {};

    Object.values(selectedEconomics).forEach(item => {
      if (item.min && item.max) {
        socioeconomicFilters[item.name] = [item.min, item.max];
      }

      if (item.enum) {
        socioeconomicFilters[item.name] = item.selectedFilters;
      }
    });

    const send = {
      applications: selectedApplications.map(applications => applications.id),
      organizations: selectedOrganizations.map(organization => organization.id),
      survey_id: selectedSurvey.id,
      fromDate: selectedPeriod[0],
      toDate: selectedPeriod[1],
      multipleSnapshots,
      matchQuantifier: match,
      indicatorsFilters: selectedIndicators,
      socioeconomicFilters
    };

    return send;
  }

  changeMatch(e) {
    this.setState({ match: e.target.value });
  }

  render() {
    const {
      organizations,
      selectedOrganizations,
      applications,
      selectedApplications,
      indicators,
      selectedIndicators,
      economics,
      selectedEconomics,
      match,
      reportPreview
    } = this.state;

    return (
      <div className="report-form">
        <div className="row">
          <div className="col-lg-6">
            <label><h3>{t('report.snapshot.Survey')}</h3></label>
            <select
              className="map-select"
              onChange={e => this.selectSurvey(e.target.value)}
            >
              {this.getSurveys(this.props.surveyData).map(item => (
                <option key={item}>{item}</option>
          ))}
            </select>

            {this.session.getUserRole() === 'ROLE_ROOT' && (
            <div>
              <label><h3>{t('report.snapshot.Hubs')}</h3></label>
              <SelectWithTags
                items={applications.filter(
                  item => !selectedApplications.includes(item)
                )}
                selectedItems={selectedApplications}
                selectMethod={this.selectApplication}
                deselectMethod={this.deselectApplication}
              />
            </div>
          )}

            {(this.session.getUserRole() === 'ROLE_ROOT' ||
              this.session.getUserRole() === 'ROLE_HUB_ADMIN' || this.session.getUserRole() === 'ROLE_APP_ADMIN' ) && (

              <div>
                <label><h3>{t('report.snapshot.Organizations')}</h3></label>
                <SelectWithTags
                  items={organizations
                    .filter(
                      item =>
                        selectedApplications.length
                          ? selectedApplications
                            .map(app => app.name)
                            .includes(item.application.name)
                          : item
                    )
                    .filter(item => !selectedOrganizations.includes(item))}
                  selectedItems={selectedOrganizations}
                  selectMethod={this.selectOrganization}
                  deselectMethod={this.deselectOrganization}
                />
              </div>
            )}

            <br />
            <label>
              <input
                type="checkbox"
                value="multipleSnapshots"
                name="multipleSnapshots"
                onChange={this.props.toggleMultipleSnapshots}
              />
              {t('report.snapshot.include-multiple-snapshots')}
            </label>

          </div>
          <div className="col-lg-5 col-lg-offset-1">
            <label><h3>{t('report.snapshot.time-period.Title')}</h3></label>
            <TimePeriod
              selectPeriod={this.selectPeriod}
              toggleMultipleSnapshots={this.toggleMultipleSnapshots}
            />
          </div>
        </div>
        <hr />

        <label><h3>{t('report.snapshot.Filters')}</h3></label>
        <div className="panel-group" id="accordion" role="tablist">

          <div className="panel panel-default">
            <div className="panel-heading" role="tab" id="headingOne">
              <h4 className="panel-title">
                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                  {t('report.snapshot.Socioeconomic-Section')}
                </a>
              </h4>
            </div>
            <div id="collapseOne" className="panel-collapse collapse" role="tabpanel">
              <div className="panel-body">
                <Economics
                  economics={economics}
                  selectedEconomics={selectedEconomics}
                  selectEconomic={this.selectEconomic}
                  deselectEconomic={this.deselectEconomic}
                  changeNumberEconomic={this.changeNumberEconomic}
                  selectFilter={this.selectFilter}
                  deselectFilter={this.deselectFilter}
                />
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading" role="tab" id="headingTwo">
              <h4 className="panel-title">
                <a className="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                  {t('report.snapshot.Indicators')}
                </a>
              </h4>
            </div>
            <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel">
              <div className="panel-body">
                {t('report.snapshot.match-filters.Title')}
                <select value={match} onChange={this.changeMatch}>
                  <option value="ALL">{t('report.snapshot.match-filters.All')}</option>
                  <option value="ANY">{t('report.snapshot.match-filters.Any')}</option>
                </select>
                <hr />
                <Indicators
                  indicators={indicators}
                  selectedIndicators={selectedIndicators}
                  selectIndicator={this.selectIndicator}
                  deselectIndicator={this.deselectIndicator}
                  toggleSelectedColors={this.toggleSelectedColors}
                />
              </div>
            </div>
          </div>

        </div>

        <hr />

        <div className="row">
          <button className="btn btn-primary" onClick={this.showPreview}>
            {t('report.snapshot.buttons.Show-Preview')}
          </button>

          <button className="btn btn-primary" onClick={this.downloadCSVReport}>
            {t('report.snapshot.buttons.Download-Report')}
          </button>
          {!!this.state.recordsFound && (
          <span>{this.state.recordsFound} Records Found</span>
          )}
          {this.state.recordsFound === 0 &&
          <span>No Records Found</span>
        }
        </div>
        {!!reportPreview.length && (
        <div>
          <ResultsTable reportPreview={reportPreview} />
        </div>
          )}
      </div>
    );
  }
}
