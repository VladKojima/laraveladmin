import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.1.33:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export function get(route) {
    return api.get(route).then(res => res.data);
}

export function post(route, obj) {
    return api.post(route, obj);
}

export const aboutPageRoute = '/about-page';
export const bonusPointsRoute = '/bonus-points';
export const dishRoute = '/dishes';
export const eventRoute = '/events';
export const feedbackRoute = '/feedbacks';
export const hallRoute = '/halls';
export const paymentRoute = '/payments';
export const promotionRoute = '/promotions';
export const receiptRoute = '/receipts';
export const reservationRoute = '/reservations';
export const table = '/tables';
export const userRoute = '/users';