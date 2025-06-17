export var amplify_config = {
    Auth: {
        identityPoolId: '',
        region: 'ap-northeast-1',
        userPoolId: '',
        userPoolWebClientId: '',
    },
    Storage: {
        bucket: '',
        region: 'ap-northeast-1'
    },
    API: {
        endpoints: [{
            name: 'photo-api',
            endpoint: '',
            region: 'ap-northeast-1'
        }]
    }
};

export default amplify_config;
