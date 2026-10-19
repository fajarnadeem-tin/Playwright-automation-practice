import type { APIRequestContext, APIResponse } from '@playwright/test';

export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: { checkin: string; checkout: string };
  additionalneeds?: string;
}

export interface CreatedBooking {
  bookingid: number;
  booking: Booking;
}

/** Small client for https://restful-booker.herokuapp.com (the "API page object"). */
export class BookingApi {
  constructor(private readonly request: APIRequestContext) {}

  createToken(username: string, password: string): Promise<APIResponse> {
    return this.request.post('/auth', { data: { username, password } });
  }

  async getToken(username: string, password: string): Promise<string> {
    const response = await this.createToken(username, password);
    const body = (await response.json()) as { token?: string };
    if (!body.token) throw new Error('Auth failed: no token returned');
    return body.token;
  }

  createBooking(booking: Booking): Promise<APIResponse> {
    return this.request.post('/booking', { data: booking });
  }

  getBooking(id: number): Promise<APIResponse> {
    return this.request.get(`/booking/${id}`);
  }

  updateBooking(id: number, booking: Booking, token?: string): Promise<APIResponse> {
    return this.request.put(`/booking/${id}`, {
      data: booking,
      headers: token ? { Cookie: `token=${token}` } : {},
    });
  }

  deleteBooking(id: number, token: string): Promise<APIResponse> {
    return this.request.delete(`/booking/${id}`, { headers: { Cookie: `token=${token}` } });
  }
}
