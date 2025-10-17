import { describe, expect, test } from "vitest";
import { giphyAPI } from "./giphy.api";

describe('giphy.api', () => {
    test('should be configured correctly', () => {
        const params = giphyAPI.defaults.params;

        expect(giphyAPI.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs');

        //toStrictEqual es para comparar Objetos
        expect(params).toStrictEqual({
            lang: 'es',
            api_key: import.meta.env.VITE_GIPHY_API_KEY
        })

    });
})