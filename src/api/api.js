import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://26.218.94.94:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    },
});

export function get(route) {
    return api.get(route).then(res => res.data);
}

export function post(route, obj) {
    return api.post(route, obj);
}

export function put(route, obj) {
    return api.put(route, obj);
}

export function del(route, obj) {
    return api.delete(route, { data: obj });
}

export const listRoutes = {
    BonusPoints: '/bonus-points',
    Dish: '/dishes',
    // Event: '/events',
    // Feedback: '/feedbacks',
    Hall: '/halls',
    // Payment: '/payments',
    // Promotion: '/promotions',
    // Receipt: '/receipts',
    // Reservation: '/reservations',
    Table: '/tables',
    User: '/users',
}

export const routes = {
    aboutPage: '/about-page',
}