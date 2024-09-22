import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { getDayByIndex } from '../utils/dateTimeUtils';
// import * as myExtension from '../../extension';

// suite('Extension Test Suite', () => {
// 	vscode.window.showInformationMessage('Start all tests.');

// 	test('Sample test', () => {
// 		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
// 		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
// 	});
// });

suite('Testing getDateByIndex method', () => {
	vscode.window.showInformationMessage("Testing getDateByIndex method");

	test('Raises Assert for index greater than 7', () => {
		try {
			getDayByIndex(10);
		} catch(error) {
			assert.ok(true);
		}
	});

	test('Raises Assert for index smaller than 1', () => {
		try {
			getDayByIndex(-1);
		} catch(error) {
			assert.ok(true);
		}
	});

	test ('Monday', () => {
		assert.strictEqual(getDayByIndex(1), 'Monday');
	});

	test ('Tuesday', () => {
		assert.strictEqual(getDayByIndex(2), 'Tuesday');
	});
	test ('Wednesday', () => {
		assert.strictEqual(getDayByIndex(3), 'Wednesday');
	});
	test ('Thursday', () => {
		assert.strictEqual(getDayByIndex(4), 'Thursday');
	});
	test ('Friday', () => {
		assert.strictEqual(getDayByIndex(5), 'Friday');
	});
	test ('Saturday', () => {
		assert.strictEqual(getDayByIndex(6), 'Saturday');
	});
	test ('Sunday', () => {
		assert.strictEqual(getDayByIndex(0), 'Sunday');
	});
});