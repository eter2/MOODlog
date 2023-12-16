const url = 'http://43.201.55.11:4000';

// 이미지 업로드
exports.uploadImage = async (file) =>{
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(`${url}/test/image`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`}, // 토큰 추가
            body: formData
        });

        if (!response.ok) {
            throw new Error('Image upload failed');
        }

        const imageUrl = await response.text();
        console.log('Uploaded Image URL:', imageUrl);
        return imageUrl;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// 게시글 생성
exports.createPost = async (blogId, title, content, images, mood, weather) => {
    try {
        const token = localStorage.getItem('token');
        const body = {
            title: title,
            content: content,
            images: images,
            mood: mood,
            weather: weather
        };
        const response = await fetch(`${url}/post/${blogId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // 토큰 추가
            },
            body: JSON.stringify(body)
        });

        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log('Post created:', responseData);
    } catch (error) {
        console.error('Error creating post:', error.message);
    }
};

//게시글 수정
exports.updatePost = async(postId, updateData)=>{
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/updatePost/${postId}`, {
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

// 내 모든 게시글 조회
exports.getPostsByUser = async(id)=>{
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/posts/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

// 게시글 조회
exports.getPost = async(postId)=>{
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/post/${postId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

// 게시글 삭제
exports.deletePost = async(postId)=>{
    const token = localStorage.getItem('token');
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/deletePost/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

// 최신 게시물 3개 조회
exports.getLatestPostsByUser = async(id)=>{
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/posts/${id}/latest`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

// 특정 월의 감정 조회
exports.getEmotionsByMonth = async(year,month)=>{
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/emotions/${year}/${month}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error fetching emotions');
        }
        const emotions = await response.json();
        console.log('Emotions fetched successfully:', emotions);
        return emotions;
      } catch (error) {
        console.error('Error during fetching emotions:', error);
      }
}

// 게시물 좋아요 개수 조회
exports.getPostLikesNum = async(postId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/likes/count/${postId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

exports.getDetailPostLikesNum = async(postId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/likes/count/${postId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

// 게시물 댓글 개수 조회
// exports.getPostCommentNum = async(postId) => {
//     try {
//         const response = await fetch(` `, {
//             method: 'GET'
//         });
//         return await response.json();
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }