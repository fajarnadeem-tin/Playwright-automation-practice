import type { Booking } from '../api/BookingApi';

export const newBooking: Booking = {
  firstname: 'Fajar',
  lastname: 'Tester',
  totalprice: 150,
  depositpaid: true,
  bookingdates: { checkin: '2026-11-01', checkout: '2026-11-05' },
  additionalneeds: 'Breakfast',
};

export const updatedBooking: Booking = {
  ...newBooking,
  totalprice: 220,
  additionalneeds: 'Late checkout',
};
