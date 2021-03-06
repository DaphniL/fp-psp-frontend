import React from 'react';
import moment from 'moment';
import Datetime from 'react-datetime';

export default class TimePeriod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCustomTimeSelect: false
    };
    this.showTimeSelect = this.showTimeSelect.bind(this);
    this.hideTimeSelect = this.hideTimeSelect.bind(this);
  }
  showTimeSelect() {
    this.setState({ showCustomTimeSelect: true });
  }
  hideTimeSelect() {
    this.setState({ showCustomTimeSelect: false });
  }
  setCustomPeriod(type, value) {
    if (type === 'from') {
      sessionStorage.setItem('custom-period-from', value);
      this.props.selectPeriod(
        Number(value),
        Number(sessionStorage.getItem('custom-period-to'))
      );
    } else if (type === 'to') {
      sessionStorage.setItem('custom-period-to', value);
      this.props.selectPeriod(
        Number(sessionStorage.getItem('custom-period-from')),
        Number(value)
      );
    }
  }

  render() {
    return (
      <div>
        <label>
          <input
            type="radio"
            value="all"
            name="period"
            defaultChecked
            onChange={() => {
              this.props.selectPeriod();
              this.hideTimeSelect();
            }}
          />
          {t('report.snapshot.time-period.All')}
        </label>
        <br />

        <label>
          <input
            type="radio"
            value="one-month"
            name="period"
            onChange={() => {
              this.props.selectPeriod(
                Number(
                  moment()
                  .subtract(1, 'months')
                  .format('x')
                ),
                Date.now()
              );
              this.hideTimeSelect();
            }}
          />{t('report.snapshot.time-period.Last-Month')}
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="six-months"
            name="period"
            onChange={() => {
              this.props.selectPeriod(
                Number(
                  moment()
                  .subtract(6, 'months')
                  .format('x')
                ),
                Date.now()
              );
              this.hideTimeSelect();
            }}
          />
          {t('report.snapshot.time-period.Last-6-Months')}
        </label>
        <br />

        <label>
          <input
            type="radio"
            value="custom"
            name="period"
            onChange={this.showTimeSelect}
          />
          {t('report.snapshot.time-period.Custom')}
        </label>
        {this.state.showCustomTimeSelect && (
          <div className="report-custom-timeperiod">
            <label>{t('report.snapshot.time-period.From-date')}&nbsp;</label>
            <Datetime
              dateFormat="MM/DD/YYYY"
              timeFormat={false}
              locale="en"
              onChange={e =>
                this.setCustomPeriod('from', moment(e._d).format('x'))
              }
              className="report-form-date"
            />
            <label>&nbsp;{t('report.snapshot.time-period.To-date')}&nbsp;</label>
            <Datetime
              dateFormat="MM/DD/YYYY"
              timeFormat={false}
              locale="en"
              onChange={e =>
                this.setCustomPeriod('to', moment(e._d).format('x'))
              }
              className="report-form-date"
            />
          </div>
        )}

      </div>
    );
  }
}
