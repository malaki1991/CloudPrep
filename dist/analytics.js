const analyticsContainer = 'GTM-WRDH8BPC';
const analyticsDestination = 'G-8DV8E5VPDD';
const analyticsEnabled = location.origin === 'https://malaki1991.github.io' &&
  location.pathname.startsWith('/CloudPrep/');

function gtag() { window.dataLayer.push(arguments); }

if (analyticsEnabled) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtm.js?id=' + analyticsContainer;
  document.head.append(script);
}

function trackExam(code) {
  if (analyticsEnabled) gtag('event','exam_started',{send_to:analyticsDestination,exam_code:code});
}
