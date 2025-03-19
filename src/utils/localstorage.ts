import { TCryptoAsset } from "./type";

export const getPortfolioLocalstorage = () => {
    const portfolioJSON = localStorage.getItem('portfolio');
    return portfolioJSON ? JSON.parse(portfolioJSON) : []
}

export const setItemPortfolioLocalStorage = (data: Pick<TCryptoAsset, 'symbol' | 'quantity'>): void => {
    let portfolio = getPortfolioLocalstorage();

    const existingIndex = portfolio.findIndex((item: Pick<TCryptoAsset, 'symbol' | 'quantity'>) => item.symbol === data.symbol);

    if (existingIndex !== -1) {
      portfolio[existingIndex].quantity = portfolio[existingIndex].quantity + data.quantity;
    } else {
      portfolio.push({ symbol: data.symbol, quantity: data.quantity });
    }
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
};

export const removeItemPortfolioLocalStorage = (symbol: string) => {
    const portfolio = getPortfolioLocalstorage();
    const updatedPortfolio = portfolio.filter((item: Pick<TCryptoAsset, 'symbol' | 'quantity'>) => item.symbol !== symbol) 
    localStorage.setItem('portfolio', JSON.stringify(updatedPortfolio));
}
