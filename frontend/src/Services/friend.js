const url = 'http://43.201.55.11:4000';

exports.getFriendList = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${url}/friends`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during get friend list:', error);
  }
}

exports.searchFriend = async (id) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${url}/friends/search/${id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
    });

    if (response.status === 404) {
      console.log('User not found');
      return([]);

    } else if (response.status === 200) {
      const data = await response.json();
      let result = [];
      result.push(data);
      return result;
    }
  } catch (error) {
    console.error('Error during get search list:', error);
  }
}

exports.getReceivedFriendRequests = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${url}/friendsRequest`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during get search list:', error);
  }
}

exports.getSentFriendRequests = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`${url}/sentfriendsRequest`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during get search list:', error);
  }
}

exports.sendFriendRequest = async(userId) => {
  try {
      const token = localStorage.getItem('token');
    const response = await fetch(`${url}/friends/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

exports.rejectFriendRequest = async(requestId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${url}/friend_reject`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ requestId: requestId })
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

exports.acceptFriendRequest = async(requestId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${url}/friend_accept`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ requestId: requestId })
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

exports.cancelFriendRequest = async(requestId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${url}/friend_cancel`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ requestId: requestId })
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}

exports.removeFriend = async(userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${url}/friends/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}