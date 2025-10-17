import { describe, expect, test, vi } from "vitest";
import AxiosMockAdapter from 'axios-mock-adapter';

import { getGifsByQuery } from "./get-gifs-by-query.actions";
import { giphyAPI } from "../api/giphy.api";
import { giphyResponseMock } from '../../../test/mock/giphy.response';
import { beforeEach } from "node:test";


describe('get-gifs-by-query.actions', () => {

    let mock = new AxiosMockAdapter(giphyAPI);

    beforeEach(() => {
        mock = new AxiosMockAdapter(giphyAPI);
    })


    // test('Should return a Gif List', async () => {
    //     const gifs = await getGifsByQuery('goku');

    //     const [gif1] = gifs;
    //     expect(gif1).toStrictEqual({
    //         id: expect.any(String),
    //         title: expect.any(String),
    //         url: expect.any(String),
    //         width: expect.any(Number),
    //         height: expect.any(Number),
    //     })
    // });

    test('SHould Return a Gif List', async () => {
        mock.onGet('/search').reply(200, giphyResponseMock);
        const gifs = await getGifsByQuery('goku');
        expect(gifs.length).toBe(10);

        gifs.forEach(gif => {
            expect(typeof gif.id).toBe('string');
            expect(typeof gif.title).toBe('string');
            expect(typeof gif.url).toBe('string');
            expect(typeof gif.width).toBe('number');
            expect(typeof gif.height).toBe('number');
        });
    });

    test('SHould handle error when API Return an Error', async () => {
        //se mock la funcion console.error
        const consoleErrroSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        mock.onGet('/search').reply(400, {
            data: {
                message: 'Bad Request'
            }
        });

        const gifs = await getGifsByQuery('Goku');

        expect(gifs.length).toBe(0);

        expect(consoleErrroSpy).toHaveBeenCalled();
        expect(consoleErrroSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrroSpy).toHaveBeenCalledWith(expect.anything());

    });

    test('Should return EMpty list if query is empty', async () => {
        //Esto resetea instancia y desecha el mock
        mock.restore();

        const gifs = await getGifsByQuery('');
        expect(gifs.length).toBe(0);

    });
})