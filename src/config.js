// export default {
//   s3: {
//     REGION: 'us-west-2',
//     BUCKET: 'stampsafe-uploads'
//   },
//   apiGateway: {
//     REGION: 'us-west-2',
//     URL: 'https://vm2imvvr6j.execute-api.us-west-2.amazonaws.com/prod'
//   },
//   cognito: {
//     REGION: 'us-west-2',
//     IDENTITY_POOL_ID: 'us-west-2:026e8fdb-0a86-4bed-9356-552147dde0b0'
//   },
//   file: {
//     allowedFileTypes: ['image/png', 'image/jpeg'],
//     allowedFileSize: 10485760
//   }
// };

const dev = {
  s3: {
    REGION: 'us-west-2',
    BUCKET: 'stampsafe-2-api-dev-attachmentsbucket-1gpnri6n5w5zs'
  },
  apiGateway: {
    REGION: 'us-west-2',
    URL: 'https://api.colemars.dev/dev'
  },
  cognito: {
    REGION: 'us-west-2',
    IDENTITY_POOL_ID: 'us-west-2:cff3cc6c-2b9f-41be-82d8-8c225e965c06'
  }
};

const prod = {
  s3: {
    REGION: 'us-west-2',
    BUCKET: 'stampsafe-2-api-prod-attachmentsbucket-1a7s34i2ixcbe'
  },
  apiGateway: {
    REGION: 'us-west-2',
    URL: 'https://api.colemars.dev/prod'
  },
  cognito: {
    REGION: 'us-west-2',
    IDENTITY_POOL_ID: 'us-west-2:52cd66b1-0252-4fe8-8cd7-929bf4bb1f37'
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod' ? prod : dev;

export default {
  // Add common config values here
  file: {
    allowedFileTypes: ['image/png', 'image/jpeg'],
    allowedFileSize: 10485760
  },
  ...config
};
