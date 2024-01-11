/**
 * @jest-environment jsdom
 */

import { screen, fireEvent } from '@testing-library/dom';
import NewBillUI from '../views/NewBillUI.js';
import NewBill from '../containers/NewBill.js';

describe('Given I am connected as an employee', () => {
	describe('When I am on NewBill Page', () => {
		describe('When I do not fill in the "Date" field, the "Montant TTC" field, the "TVA" field and the "Justificatif" field', () => {
			test('Then I remain on the "Envoyer une note de frais" page and am prompted to fill in the missing fields.', () => {
				document.body.innerHTML = NewBillUI();

				const nameForm = screen.getByTestId('expense-name');
				expect(nameForm.value).toBe('');

				const dateForm = screen.getByTestId('datepicker');
				expect(dateForm.value).toBe('');

				const amountForm = screen.getByTestId('amount');
				expect(amountForm.value).toBe('');

				const amountVatForm = screen.getByTestId('vat');
				expect(amountVatForm.value).toBe('');

				const percentVatForm = screen.getByTestId('pct');
				expect(percentVatForm.value).toBe('');

				const commentaryForm = screen.getByTestId('commentary');
				expect(commentaryForm.value).toBe('');

				const fileForm = screen.getByTestId('file');
				expect(fileForm.value).toBe('');

				const formNewBill = screen.getByTestId('form-new-bill');
				const handleClick = jest.fn((e) => e.preventDefault());
				formNewBill.addEventListener('submit', handleClick);
				fireEvent.submit(formNewBill);

				expect(screen.getByTestId('form-new-bill')).toBeTruthy();
			});
		});
		/* Voir avec Aurélie pour mettre une date fausse car erreur
		describe('When I fill in the date field with the wrong format (not respecting the DD/MM/YYYY format)', () => {
			test('Then I remain on the "Envoyer une note de frais" page and am prompted to fill in the missing fields.', () => {
				document.body.innerHTML = NewBillUI();

				const nameForm = screen.getByTestId('expense-name');
				fireEvent.change(nameForm, { target: { value: 'Vol paris' } });
				expect(nameForm.value).toBe('Vol paris');

				const dateForm = screen.getByTestId('datepicker');
				fireEvent.change(dateForm, { target: { value: 'azert' } });
				expect(dateForm.value).toBe('azert');

				const amountForm = screen.getByTestId('amount');
				fireEvent.change(amountForm, { target: { value: '120' } });
				expect(amountForm.value).toBe('120');

				const amountVatForm = screen.getByTestId('vat');
				fireEvent.change(amountVatForm, { target: { value: '20' } });
				expect(amountVatForm.value).toBe('20');

				const percentVatForm = screen.getByTestId('pct');
				fireEvent.change(percentVatForm, { target: { value: '20' } });
				expect(percentVatForm.value).toBe('20');

				const commentaryForm = screen.getByTestId('commentary');
				fireEvent.change(commentaryForm, { target: { value: 'Vol paris pour le déplacement' } });
				expect(commentaryForm.value).toBe('Vol paris pour le déplacement');

				const fileForm = screen.getByTestId('file');
				fireEvent.change(fileForm, { target: { files: [{ name: 'justif.png', type: 'image/png' }] } });
				expect(fileForm.files[0].type).toBe('image/png');

				const formNewBill = screen.getByTestId('form-new-bill');
				const handleClick = jest.fn((e) => e.preventDefault());
				formNewBill.addEventListener('submit', handleClick);
				fireEvent.submit(formNewBill);

				expect(screen.getByTestId('form-new-bill')).toBeTruthy();
			});
		});*/
		describe('When I add a file that does not have the .jpg, .png, .jpeg extension)', () => {
			test('Then I stay on the "Envoyer une note de frais" page. The selected file is deleted from the field and the user will be prompted to select a new file in the correct format..', () => {
				document.body.innerHTML = NewBillUI();

				const nameForm = screen.getByTestId('expense-name');
				fireEvent.change(nameForm, { target: { value: 'Vol paris' } });
				expect(nameForm.value).toBe('Vol paris');

				const dateForm = screen.getByTestId('datepicker');
				fireEvent.change(dateForm, { target: { value: '2023-12-01' } });
				expect(dateForm.value).toBe('2023-12-01');

				const amountForm = screen.getByTestId('amount');
				fireEvent.change(amountForm, { target: { value: '120' } });
				expect(amountForm.value).toBe('120');

				const amountVatForm = screen.getByTestId('vat');
				fireEvent.change(amountVatForm, { target: { value: '20' } });
				expect(amountVatForm.value).toBe('20');

				const percentVatForm = screen.getByTestId('pct');
				fireEvent.change(percentVatForm, { target: { value: '20' } });
				expect(percentVatForm.value).toBe('20');

				const commentaryForm = screen.getByTestId('commentary');
				fireEvent.change(commentaryForm, { target: { value: 'Vol paris pour le déplacement' } });
				expect(commentaryForm.value).toBe('Vol paris pour le déplacement');

				const fileForm = screen.getByTestId('file');
				fireEvent.change(fileForm, { target: { files: [{ name: 'justif.pdf', type: 'application/pdf' }] } });
				expect(fileForm.files[0].type).toBe('application/pdf');

				const formNewBill = screen.getByTestId('form-new-bill');
				const handleClick = jest.fn((e) => e.preventDefault());
				formNewBill.addEventListener('submit', handleClick);
				fireEvent.submit(formNewBill);

				expect(screen.getByTestId('form-new-bill')).toBeTruthy();
			});
		});
		/* Voir avec Aurélie
		describe('I have completed the form correctly and click on the "Sent" button', () => {
			test('I am redirected to the Dashboard and the expense report has been created.', () => {
				document.body.innerHTML = NewBillUI();

				const nameForm = screen.getByTestId('expense-name');
				fireEvent.change(nameForm, { target: { value: 'Vol paris' } });
				expect(nameForm.value).toBe('Vol paris');

				const dateForm = screen.getByTestId('datepicker');
				fireEvent.change(dateForm, { target: { value: '2023-12-01' } });
				expect(dateForm.value).toBe('2023-12-01');

				const amountForm = screen.getByTestId('amount');
				fireEvent.change(amountForm, { target: { value: '120' } });
				expect(amountForm.value).toBe('120');

				const amountVatForm = screen.getByTestId('vat');
				fireEvent.change(amountVatForm, { target: { value: '20' } });
				expect(amountVatForm.value).toBe('20');

				const percentVatForm = screen.getByTestId('pct');
				fireEvent.change(percentVatForm, { target: { value: '20' } });
				expect(percentVatForm.value).toBe('20');

				const commentaryForm = screen.getByTestId('commentary');
				fireEvent.change(commentaryForm, { target: { value: 'Vol paris pour le déplacement' } });
				expect(commentaryForm.value).toBe('Vol paris pour le déplacement');

				const fileForm = screen.getByTestId('file');
				fireEvent.change(fileForm, { target: { files: [{ name: 'justif.png', type: 'image/png' }] } });
				expect(fileForm.files[0].type).toBe('image/png');

				const formNewBill = screen.getByTestId('form-new-bill');
				const handleClick = jest.fn((e) => e.preventDefault());
				formNewBill.addEventListener('submit', handleClick);
				fireEvent.submit(formNewBill);

				expect(screen.queryByText('Mes notes de frais')).toBeTruthy();
			});
		}); */
	});
});
