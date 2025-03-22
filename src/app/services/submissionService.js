import axios from 'axios';

const API = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getUserByEmail = async (email) => {
    return axios.get(`${API}/api/submissions/${email}`);
};

export const saveContactInfo = (data) => {
    localStorage.setItem('contactInfo', JSON.stringify(data));
};

export const saveAnswers = (answers) => {
    localStorage.setItem('questionAnswers', JSON.stringify(answers));
};

export const getAnswers = () => {
    const stored = localStorage.getItem('questionAnswers');
    return stored ? JSON.parse(stored) : {};
};

export const getContactInfo = () => {
    const stored = localStorage.getItem('contactInfo');
    return stored ? JSON.parse(stored) : {};
};
