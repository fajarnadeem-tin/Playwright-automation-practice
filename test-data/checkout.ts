export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export const validCustomer: CheckoutInfo = {
  firstName: 'Fajar',
  lastName: 'Nadeem',
  postalCode: '54000',
};

export interface MissingFieldCase {
  field: keyof CheckoutInfo;
  info: CheckoutInfo;
  expectedError: string;
}

export const missingFieldCases: MissingFieldCase[] = [
  {
    field: 'firstName',
    info: { ...validCustomer, firstName: '' },
    expectedError: 'Error: First Name is required',
  },
  {
    field: 'lastName',
    info: { ...validCustomer, lastName: '' },
    expectedError: 'Error: Last Name is required',
  },
  {
    field: 'postalCode',
    info: { ...validCustomer, postalCode: '' },
    expectedError: 'Error: Postal Code is required',
  },
];
