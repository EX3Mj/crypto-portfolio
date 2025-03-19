import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCryptoAsset } from "../../utils/type";
import { getAllCrypto } from "../thunk/cryptoThunk";
import { nanoid } from "nanoid";
import { removeItemPortfolioLocalStorage } from "../../utils/localstorage";

interface CryptoState {
  portfolio: { symbol: string; quantity: number }[];
  AllCrypto: TCryptoAsset[];
  isLoadingCrypto: boolean;
  selectedNewCrypto: TCryptoAsset | null;
  isDataLoaded: boolean;
}

const initialState: CryptoState = {
  portfolio: [],
  AllCrypto: [],
  isLoadingCrypto: false,
  selectedNewCrypto: null,
  isDataLoaded: false,
};

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  selectors: {},
  reducers: {
    selectCrypto: (state, action: PayloadAction<TCryptoAsset | null>) => {
      if (action.payload === null) {
        state.selectedNewCrypto = null;
      } else {
        state.selectedNewCrypto = action.payload;
      }
    },
    initialPortfolioState: (
      state,
      action: PayloadAction<{ symbol: string; quantity: number }[]>
    ) => {
      if (action.payload.length !== 0) state.portfolio = action.payload;
      else {
        state.portfolio = [];
      }
    },
    removeFromPortfolio: (state, action: PayloadAction<string>) => {
      state.AllCrypto = state.AllCrypto.map((asset) => {
        if (asset.id === action.payload) {
          state.portfolio = state.portfolio.filter(
            (item) => item.symbol !== asset.symbol
          );
          removeItemPortfolioLocalStorage(asset.symbol);
          return { ...asset, portfolio: false, quantity: null };
        }
        return asset;
      });
    },
    setItemPortfolio: (
      state,
      action: PayloadAction<{ symbol: string; quantity: number }>
    ) => {
      const { symbol, quantity } = action.payload;
      const existingItemIndex = state.portfolio.findIndex(
        (item) => item.symbol === symbol
      );
      if (existingItemIndex !== -1) {
        state.portfolio[existingItemIndex].quantity =
          quantity + state.portfolio[existingItemIndex].quantity;
      } else {
        state.portfolio.push({ symbol, quantity });
      }
    },
    updateCrypto: (
      state,
      action: PayloadAction<{
        symbol: string;
        price: number;
        change24h: number;
        portfolio?: boolean;
        quantity?: number;
      }>
    ) => {
      const asset = state.AllCrypto.find(
        (asset) => asset.symbol === action.payload.symbol
      );
      if (asset) {
        asset.price = action.payload.price;
        asset.change24h = action.payload.change24h;

        if (action.payload.portfolio !== undefined) {
          asset.portfolio = action.payload.portfolio;
        }

        if (action.payload.quantity !== undefined) {
          if (asset.quantity === null) {
            asset.quantity = action.payload.quantity;
          } else {
            asset.quantity = asset.quantity + action.payload.quantity;
            setItemPortfolio({
              symbol: asset.symbol,
              quantity: asset.quantity,
            });
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCrypto.pending, (state) => {
        state.isLoadingCrypto = true;
      })
      .addCase(getAllCrypto.rejected, (state) => {
        state.isLoadingCrypto = false;
      })
      .addCase(getAllCrypto.fulfilled, (state, action) => {
        state.AllCrypto = action.payload
          .filter(
            (crypto: any) =>
              crypto.symbol.endsWith("USDT") && crypto.lastPrice > 0
          )
          .map((crypto: any) => {
            const portfolioItem = state.portfolio.find(
              (item) => item.symbol === crypto.symbol.toLowerCase()
            );
            if (portfolioItem) {
              return {
                id: nanoid(10),
                symbol: crypto.symbol.toLowerCase(),
                price: crypto.lastPrice,
                change24h: crypto.priceChangePercent,
                portfolio: true,
                quantity: portfolioItem.quantity,
              };
            }
            return {
              id: nanoid(10),
              symbol: crypto.symbol.toLowerCase(),
              price: crypto.lastPrice,
              change24h: crypto.priceChangePercent,
              portfolio: false,
              quantity: null,
            };
          });
        state.isLoadingCrypto = false;
        state.isDataLoaded = true;
      });
  },
});

export const {
  selectCrypto,
  removeFromPortfolio,
  updateCrypto,
  initialPortfolioState,
  setItemPortfolio,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;
