export const BASE_URL = `http://192.168.29.174:3001/api/`;

export const ADD_USER = BASE_URL +`users/register`;

export const LOGIN = BASE_URL +`users/login`;

//token 
// users details 
export const GET_USER = BASE_URL +`users/getUserDetailById`; 
export const GET_USER_PASSWORD = BASE_URL +`users/getUserPasswordById`; 
export const GET_ALL_USER = BASE_URL +`users/getUserDetails`;
export const UPDATE_USER = BASE_URL +`users/updateUserDetailById`;
export const DELETE_USER = BASE_URL +`users/deleteUserDetailById`; 
export const UPDATE_ADMIN_PASSWORD = BASE_URL +`users/updateAdminPasswordById`;