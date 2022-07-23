import axios from 'axios';

export default axios.create({
  baseURL: 'https://moveomenu.herokuapp.com/api',
});
