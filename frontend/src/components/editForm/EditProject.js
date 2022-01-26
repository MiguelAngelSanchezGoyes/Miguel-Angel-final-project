/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as action from '../../redux/project/action-creator';
import { editImage } from '../../redux/image/action-creator';
import './EditForm.scss';

export function EditProject() {
  const location = useLocation();
  const { from } = location.state;
  const { userLogged } = useSelector((state) => state.userStore);
  const { image } = useSelector((state) => state.imageStore);
  const [editProjectState, setEditProjectState] = useState({
    brand: '',
    name: '',
    description: '',
    viewer: '',
    blueprints: '',
    userId: userLogged._id,
    picturesId: '',
    typologyId: '61a77c576b60f1e420e721ef',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (evt, control) => {
    setEditProjectState({ ...editProjectState, [control]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(action.editProject(editProjectState, from._id));
    setEditProjectState({
      brand: '',
      name: '',
      description: '',
      viewer: '',
      blueprints: '',
      userId: userLogged._id,
      typologyId: '61a77c576b60f1e420e721ef',
    });
    navigate('/myProjects');
  };

  const handleImage = (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('image', evt.target.files[0]);
    dispatch(editImage(formData, image._id));
    setEditProjectState({
      brand: '',
      name: '',
      description: '',
      viewer: '',
      blueprints: '',
      userId: userLogged._id,
      picturesId: image._id,
      typologyId: '61a77c576b60f1e420e721ef',
    });
  };

  const template = (
    <div>
      <div className="addProject__title">
        <h2>EDIT PROJECT</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex-row">
          <label className="lf--label" htmlFor="image"></label>
          <input
            id="image"
            className="lf--input"
            placeholder="Image"
            type="file"
            onChange={(ev) => handleImage(ev, 'image')}
          />
        </div>
        <div className="flex-row">
          <label className="lf--label" htmlFor="brand"></label>
          <input
            id="brand"
            className="lf--input"
            placeholder="Brand"
            type="text"
            value={editProjectState.brand}
            required
            onChange={(ev) => handleChange(ev, 'brand')}
          />
        </div>
        <div className="flex-row">
          <label className="lf--label" htmlFor="username"></label>
          <input
            id="username"
            className="lf--input"
            placeholder="Username"
            type="text"
            value={editProjectState.name}
            required
            onChange={(ev) => handleChange(ev, 'name')}
          />
        </div>
        <div className="flex-row">
          <label className="lf--label" htmlFor="description"></label>
          <input
            id="description"
            className="lf--input"
            placeholder="Description"
            type="text"
            value={editProjectState.description}
            required
            onChange={(ev) => handleChange(ev, 'description')}
          />
        </div>
        <div className="flex-row">
          <label className="lf--label" htmlFor="viewer"></label>
          <input
            id="viewer"
            className="lf--input"
            placeholder="Viewer"
            type="text"
            value={editProjectState.viewer}
            required
            onChange={(ev) => handleChange(ev, 'viewer')}
          />
        </div>
        <div className="flex-row">
          <label className="lf--label" htmlFor="blueprints"></label>
          <input
            id="blueprints"
            className="lf--input"
            placeholder="Blueprints"
            type="text"
            value={editProjectState.blueprints}
            required
            onChange={(ev) => handleChange(ev, 'blueprints')}
          />
        </div>
        <input className="lf--submit" type="submit" value="EDIT" />
      </form>
    </div>
  );
  return template;
}
