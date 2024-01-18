/**
 * @jest-environment jsdom
 */

import { fireEvent, getByTestId, getByText, screen, waitFor, waitForElement } from '@testing-library/dom';
import BillsUI from '../views/BillsUI.js';
import NewBillUI from '../views/NewBillUI.js';
import { bills } from '../fixtures/bills.js';
import { ROUTES_PATH, ROUTES } from '../constants/routes.js';
import { localStorageMock } from '../__mocks__/localStorage.js';

import router from '../app/Router.js';
import Bills from '../containers/Bills.js';
import userEvent from '@testing-library/user-event';

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
		describe('When I click on the eye icon of an expense report', () => {
			test('Then A modal with the image of the receipt appears', () => {
				Object.defineProperty(window, 'localStorage', { value: localStorageMock });
				window.localStorage.setItem(
					'user',
					JSON.stringify({
						type: 'Employee',
					})
				);
				document.body.innerHTML = BillsUI({ data: bills });

				const onNavigate = (pathname) => {
					document.body.innerHTML = ROUTES({ pathname });
				};

				const bill = new Bills({
					document,
					onNavigate,
					store: null,
					localStorage: localStorageMock,
				});

				$.fn.modal = jest.fn();

				const eyeButtons = screen.getAllByTestId('icon-eye');

				const clickGenerate = jest.fn((eyeButton) => {
					bill.handleClickIconEye(eyeButton);
				});

				for (let i = 0; i < eyeButtons.length; i++) {
					eyeButtons[i].addEventListener('click', clickGenerate(eyeButtons[i]));
					fireEvent.click(eyeButtons[i]);
				}

				expect(clickGenerate).toHaveBeenCalled();
				expect(screen.getByText('Justificatif')).toBeTruthy();
				expect(screen.getByTestId('justif-bill')).toBeTruthy();
			});
			/*	describe('When no files are available', () => {
				test('Then The message "Aucun fichier disponible" » appears', async () => {
					document.body.innerHTML = BillsUI({ data: bills });

					const eyeButton = screen.getAllByTestId('icon-eye')[0];
					const handleCLick = jest.fn((e) => e.preventDefault());
					eyeButton.addEventListener('click', handleCLick);
					fireEvent.click(eyeButton);

					await waitFor(() => screen.queryByText('Aucun fichier disponible !'));

					expect(screen.queryByText('Aucun fichier disponible !')).toBeTruthy();
				});
			});*/
		});

		describe('When I click to the button "Nouvelle note de frais"', () => {
			test('Then the form for create a new bill is display', async () => {
				Object.defineProperty(window, 'localStorage', { value: localStorageMock });
				window.localStorage.setItem(
					'user',
					JSON.stringify({
						type: 'Employee',
					})
				);
				document.body.innerHTML = BillsUI({ data: bills });

				const onNavigate = (pathname) => {
					document.body.innerHTML = ROUTES({ pathname });
				};

				const bill = new Bills({
					document,
					onNavigate,
					store: null,
					localStorage: localStorageMock,
				});

				$.fn.modal = jest.fn();

				const buttonNewBill = screen.getByTestId('btn-new-bill');

				const clickGenerate = jest.fn(() => {
					bill.handleClickNewBill();
				});
				buttonNewBill.addEventListener('click', clickGenerate());
				fireEvent.click(buttonNewBill);

				expect(clickGenerate).toHaveBeenCalled();
				expect(screen.getByText('Envoyer une note de frais')).toBeTruthy();
			});
		});
		describe('Given a modal proof is open', () => {
			describe('When I click to the cross', () => {
				test('Then The Modal closes', () => {
					Object.defineProperty(window, 'localStorage', { value: localStorageMock });
					window.localStorage.setItem(
						'user',
						JSON.stringify({
							type: 'Employee',
						})
					);
					document.body.innerHTML = BillsUI({ data: bills });

					const onNavigate = (pathname) => {
						document.body.innerHTML = ROUTES({ pathname });
					};

					const bill = new Bills({
						document,
						onNavigate,
						store: null,
						localStorage: localStorageMock,
					});

					$.fn.modal = jest.fn();

					const eyeButton = screen.getAllByTestId('icon-eye')[0];

					const clickGenerate = jest.fn(() => {
						bill.handleClickIconEye(eyeButton);
					});

					eyeButton.addEventListener('click', clickGenerate());
					fireEvent.click(eyeButton);

					expect(clickGenerate).toHaveBeenCalled();

					const closeButton = screen.getByTestId('close');

					closeButton.addEventListener('click', jest.fn());
					fireEvent.click(closeButton);

					expect(screen.getByTestId('modal').classList.contains('show')).toBe(false);
				});
			});
		});
	});
});
