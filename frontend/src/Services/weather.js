const url = 'http://43.201.55.11:4000';

exports.getPostWeather = async () => {
  try {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');

    const response = await fetch(`${url}/posts/weather/count/${id}/${year}/${month}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during login:', error);
  }
}