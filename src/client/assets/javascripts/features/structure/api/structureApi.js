import axios from 'axios';

export default class StructureApi {

  static getStructure(id) {
    const request = axios.get(`/api/structure/${id}`);

    return request.then(response => {
      return response.data;
    }).catch(error => {
      return error;
    });
  }

  static saveStructure(structure) {
    
    const request = axios({
      method: 'put',
      data: structure,
      url: `/api/structure/${structure.id}`,
    });

    return request.then(response => {
      return response.data;
    }).catch(error => {
      return error;
    });
  }

  static createStructure(structure) {
    const request = axios({
      method: 'post',
      data: structure,
      url: '/api/structure',
    });

    //return request;

    return request.then(response => {
      console.log('got response')
      return response.data;
    }).catch(error => {
      return error;
    });
  }

  static deleteStructure(structure) {
    const request = axios({
      method: 'delete',
      url: `/api/structure/${structure.id}`,
    });

    return request.then(response => {
      return response.data;
    }).catch(error => {
      return error;
    });
  }
}