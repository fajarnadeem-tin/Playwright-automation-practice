import { test, expect } from '../../fixtures/test';
import { newBooking, updatedBooking } from '../../test-data/bookings';
import { env } from '../../utils/env';

test.describe('Booking API', () => {
  test('valid credentials return an auth token', { tag: '@smoke' }, async ({ bookingApi }) => {
    const response = await bookingApi.createToken(env.bookerUsername, env.bookerPassword);

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual({ token: expect.any(String) });
  });

  test(
    'invalid credentials do not return a token',
    { tag: '@regression' },
    async ({ bookingApi }) => {
      const response = await bookingApi.createToken(env.bookerUsername, 'wrong');

      // restful-booker answers 200 with a reason instead of 401 (a known quirk).
      expect(response.status()).toBe(200);
      expect(await response.json()).toEqual({ reason: 'Bad credentials' });
    },
  );

  test('user can create a booking', { tag: '@smoke' }, async ({ bookingApi }) => {
    const response = await bookingApi.createBooking(newBooking);

    expect(response.status()).toBe(200);
    // Schema check: id is a number and the booking echoes what we sent.
    expect(await response.json()).toEqual({ bookingid: expect.any(Number), booking: newBooking });
  });

  test('user can read a booking by id', { tag: '@regression' }, async ({ bookingApi }) => {
    const { bookingid } = await (await bookingApi.createBooking(newBooking)).json();

    const response = await bookingApi.getBooking(bookingid);

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(newBooking);
  });

  test('user can update a booking with a token', { tag: '@regression' }, async ({ bookingApi }) => {
    const { bookingid } = await (await bookingApi.createBooking(newBooking)).json();
    const token = await bookingApi.getToken(env.bookerUsername, env.bookerPassword);

    const response = await bookingApi.updateBooking(bookingid, updatedBooking, token);

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(updatedBooking);
  });

  test(
    'updating a booking without a token is forbidden',
    { tag: '@regression' },
    async ({ bookingApi }) => {
      const { bookingid } = await (await bookingApi.createBooking(newBooking)).json();

      const response = await bookingApi.updateBooking(bookingid, updatedBooking);

      expect(response.status()).toBe(403);
    },
  );

  test('user can delete a booking', { tag: '@regression' }, async ({ bookingApi }) => {
    const { bookingid } = await (await bookingApi.createBooking(newBooking)).json();
    const token = await bookingApi.getToken(env.bookerUsername, env.bookerPassword);

    const response = await bookingApi.deleteBooking(bookingid, token);

    // restful-booker returns 201 for a successful delete (another quirk).
    expect(response.status()).toBe(201);
    expect((await bookingApi.getBooking(bookingid)).status()).toBe(404);
  });

  test(
    'reading a non-existent booking returns 404',
    { tag: '@regression' },
    async ({ bookingApi }) => {
      const response = await bookingApi.getBooking(999999999);

      expect(response.status()).toBe(404);
    },
  );
});
