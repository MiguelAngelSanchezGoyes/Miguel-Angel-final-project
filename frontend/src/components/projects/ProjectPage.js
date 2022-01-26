/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import * as action from '../../redux/project/action-creator';

export function ProjectPage() {
  const { projects } = useSelector((state) => state.projectStore);
  const { userLogged } = useSelector((state) => state.userStore);

  const dispatch = useDispatch();

  useEffect(() => dispatch(action.loadProjects()), [dispatch]);

  const template = (
    <div className="project">
      <h2 className="project__title">PROJECTS</h2>
      <div>
        {userLogged.typeUser !== 'user' || userLogged.typeUser === null ? (
          <></>
        ) : (
          <div className="project__link">
            <Link to="/myProjects">
              <Button
                role="button"
                tabIndex="-1"
                className="project__add-button"
              >
                My PROJECTS
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="project__list">
        {projects.map((project) => (
          <div className="project__li" key={project._id}>
            <div className="project__detail">
              <div className="project__card">
                <Card style={{ width: '18rem' }}>
                  <Link to={`/detail/${project._id}`}>
                    <Card.Img
                      variant="top"
                      src={project.pictures[0].avatar}
                      alt={project.brand}
                    />
                  </Link>
                  <Card.Body>
                    <Card.Title>{project.name}</Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  return template;
}
