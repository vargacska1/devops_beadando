import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

global.fetch = vi.fn();

describe('App Komponens Tesztek', () => {

  it('Helyesen megjeleníti a címet', () => {
    fetch.mockResolvedValueOnce({
      json: async () => [],
    });

    render(<App />);
    expect(screen.getByText('🏆 Kudos Wall')).toBeInTheDocument();
  });

  it('Az űrlap kitöltése és küldése meghívja az API-t', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [],
    });
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    fetch.mockResolvedValueOnce({
      json: async () => ([
        { _id: '1', recipient: 'Teszt Elek', message: 'Ez egy teszt', sender: 'Én' }
      ]),
    });

    render(<App />);

    const recipientInput = screen.getByPlaceholderText(/Kinek?/i);
    const messageInput = screen.getByPlaceholderText(/Miért?/i);
    const submitButton = screen.getByText(/Küldés/i);

    fireEvent.change(recipientInput, { target: { value: 'Teszt Elek' } });
    fireEvent.change(messageInput, { target: { value: 'Ez egy teszt' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/kudos'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            recipient: 'Teszt Elek',
            message: 'Ez egy teszt',
            sender: ''
          })
        })
      );
    });
  });
});