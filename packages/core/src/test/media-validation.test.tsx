import {validateMediaProps} from '../validate-media-props';
import {expectToThrow} from './expect-to-throw';

describe('ValidateMediaProps should throw with invalid volume inputs', () => {
	const testComponents: string[] = ['Audio', 'Video'];
	testComponents.forEach((component) => {
		test(`It should not allow an ${component} element to have a negative volume `, () => {
			expectToThrow(
				// @ts-expect-error
				() => validateMediaProps({volume: -1}, component),
				new RegExp(
					`You have passed a volume below 0 to your <${component} /> component. Volume must be between 0 and 1`
				)
			);
		});
		test(`It should not allow an ${component} element to have an invalid type`, () => {
			expectToThrow(
				// @ts-expect-error
				() => validateMediaProps({volume: 'invalidType'}, component),
				new RegExp(
					`You have passed a volume of type string to your <${component} /> component.`
				)
			);
		});
	});
});

describe('ValidateMediaProps should not throw with valid volume inputs', () => {
	const validInputs: (number | Function | undefined)[] = [
		0,
		1,
		undefined,
		() => 1,
		(x: number) => x,
	];
	validInputs.forEach((vol) =>
		test(`valid volume ${vol} shold not throw`, () => {
			// @ts-expect-error
			expect(() => validateMediaProps({volume: vol}, 'Video')).not.toThrow();
		})
	);
});