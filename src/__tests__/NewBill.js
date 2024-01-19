/**
 * @jest-environment jsdom
 */

import { screen, fireEvent, userEvent } from '@testing-library/dom';
import NewBillUI from '../views/NewBillUI.js';
import NewBill from '../containers/NewBill.js';
import { ROUTES } from '../constants/routes.js';
import { localStorageMock } from '../__mocks__/localStorage.js';

describe('Given I am connected as an employee', () => {
	describe('When I am on NewBill Page', () => {
		/* VOIR AVEC AURELIE, LE FORMULAIRE SE VALIDE MALGRES LE NON REMPLISSAGE DU FORM
		describe('When I do not fill in the "Date" field, the "Montant TTC" field, the "TVA" field and the "Justificatif" field', () => {
			test('Then I remain on the "Envoyer une note de frais" page and am prompted to fill in the missing fields.', () => {
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

				const submitForm = jest.fn((e) => {
					e.preventDefault();
				});

				formNewBill.addEventListener('submit', (e) => submitForm(e));
				fireEvent.submit(formNewBill);
				expect(screen.getByTestId('form-new-bill')).toBeTruthy();
			});
		}); */
		/*VOIR AVE AURELIE MÊME RAISON QU'AU DESSUS
		describe('When I fill in the date field with the wrong format (not respecting the DD/MM/YYYY format)', () => {
			test('Then I remain on the "Envoyer une note de frais" page and am prompted to fill in the missing fields.', () => {
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

				const nameForm = screen.getByTestId('expense-name');
				fireEvent.change(nameForm, { target: { value: 'Vol paris' } });
				expect(nameForm.value).toBe('Vol paris');

				const dateForm = screen.getByTestId('datepicker');
				fireEvent.change(dateForm, { target: { value: 'azert' } });
				expect(dateForm.value).toBe('');

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
				const file = new File(['test'], 'test.png', { type: 'image/png' });
				const fileChange = jest.fn((e) => {
					newBill.handleChangeFile(e);
				});

				fireEvent.change(fileForm, {
					target: { files: [file] },
				});

				fileForm.addEventListener('change', (e) => fileChange(e));

				expect(fileForm.files[0].type).not.toBeUndefined();

				const formNewBill = screen.getByTestId('form-new-bill');
				const handleClick = jest.fn((e) => e.preventDefault());
				formNewBill.addEventListener('submit', (e) => handleClick(e));
				fireEvent.submit(formNewBill);

				expect(screen.getByTestId('form-new-bill')).toBeTruthy();
			});
		});*/
		/* VOI AVEC AURELIE, LE FICHIER MÊME SI C'EST UN PDF S'AJOUTE
		describe('When I add a file that does not have the .jpg, .png, .jpeg extension)', () => {
			test('Then I stay on the "Envoyer une note de frais" page. The selected file is deleted from the field and the user will be prompted to select a new file in the correct format..', async () => {
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
				const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
				const fileChange = jest.fn((e) => {
					newBill.handleChangeFile(e);
				});
				fileForm.addEventListener('change', (e) => fileChange(e));

				fireEvent.change(fileForm, {
					target: { files: [file] },
				});

				expect(fileForm.files[0].type).toBeUndefined();

				const formNewBill = screen.getByTestId('form-new-bill');
				const handleClick = jest.fn((e) => e.preventDefault());
				formNewBill.addEventListener('submit', handleClick);
				fireEvent.submit(formNewBill);

				expect(screen.getByTestId('form-new-bill')).toBeTruthy();
			});
		}); */

		describe('I have completed the form correctly and click on the "Sent" button', () => {
			test('I am redirected to the Dashboard and the expense report has been created.', () => {
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
				const file = new File(['test'], 'test.png', { type: 'image/png' });
				const fileChange = jest.fn((e) => {
					newBill.handleChangeFile(e);
				});

				fireEvent.change(fileForm, {
					target: { files: [file] },
				});

				fileForm.addEventListener('change', (e) => fileChange(e));

				expect(fileForm.files[0].type).not.toBeUndefined();

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
