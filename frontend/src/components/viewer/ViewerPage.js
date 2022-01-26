import React from 'react';
import Jumbotron from '../viewer-hud/Jumbotron';
import Gallery from '../galleryViewer/GalleryViewer';
import 'bootstrap/dist/css/bootstrap.css';
import './viewer.scss';
import 'font-awesome/css/font-awesome.css';

const ViewerPage = () => (
  <div>
    <Jumbotron />

    <Gallery />
  </div>
);

export default ViewerPage;
