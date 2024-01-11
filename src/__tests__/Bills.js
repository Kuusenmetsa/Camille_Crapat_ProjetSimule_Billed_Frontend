/**
 * @jest-environment jsdom
 */

import { fireEvent, getByTestId, getByText, screen, waitFor, waitForElement } from '@testing-library/dom';
import BillsUI from '../views/BillsUI.js';
import NewBillUI from '../views/NewBillUI.js';
import { bills } from '../fixtures/bills.js';
import { ROUTES_PATH } from '../constants/routes.js';
import { localStorageMock } from '../__mocks__/localStorage.js';

import router from '../app/Router.js';

describe('Given I am connected as an employee', () => {
	describe('When I am on Bills Page', () => {
		test('Then bill icon in vertical layout should be highlighted', async () => {
			Object.defineProperty(window, 'localStorage', { value: localStorageMock });
			window.localStorage.setItem(
				'user',
				JSON.stringify({
					type: 'Employee',
				})
			);
			const root = document.createElement('div');
			root.setAttribute('id', 'root');
			document.body.append(root);
			router();
			window.onNavigate(ROUTES_PATH.Bills);
			await waitFor(() => screen.getByTestId('icon-window'));
			const windowIcon = screen.getByTestId('icon-window');
			//to-do write expect expression
			expect(windowIcon.classList.contains('active-icon')).toBe(true);
		});

		test('Then bills should be ordered from earliest to latest', () => {
			document.body.innerHTML = BillsUI({ data: bills });
			const dates = screen
				.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i)
				.map((a) => a.innerHTML);
			const antiChrono = (a, b) => (a < b ? 1 : -1);
			const datesSorted = [...dates].sort(antiChrono);
			expect(dates).toEqual(datesSorted);
		});
		/* Voir pourquoi ça ne fonctionne pas
		describe('When I click on the eye icon of an expense report', () => {
			test('Then A modal with the image of the receipt appears', async () => {
				document.body.innerHTML = BillsUI({ data: bills });

				const eyeButton = screen.getByTestId('icon-eye');
				const handleCLick = jest.fn((e) => e.preventDefault());
				eyeButton.addEventListener('click', handleCLick);
				fireEvent.click(eyeButton);

				await waitFor(() => screen.getByTestId('bill-proof-container'));

				expect(screen.getByTestId('bill-proof-container')).toBeTruthy();
			});
			describe('When no files are available', () => {
				test('Then The message "Aucun fichier disponible" » appears', async () => {
					document.body.innerHTML = BillsUI({ data: bills });

					const eyeButton = screen.getByTestId('icon-eye');
					const handleCLick = jest.fn((e) => e.preventDefault());
					eyeButton.addEventListener('click', handleCLick);
					fireEvent.click(eyeButton);

					await waitFor(() => screen.queryByText('Aucun fichier disponible !'));

					expect(screen.queryByText('Aucun fichier disponible !')).toBeTruthy();
				});
			});
		}); */

		/* Voir pourquoi ça ne fonctionne pas
		describe('When I click to the button "Nouvelle note de frais"', () => {
			test('Then the form for create a new bill is display', async () => {
				document.body.innerHTML = BillsUI({ data: bills });

				const buttonNewBill = screen.getByTestId('btn-new-bill');
				const handleCLick = jest.fn((e) => e.preventDefault());
				buttonNewBill.addEventListener('click', handleCLick);
				fireEvent.click(buttonNewBill);

				await waitFor(() => screen.getByTestId('form-new-bill'));

				expect(screen.getByTestId('form-new-bill')).toBeTruthy();
			});
		}); */
		/* Voir avec Aurélie
		describe('Given a supporting form is open', () => {
			describe('When I click to the cross', () => {
				test('Then The Modal closes', () => {});
			});
		});*/
	});
});
