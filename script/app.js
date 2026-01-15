// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//       navigator.serviceWorker.register('/service-worker.js')
//         .then((registration) => {
//           console.log('Service Worker 등록 성공:', registration);
//         })
//         .catch((error) => {
//           console.log('Service Worker 등록 실패:', error);
//         });
//     });
//   }
  


//   let deferredPrompt;  // Install prompt를 저장할 변수

// // 'beforeinstallprompt' 이벤트가 발생하면 이를 저장
// window.addEventListener('beforeinstallprompt', (e) => {
//   e.preventDefault();  // 기본 동작을 막고
//   deferredPrompt = e;  // Prompt 이벤트를 저장
// });

// // 일정 시간이 지나면 자동으로 설치 프롬프트를 띄움
// setTimeout(() => {
//   if (deferredPrompt) {
//     // 설치 프롬프트 표시
//     deferredPrompt.prompt();

//     // 사용자가 프롬프트에 응답한 결과를 처리
//     deferredPrompt.userChoice.then((choiceResult) => {
//       if (choiceResult.outcome === 'accepted') {
//         console.log('사용자가 앱을 설치했습니다.');
//       } else {
//         console.log('사용자가 앱 설치를 취소했습니다.');
//       }
//       deferredPrompt = null; // Prompt 객체 초기화
//     });
//   }
// }, 5000); // 5초 후 자동으로 프롬프트 띄우기 (시간은 필요에 맞게 조정 가능)