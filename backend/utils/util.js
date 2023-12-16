const util= {
    // 성공 응답 형식
    success: function (statusCode, message, data) {
        return {
            status: 'success',
            code: statusCode,
            message: message,
            data: data
        };
    },

    // 실패 응답 형식
    fail: function (statusCode, message) {
        return {
            status: 'fail',
            code: statusCode,
            message: message
        };
    },
}

module.exports = util;