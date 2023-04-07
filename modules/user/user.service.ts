import { IApiResponse } from '../app/app.types';

import { GET_USERS_QRY, GET_USER_QRY } from './apollo/user.queries';

import gqlClientConnect from '@/api-config/graphql.config';

/** function to get a single user */
export const getUserHandler = async () => {
  try {
    const response = await gqlClientConnect().query({
      query: GET_USER_QRY,
    });
    const { user } = response.data;

    const dataRes: IApiResponse = {
      hasError: false,
      data: user,
    };
    return dataRes;
  } catch (error) {
    const errorRes: IApiResponse = {
      data: null,
      hasError: true,
    };
    return errorRes;
  }
};

/** function to all users */
export const getUsersHandler = async () => {
  try {
    const response = await gqlClientConnect().query({
      query: GET_USERS_QRY,
    });
    const { users } = response.data;

    const dataRes: IApiResponse = {
      hasError: false,
      data: users,
    };
    return dataRes;
  } catch (error) {
    console.log(error);
    const errorRes: IApiResponse = {
      data: undefined,
      hasError: true,
    };
    return errorRes;
  }
};
