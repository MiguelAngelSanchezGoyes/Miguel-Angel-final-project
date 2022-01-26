/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './Detail.scss';

export const Detail = () => {
  const { projects } = useSelector((state) => state.projectStore);
  const { userLogged } = useSelector((state) => state.userStore);
  const { id } = useParams();

  const project = projects.find((item) => item._id === id);

  return (
    <div className="detail">
      <div className="detail__brand">
        <p>{project.brand}</p>
      </div>
      <div className="detail__name">
        <p>{project.name}</p>
      </div>
      <div className="detail__carousel">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-60"
              src={project.pictures[0].avatar}
              alt="First slide"
            />
            <Carousel.Caption>
              <div>{project.description}</div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-60"
              src={project.pictures[1].avatar}
              alt="Second slide"
            />
            <Carousel.Caption>
              <div>{project.description}</div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-60"
              src={project.pictures[2].avatar}
              alt="Third slide"
            />
            <Carousel.Caption>
              <div>{project.description}</div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-60"
              src={project.pictures[3].avatar}
              alt="First slide"
            />
            <Carousel.Caption>
              <div>{project.description}</div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-60"
              src={project.pictures[4].avatar}
              alt="First slide"
            />
            <Carousel.Caption>
              <div>{project.description}</div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="detail__typology">
        <p>{project.typology.description}</p>
      </div>
      <div className="detail__3d">
        <Link to="/viewer" state={{ from: project }}>
          3D DESIGN
        </Link>
      </div>
      {userLogged._id === project.user._id ? (
        <>
          <div className="detail__edit">
            <Link to="/editForm" state={{ from: project }}>
              EDIT PROJECT
            </Link>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
