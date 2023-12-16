const url = 'http://43.201.55.11:4000'

// 댓글 생성
exports.createComment = async(postId, content) => {
    try {
        const token = localStorage.getItem('token');
        const user_id = localStorage.getItem('userId');
        const response = await fetch(`${url}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ post_id: postId, content: content, user_id: user_id })
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

// 댓글 조회
exports.getComment = async(commentId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/comment/${commentId}`, {
            method: 'GET',
            'Authorization': `Bearer ${token}`,
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

// 댓글 수정
exports.updateComment = async(commentId,updateData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/comment/${commentId}`, {
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

// 댓글 삭제
exports.deleteComment = async(commentId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/comment/${commentId}`, {
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

// 게시물의 모든 댓글 조회
exports.getCommentsByPost = async(postId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/comments/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        
        return response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}
