const url = 'http://43.201.55.11:4000';

exports.login = async (id, password) => {
  try {
    const token = localStorage.getItem('token');
    const body = {
      id : id,
      password : password
    };
    const response = await fetch(`${url}/auth/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (response.status === 200) {
      // console.log('Login successful:', data);
      return data;
    } else {
      console.error('Login failed:', data.message);
      return Promise.reject(new Error(data.message));
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
}

exports.register = async (username, email, id, password) => {
  try {
    const body = {
      username : username,
      email : email,
      id : id,
      password : password
    };
    const response = await fetch(`${url}/auth/register`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (response.status === 201) {
      console.log('User registered successfully:', data);
    } else {
      console.error('Registration failed:', data.message);
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
}


exports.checkEmail = async (email) => {
  try {
    const body = {
      email : email,
    };

    const response = await fetch(`${url}/auth/checkEmailDuplicate`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    if (response.status === 200) {
      return data.success;
    } else {
      console.error('Error during check email:', data.message);
    }
  } catch (error) {
    console.error('Error during check email:', error);
  }
}

exports.sendEmail = async (email) => {
  try {
    const response = await fetch(`${url}/auth/sendEmail/${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during check email:', error);
  }
}

exports.verify = async (email, authNumber) => {
  try {
    const body = {
      email : email,
      authNumber : authNumber
    };
    
    const response = await fetch(`${url}/verifyEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error during check email:', error);
  }
}

exports.checkId = async (id) => {
  try {
    const body = {
      id : id,
    };
    const response = await fetch(`${url}/auth/checkIdDuplicate`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    if (response.status === 200) {
      return data.success;
    } else {
      console.error('Error during check email:', data.message);
    }
  } catch (error) {
    console.error('Error during check email:', error);
  }
}

exports.logout = async () => {
  try {
    const response = await fetch(`${url}/auth/logout`, {
      method: 'POST',
      withCredentials:true,
    });
    const data = await response.json();
    if (response.status === 200) {
      console.log('Logout successful:', data.message);
    } else {
      console.error('Logout failed:', data.message);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
}

exports.changePW = async (email, password) => {
  try {
    const body = {
      email : email,
      password : password
    };

    const response = await fetch(`${url}/user/password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      return data.success;
    } else {
      console.error('Error during change password:', data.message);
    }
  } catch (error) {
    console.error('Error during change password:', error);
  }
}

exports.changeAdminPW = async (password) => {
  try {
    const token = localStorage.getItem('token');
    const body = {
      password : password
    };

    const response = await fetch(`${url}/user/password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      return data.success;
    } else {
      console.error('Error during change password:', data.message);
    }
  } catch (error) {
    console.error('Error during change password:', error);
  }
}


exports.getId = async (email) => {
  try {
    const response = await fetch(`${url}/auth/sendEmail/${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during check email:', error);
  }
}


//   exports.login = async (id, password) => {
    //     try {
    //         // 백엔드 서버의 로그인 엔드포인트 URL
    //         const url = `${url}/auth/login`;
    
    //         // HTTP POST 요청 설정
    //         const options = {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 id: id,
    //                 password: password,
    //             }),
    //         };
    
    //         // HTTP 요청 실행
    //         const response = await fetch(url, options);
    
    //         // 성공적인 응답 처리
    //         if (response.ok) {
    //             const data = await response.json();
    //             return data.tokens; // 토큰 반환
    //         } else {
    //             // 오류 응답 처리
    //             const errorData = await response.json();
    //             throw new Error(errorData.message);
    //         }
    //     } catch (error) {
    //         // 예외 처리
    //         console.error('Login error:', error);
    //         throw error;
    //     }
    // };