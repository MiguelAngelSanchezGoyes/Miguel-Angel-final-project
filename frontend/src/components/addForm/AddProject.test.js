import React from 'react';
import { fireEvent, render, screen } from '../../utils/test.utils';
import { AddProject } from './AddProject';

describe('Given a Register component', () => {
  describe('When is rendered', () => {
    beforeEach(() => {
      render(<AddProject />);
    });
    test('Then print form for user', () => {
      const inputImage = screen.getByPlaceholderText('Image');
      const inputUsername = screen.getByPlaceholderText('Username');
      const inputBrand = screen.getByPlaceholderText('Brand');
      const inputDescription = screen.getByPlaceholderText('Description');
      const inputViewer = screen.getByPlaceholderText('Viewer');
      const inputBlueprints = screen.getByPlaceholderText('Blueprints');
      const editButton = screen.getByRole('button');
      fireEvent.change(inputImage, { target: { value: '' } });
      fireEvent.change(inputUsername, { target: { value: '' } });
      fireEvent.change(inputBrand, { target: { value: '' } });
      fireEvent.change(inputDescription, { target: { value: '' } });
      fireEvent.change(inputViewer, { target: { value: '' } });
      fireEvent.change(inputBlueprints, { target: { value: '' } });
      expect(inputImage.value).toBe('');
      expect(inputUsername.value).toBe('');
      expect(inputBrand.value).toBe('');
      expect(inputDescription.value).toBe('');
      expect(inputViewer.value).toBe('');
      expect(inputBlueprints.value).toBe('');
      fireEvent.click(editButton);
    });
  });
});
