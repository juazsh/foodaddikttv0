export enum USER_TYPE {
  ADMIN,
  OWNER,
  CUSTOMER
}

export const getAverageRating = (o) => (o.reviews.reduce((s, r) => s + r.rating, 0 )) / o.reviews.length