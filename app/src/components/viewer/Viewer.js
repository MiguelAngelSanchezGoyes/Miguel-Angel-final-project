/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import Helpers from '../../helpers/Viewer.helper';

class Viewer extends Component {
  componentDidMount() {
    const documentId = '';
    Helpers.launchViewer('viewerDiv', documentId, '0002');
  }

  render() {
    return <div className="forge-viewer" id="viewerDiv" />;
  }
}

export default Viewer;
