import {useQuery} from '@tanstack/react-query';

import {
  PRICE_MULTIPLIER,
  STALE_TIME_MS,
} from '@constants/student';
import {apiClient} from '@services/apiClient';

export type Product = {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
};

type FakeStoreProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

const getProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get<FakeStoreProduct[]>(
    '/products?limit=12',
  );

  return response.data.map(item => ({
    id: item.id,
    title: item.title,
    image: item.image,
    description: item.description,
    price: Math.round(item.price * PRICE_MULTIPLIER),
  }));
};

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: STALE_TIME_MS,
  });
};