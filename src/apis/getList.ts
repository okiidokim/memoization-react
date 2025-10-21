import { AxiosError } from 'axios';
import api from './api';

export default async function getList({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  try {
    const response = await api.get('/v2/list', {
      params: {
        page: page,
        limit: limit,
      },
    });
    return response.data;
  } catch (e: any) {
    if (e instanceof AxiosError) console.log('Axios Error : ', e);
    else console.log('알 수 없는 에러', e);
  }
}
