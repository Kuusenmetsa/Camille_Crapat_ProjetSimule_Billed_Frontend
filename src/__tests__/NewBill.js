/**
 * @jest-environment jsdom
 */

import { screen, fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import NewBillUI from '../views/NewBillUI.js';
import NewBill from '../containers/NewBill.js';
import { ROUTES } from '../constants/routes.js';
import { localStorageMock } from '../__mocks__/localStorage.js';

describe('Given I am connected as an employee', () => {
	describe('When I am on NewBill Page', () => {
		Object.defineProperty(window, 'localStorage', { value: localStorageMock });
		window.localStorage.setItem(
			'user',
			JSON.stringify({
				type: 'Employee',
			})
		);
		document.body.innerHTML = NewBillUI();

		const onNavigate = (pathname) => {
			document.body.innerHTML = ROUTES({ pathname });
		};

		const newBill = new NewBill({
			document,
			onNavigate,
			store: null,
			localStorage: localStorageMock,
		});
		describe('When I do not fill in the "Date" field, the "Montant TTC" field, the "TVA" field and the "Justificatif" field', () => {
			test('Then an error message appears', () => {
				const dateForm = screen.getByTestId('datepicker');
				expect(dateForm.value).toBe('');
				expect(dateForm.validationMessage).toBe('Constraints not satisfied');

				const amountForm = screen.getByTestId('amount');
				expect(amountForm.value).toBe('');
				expect(amountForm.validationMessage).toBe('Constraints not satisfied');

				const percentVatForm = screen.getByTestId('pct');
				expect(percentVatForm.value).toBe('');
				expect(percentVatForm.validationMessage).toBe('Constraints not satisfied');

				const fileForm = screen.getByTestId('file');
				expect(fileForm.value).toBe('');
				expect(fileForm.validationMessage).toBe('Constraints not satisfied');
			});
		});
		describe('When I fill in the date field with the wrong format (not respecting the DD/MM/YYYY format)', () => {
			test('Then the field becomes empty', () => {
				const dateForm = screen.getByTestId('datepicker');
				fireEvent.change(dateForm, { target: { value: 'azert' } });
				expect(dateForm.value).toBe('');
			});
		});
		describe('When I add a file that does not have the .jpg, .png, .jpeg extension', () => {
			test('Then an error message appears', () => {
				const fileForm = screen.getByTestId('file');
				const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
				const fileChange = jest.fn((e) => {
					newBill.handleChangeFile(e);
				});
				fileForm.addEventListener('change', (e) => fileChange(e));

				fireEvent.change(fileForm, {
					target: { files: [file] },
				});
				expect(fileChange).toBeCalled();
				expect(fileForm.validationMessage).toBe('Constraints not satisfied');
			});
		});
		describe('I have completed the form correctly and click on the "Sent" button', () => {
			test('I am redirected to the Dashboard', () => {
				const nameForm = screen.getByTestId('expense-name');
				fireEvent.change(nameForm, { target: { value: 'Vol paris' } });
				expect(nameForm.value).toBe('Vol paris');
				expect(nameForm.validationMessage).not.toBe('Constraints not satisfied');

				const dateForm = screen.getByTestId('datepicker');
				fireEvent.change(dateForm, { target: { value: '2023-12-01' } });
				expect(dateForm.value).toBe('2023-12-01');
				expect(dateForm.validationMessage).not.toBe('Constraints not satisfied');

				const amountForm = screen.getByTestId('amount');
				fireEvent.change(amountForm, { target: { value: '120' } });
				expect(amountForm.value).toBe('120');
				expect(amountForm.validationMessage).not.toBe('Constraints not satisfied');

				const amountVatForm = screen.getByTestId('vat');
				fireEvent.change(amountVatForm, { target: { value: '20' } });
				expect(amountVatForm.value).toBe('20');
				expect(amountVatForm.validationMessage).not.toBe('Constraints not satisfied');

				const percentVatForm = screen.getByTestId('pct');
				fireEvent.change(percentVatForm, { target: { value: '20' } });
				expect(percentVatForm.value).toBe('20');
				expect(percentVatForm.validationMessage).not.toBe('Constraints not satisfied');

				const commentaryForm = screen.getByTestId('commentary');
				fireEvent.change(commentaryForm, { target: { value: 'Vol paris pour le déplacement' } });
				expect(commentaryForm.value).toBe('Vol paris pour le déplacement');
				expect(commentaryForm.validationMessage).not.toBe('Constraints not satisfied');

				const fileForm = screen.getByTestId('file');
				const file = new File(['test'], 'test.png', { type: 'image/png' });
				const fileChange = jest.fn((e) => {
					newBill.handleChangeFile(e);
				});

				fireEvent.change(fileForm, {
					target: { files: { item: () => file, length: 1, 0: file } },
				});

				fileForm.addEventListener('change', (e) => fileChange(e));

				expect(fileForm.files[0].type).not.toBeUndefined();
				expect(fileForm.validationMessage).not.toBe('Constraints not satisfied');

				const formNewBill = screen.getByTestId('form-new-bill');
				const handleClick = jest.fn((e) => {
					newBill.handleSubmit(e);
				});
				formNewBill.addEventListener('submit', (e) => handleClick(e));
				fireEvent.submit(formNewBill);

				expect(screen.queryByText('Mes notes de frais')).toBeTruthy();
			});
		});
	});
});
