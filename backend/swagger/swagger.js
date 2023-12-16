const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'This is my API Document',
    description: '이렇게 스웨거 자동생성이 됩니다.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      in: 'header',
      bearerFormat: 'JWT',
    },
  },
};

const outputFile = './swagger_output.json' // swagger-autogen이 실행 후 생성될 파일 위치와 이름
const endpointsFiles = ['./routers/auth.js', './routers/user.js', './routers/post.js'] // 읽어올 Router가 정의되어 있는 js파일들

//아래 코드에 .then() 이후를 삭제한다.
swaggerAutogen(outputFile, endpointsFiles, doc);