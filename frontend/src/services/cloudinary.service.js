import axios from 'axios';

const baseURL = 'http://localhost:3090';

export default class ImageApi {
  static async getImages() {
    const response = await axios.get(`${baseURL}/image`);
    return response.data;
  }

  static async addImage(image) {
    const response = await axios.post(`${baseURL}/image`, image);
    return response.data;
  }

  static async updateImages(image, id) {
    const response = await axios.patch(`${baseURL}/image/${id}`, image);
    return response.data;
  }

  static async deleteImage(id) {
    const response = await axios.delete(`${baseURL}/image/${id}`);
    return response;
  }
}
