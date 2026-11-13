const analyticsId = '';
const analyticsEnabled = /^G-[A-Z0-9]+$/.test(analyticsId) &&
  location.origin === 'https://malaki1991.github.io' && location.pathname.startsWith('/CloudPrep/');

function gtag() { window.dataLayer.push(arguments); }

if (analyticsEnabled) {
  window.dataLayer = window.dataLayer || [];
  gtag('js',new Date());
  gtag('config',analyticsId,{
    page_location:location.origin + '/CloudPrep/',
    allow_google_signals:false,
    allow_ad_personalization_signals:false
  });
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + analyticsId;
  document.head.append(script);
}

function trackExam(code) {
  if (analyticsEnabled) gtag('event','exam_started',{exam_code:code});
}
