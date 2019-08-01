import Amplify, { Auth } from 'aws-amplify';
import config from './config';

export default async function configureAmplify() {
  Amplify.configure({
    Auth: {
      mandatorySignIn: false,
      region: config.cognito.REGION,
      identityPoolId: config.cognito.IDENTITY_POOL_ID
    },
    Storage: {
      region: config.s3.REGION,
      bucket: config.s3.BUCKET,
      identityPoolId: config.cognito.IDENTITY_POOL_ID
    },
    API: {
      endpoints: [
        {
          name: 'stage',
          endpoint: config.apiGateway.URL,
          region: config.apiGateway.REGION
        }
      ]
    }
  });

  await Auth.currentCredentials();
}
