import type { Product } from '../../models/Product'
import { MOCK_ACTIVE_PRODUCTS, MOCK_EXPIRED_PRODUCTS } from '../products'

export const ACTIVE_PAGE_SIZE = 5
const NETWORK_DELAY_MS = 300

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

type ActiveProductsArgs = {
  pageParam?: number
}

type PaginatedProducts = {
  items: Product[]
  nextPage?: number
}

export const fetchActiveProducts = async ({ pageParam = 0 }: ActiveProductsArgs): Promise<PaginatedProducts> => {
  await delay(NETWORK_DELAY_MS)

  const start = pageParam
  const end = Math.min(start + ACTIVE_PAGE_SIZE, MOCK_ACTIVE_PRODUCTS.length)
  const items = MOCK_ACTIVE_PRODUCTS.slice(start, end)

  return {
    items,
    nextPage: end < MOCK_ACTIVE_PRODUCTS.length ? end : undefined,
  }
}

export const fetchExpiredProducts = async (): Promise<Product[]> => {
  await delay(NETWORK_DELAY_MS)
  return MOCK_EXPIRED_PRODUCTS
}
