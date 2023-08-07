import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios-mock-adapter';
import axios from 'axios';
import PokemonPage from '../pages/index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PokemonPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
      });

    it('renders Pokemon cards when data is available', async () => {
        const mockedPokemonList = [
          {
            id: 1,
            name: 'Bulbasaur',
            stats: [],
            types: [],
          },
        ];

        const pokemonResponse  = {
            data: {
                pokemonList: mockedPokemonList
            }
        }

        mockedAxios.get.mockResolvedValue(pokemonResponse)

        act(() => {
            render(<PokemonPage />);
          });
    
       

        // screen.debug();

        await waitFor(() => {});
    
        const bulbasaurCard = screen.getByText('Bulbasaur');
        expect(bulbasaurCard).toBeInTheDocument();

      });
    it('renders loading text when data is fetching', async () => {

        const axiosMockInstance = new axiosMock(axios);
        axiosMockInstance.onGet('/api/app').reply(200, { pokemonList: [] });
    
        act(() => {
            render(<PokemonPage />);
          });
    
        expect(screen.getByText('Loading...')).toBeInTheDocument();
      });
})

