const url = 'http://43.201.55.11:4000';

exports.addLike = async (postId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${url}/like/${postId}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during like:', error);
  }
}

exports.removeLike = async (postId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/like/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during login:', error);
    }
}

exports.fetchLikesByPost = async (postId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/likeStatus/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const likeStatus = await response.json();
        return likeStatus;
    } catch (error) {
        console.error('Error fetching likes:', error);
        throw error;
    }
}