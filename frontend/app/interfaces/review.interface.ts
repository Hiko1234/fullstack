import { IUser } from "./user.interface"

export interface IReview {
    id: number,
    text: string,
    rating: number,
    createdAt: Date,
    user: IUser
}

export interface IReviewCreate {
    userId: number,
    productId: number,
    createdAt: Date,
    updatedAt: Date,
    rating: number,
    text: string,
}