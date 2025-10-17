import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import useGifs from "./useGifs";
import *  as GifActions from "../actions/get-gifs-by-query.actions";



describe('useGifs', () => {
    test('Should return default values and Methods', () => {
        const { result } = renderHook(() => useGifs());

        expect(result.current.gifsReponse.length).toBe(0);
        expect(result.current.previousTerms.length).toBe(0);

        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handleTermClicked).toBeDefined();

    });

    test('Should return a Gif List', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleSearch('goku');
        })

        expect(result.current.gifsReponse.length).toBe(10);

    });

    test('SHould return Gif List when handleTermClicked is called', async () => {
        const { result } = renderHook(() => useGifs());

        await act(async () => {
            await result.current.handleTermClicked('goku');
        })

        expect(result.current.gifsReponse.length).toBe(10);
    });

    test('Should return Gif List from Cache', async () => {

        const { result } = renderHook(() => useGifs());


        await act(async () => {
            await result.current.handleTermClicked('goku');
        })

        expect(result.current.gifsReponse.length).toBe(10);

        //This spyOn is to force an error when the getGifsByQuery is call
        //returning the error define.
        //This is to test the data comes from the cache
        //Antoher Approach you can find in the Should return Gif List from Cache2
        vi.spyOn(GifActions, "getGifsByQuery").mockRejectedValue(new Error('This is a expected Mock Error'));

        await act(async () => {
            await result.current.handleTermClicked('goku');
        })

        expect(result.current.gifsReponse.length).toBe(10);
    });

    // test('Should return Gif List from Cache2', async () => {

    //     const { result } = renderHook(() => useGifs());

    //     await act(async () => {
    //         await result.current.handleTermClicked("goku");
    //     });

    //     expect(result.current.gifsReponse.length).toBe(10);
    //     const getGifSpy = vi.spyOn(GifActions, "getGifsByQuery")

    //     await act(async () => {
    //         await result.current.handleTermClicked("goku");
    //     });

    //     expect(result.current.gifsReponse.length).toBe(10);
    //     expect(getGifSpy).not.toHaveBeenCalled()
    // });


    test('Should return no more than 8 previous terms', async () => {
        const { result } = renderHook(() => useGifs());
        vi.spyOn(GifActions, "getGifsByQuery").mockResolvedValue([]);

        await act(async () => {
            await result.current.handleSearch('goku');
        });

        await act(async () => {
            await result.current.handleSearch('goku2');
        });

        await act(async () => {
            await result.current.handleSearch('goku3');
        });

        await act(async () => {
            await result.current.handleSearch('goku4');
        });

        await act(async () => {
            await result.current.handleSearch('goku5');
        });

        await act(async () => {
            await result.current.handleSearch('goku6');
        });

        await act(async () => {
            await result.current.handleSearch('goku7');
        });

        await act(async () => {
            await result.current.handleSearch('goku8');
        });

        await act(async () => {
            await result.current.handleSearch('goku9');
        });

        expect(result.current.previousTerms.length).toBe(8);
        expect(result.current.previousTerms).toStrictEqual(
            [
                'goku9', 'goku8',
                'goku7', 'goku6',
                'goku5', 'goku4',
                'goku3', 'goku2'
            ]
        );

    });

})


