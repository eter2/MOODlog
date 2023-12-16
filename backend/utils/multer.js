const multer = require('multer');
const multer_s3 = require('multer-s3');
const AWS = require('aws-sdk');

// AWS 자격증명 설정 (예: 환경 변수 사용)
AWS.config.update({
  accessKeyId: 'AKIAYILC45LAZ3KKOQAZ',
  secretAccessKey: '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',
  region: 'ap-northeast-2' // 원하는 AWS 리전 설정
});

// S3 객체 생성
const s3 = new AWS.S3();

// S3 버킷 목록 조회 예시
s3.listBuckets((err, data) => {
  if (err) console.log(err, err.stack); // 오류 발생 시
  else console.log(data); // 성공 시 결과 출력
});

const storage = multer_s3({
    s3: s3,
    bucket: 'cyword', // 자신의 s3 버킷 이름
    contentType: multer_s3.AUTO_CONTENT_TYPE,
    acl: 'public-read', // 버킷에서 acl 관련 설정을 풀어줘야 사용할 수 있다.
    metadata: function(req, file, cb) {
        cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
        cb(null, `contents/${Date.now()}_${file.originalname}`);
    }
})

exports.upload = multer({
    storage: storage // storage를 multer_s3 객체로 지정
})