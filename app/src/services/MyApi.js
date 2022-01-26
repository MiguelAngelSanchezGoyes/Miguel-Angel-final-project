import axios from 'axios';

const baseURL = 'http://localhost:3090';

export default class MyApi {
  static async getProjects() {
    const response = await axios.get(`${baseURL}/project`);
    return response.data;
  }

  static async addProject(project) {
    const response = await axios.post(`${baseURL}/project`, project);
    return response.data;
  }

  static async updateProjects(project, id) {
    const response = await axios.patch(`${baseURL}/project/${id}`, project);
    return response.data;
  }

  static async deleteProject(id) {
    const response = await axios.delete(`${baseURL}/project/${id}`);
    return response;
  }
}
