import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetch24hrTickerData } from "../../utils/crypto-api";

export const getAllCrypto = createAsyncThunk(
  "crypto/all",
  async () => await fetch24hrTickerData()
);
