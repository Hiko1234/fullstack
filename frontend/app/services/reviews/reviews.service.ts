import { instance } from "@/api/api.interceptor";
import { IReviewCreate } from "@/interfaces/review.interface";

const REVIEWS = 'reviews';

export const ReviewsService = {

    async create(id: number, data: { rating: number, text: string }) {
        return instance.post<IReviewCreate>(`/${REVIEWS}/${id}`, {
            ...data,
        });
    }
};