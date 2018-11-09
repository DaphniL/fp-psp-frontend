import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import moment from 'moment';
import { selectColor } from '../utils.js';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfoIndex: null
    };
    this.toggleInfo = this.toggleInfo.bind(this);
  }

  showInfo(i) {
    this.setState({ showInfoIndex: i });
  }

  toggleInfo() {
    this.setState({ showInfoIndex: null });
  }

  render() {
    const { props } = this;
    const { showInfoIndex } = this.state;
    return (
      <div>
        <GoogleMap defaultZoom={3} defaultCenter={{ lat: 20, lng: -15 }}>
          {props.isMarkerShown && (
            <div>
              {props.markers
                .filter(
                  marker =>
                    marker.coordinates &&
                    props.selectedColors.includes(marker.color)
                )
                .map((marker, i) => (
                  <Marker
                    key={marker.coordinates}
                    icon={selectColor(marker.color)}
                    position={{
                      lat: Number(marker.coordinates.split(',')[0]),
                      lng: Number(marker.coordinates.split(',')[1])
                    }}
                    onClick={() => {
                      this.showInfo(i);
                    }}
                  >
                    {showInfoIndex === i && (
                      <InfoWindow onCloseClick={this.toggleInfo}>
                        <div>
                          <h5>{marker.household}</h5>
                          <div>{moment(marker.date).format('DD/MM/YYYY')}</div>
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                ))}
            </div>
          )}
        </GoogleMap>
      </div>
    );
  }
}

export default withScriptjs(withGoogleMap(Map));
