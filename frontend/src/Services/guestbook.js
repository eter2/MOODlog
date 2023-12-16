const url = 'http://43.201.55.11:4000';

exports.addGuestComment = async (blogId, content) => {
  try {
      const token = localStorage.getItem('token');
    const response = await fetch(`${url}/guest_comments/${blogId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    });

    if (!response.ok) {
      throw new Error('Error in adding guest comment');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in addGuestComment:', error);
  }
};

exports.getGuestComments = async (blogId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${url}/guest_comments/${blogId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error in fetching guest comments');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getGuestComments:', error);
  }
};

const updateGuestComment = async (ownerId, guestBookId, content) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${url}/guest_comments/${ownerId}/${guestBookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    });

    if (!response.ok) {
      throw new Error('Error in updating guest comment');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in updateGuestComment:', error);
  }
};

exports.deleteGuestComment = async(commentId) => {
  try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${url}/guest_comments/${commentId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          },
      });
      return response.ok;
  } catch (error) {
      console.error('Error:', error);
  }
}