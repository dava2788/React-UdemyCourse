
import type { GiphyResponse } from '../interfaces/giphy.response';
import type { Gif } from '../interfaces/gif.interface';
import { giphyAPI } from '../api/giphy.api';

export async function getGifsByQuery(query: string): Promise<Gif[]> {

    //SI query viene vacio retorna un arreglo vacio
    if (query.trim().length === 0) return [];

    try {
        const response = await giphyAPI<GiphyResponse>('/search', {
            params: {
                q: query,
                limit: 10
            }
        });

        return response.data.data.map((gif) => ({
            id: gif.id,
            title: gif.title,
            url: gif.images.original.url,
            width: Number(gif.images.original.width),
            height: Number(gif.images.original.height),
        }));

    } catch (error) {
        console.error(error);
        return [];
    }






}