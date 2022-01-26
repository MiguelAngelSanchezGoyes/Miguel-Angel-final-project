import React from 'react';
import { fireEvent, render, screen } from '../../utils/test.utils';
import { EditProject } from './EditProject';

describe('Given a Register component', () => {
  describe('When is rendered', () => {
    beforeEach(() => {
      render(<EditProject />);
    });
    test('Then print form for user', () => {
      const inputImage = screen.getByPlaceholderText('Image');
      const inputUsername = screen.getByPlaceholderText('Username');
      const inputBrand = screen.getByPlaceholderText('Brand');
      const inputDescription = screen.getByPlaceholderText('Description');
      const inputViewer = screen.getByPlaceholderText('Viewer');
      const inputBlueprints = screen.getByPlaceholderText('Blueprints');
      const editButton = screen.getByRole('button');
      fireEvent.change(inputImage, { target: { value: 'Mikert' } });
      fireEvent.change(inputUsername, { target: { value: 'Mike' } });
      fireEvent.change(inputBrand, { target: { value: 'Isdi' } });
      fireEvent.change(inputDescription, { target: { value: 'Web' } });
      fireEvent.change(inputViewer, { target: { value: 'urn' } });
      fireEvent.change(inputBlueprints, { target: { value: 'no' } });
      expect(inputImage.value).toBe('Mikert');
      expect(inputUsername.value).toBe('Mike');
      expect(inputBrand.value).toBe('Isdi');
      expect(inputDescription.value).toBe('Web');
      expect(inputViewer.value).toBe('urn');
      expect(inputBlueprints.value).toBe('no');
      fireEvent.click(editButton);
    });
  });
});
