const checkResponse = (res: Response) =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const fetch24hrTickerData = () =>
  fetch("https://api.binance.com/api/v3/ticker/24hr")
    .then((res) => checkResponse(res))
    .then((data) => {
      if (data) { 
        return data
      };
      return Promise.reject(data);
    });