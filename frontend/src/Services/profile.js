const url = 'http://43.201.55.11:4000';

// 프로필 가져오기
exports.getProfileByUserId = async (id) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${url}/profile/${id}`, {
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

// 프로필 업데이트
exports.updateProfile = async(blog_name, image, username, about)=>{
  try {
    const token = localStorage.getItem('token');
    const updateData = {
      blog_name: blog_name,
      image: image,
      username: username,
      about: about,
    };

    const response = await fetch(`${url}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updateData)
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}