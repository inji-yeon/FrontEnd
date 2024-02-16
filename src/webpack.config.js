module.exports = {
    // 기존의 다른 웹팩 설정들...
    resolve: {
        // 추가적인 해결 방법
        fallback: {
            net: false, // 'net' 모듈을 false로 설정
            tls: false, // 'tls' 모듈이 필요한 경우 false로 설정
            fs: false,  // 'fs' 모듈이 필요한 경우 false로 설정
            // 필요에 따라 다른 Node.js 모듈들을 추가할 수 있습니다.
        },
    },
};