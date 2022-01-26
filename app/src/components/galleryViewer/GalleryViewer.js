/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import scrollTo from 'scroll-to';
import Helpers from '../../helpers/Viewer.helper';
import './gallery.scss';

const tilesData = [
  {
    img: 'images/revit-house.png',
    title: 'Revit House',
    key: '0004',
    urn: 'urn: dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bWlndWVsXzIwMjEtMTItMDIwL1Byb3llY3RvMV93ZWJfc3BhLnppcA',
  },
  {
    img: 'images/revit-house.png',
    title: 'Revit House 2',
    key: '0005',
    urn: 'urn: dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bWlndWVsXzIwMjEtMTItMDI3L1Byb2plY3QyX3dlYl9zcGEuemlw',
  },
];

class Gallery extends Component {
  onTileSelect(tile, e) {
    e.preventDefault();

    // Scroll to top
    scrollTo(0, 0, {
      ease: 'inQuad',
      duration: 300,
    });

    // Starts loading once it scrolls
    setTimeout(
      () => Helpers.launchViewer('viewerDiv', tile.urn, tile.key),
      300
    );
  }

  render() {
    return (
      <div className="forge-gallery">
        <div className="container">
          <div className="row">
            {tilesData.map((tile, index) => (
              <div className="col-md-4 col-xs-6 tile" key={index}>
                <a href="#" onClick={this.onTileSelect.bind(this, tile)}>
                  <img
                    className="tile-avatar"
                    src={tile.img}
                    alt={tile.title}
                  />
                </a>
                <div className="tile-title">{tile.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
