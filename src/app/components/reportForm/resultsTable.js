import React from 'react';

export default class ResultsTable extends React.PureComponent {

  render() {
    let reportPreview = this.props.reportPreview
    return(
      <table className="table table-bordered">
        <thead>
          <tr>
            <td>Family Code</td>
            <td>Family Name</td>
          </tr>
        </thead>
        <tbody>
          {reportPreview.map(row => (
            <tr key={row.snapshot_economic_id}>
              <td><a href={`/#families/${row.family.familyId}`} target="_blank" rel="noopener noreferrer" >{row.family.code}</a></td>
              <td>{row.family.name}</td>
            </tr>
        ))}
        </tbody>
      </table>
    )
  }
}
