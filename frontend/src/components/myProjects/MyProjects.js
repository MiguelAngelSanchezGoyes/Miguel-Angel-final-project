/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import * as action from '../../redux/project/action-creator';
import './MyProjects.scss';

export function MyProjects() {
  const { projects } = useSelector((state) => state.projectStore);
  const { userLogged } = useSelector((state) => state.userStore);

  const dispatch = useDispatch();

  const deletedProject = (project) => {
    dispatch(action.removeProject(project._id));
  };

  useEffect(() => dispatch(action.loadProjects()), [dispatch]);

  const template = (
    <div className="project">
      <h2 className="project__title">MY PROJECTS</h2>
      <div className="project__addButton">
        {userLogged.typeUser !== 'user' || userLogged.typeUser === null ? (
          <></>
        ) : (
          <div>
            <Link to="/addForm">
              <Button
                role="button"
                tabIndex="-1"
                className="project__add-button"
              >
                ADD PROJECT
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div>
        <Link to="/projects">
          <Button role="button" tabIndex="-1" className="project__link-button">
            PROJECTS
          </Button>
        </Link>
      </div>
      <div className="project__list">
        {projects.map((project) => (
          <div key={project._id}>
            <div className="project_detail">
              {userLogged._id === project.user._id ? (
                <>
                  <div>
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
                        <Button
                          role="button"
                          tabIndex="-1"
                          className="project__delete-button"
                          onClick={() => {
                            deletedProject(project);
                          }}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  return template;
}
