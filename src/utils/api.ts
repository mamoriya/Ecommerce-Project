import axios from "axios";
import { Product } from "../types/Product";


const Base_url = "https://fakestoreapi.com"


export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${Base_url}/products`);
  return response.data;
};


export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await axios.get(`${Base_url}/products/${id}`);
  return response.data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await axios.get(`${Base_url}/products/categories`);
  return response.data;
};