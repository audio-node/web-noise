import { match } from './lib';

describe('match', () => {
    const testCases: [string, string, boolean][] = [
        ['project://KOKaIjp9yqOIwmqRMNxKM', 'project://*', true], // should match
        ['http://localhost:1234/foo', 'project://*', false],  // should not match
        ['http://localhost:1234/foo', 'file://*', false],  // should not match
        ['project://KOKaIjp9yqOIwmqRMNxKM', 'project://KOKaIjp9yqOIwmqRMNxKM', true], // should match
        ['project://KOKaIjp9yqOIwmqRMNxKM', 'project://other', false], // should not match
    ];

    testCases.forEach(([url, pattern, expected]) => {
        it(`should return ${expected} for URL "${url}" with pattern "${pattern}"`, () => {
            expect(match(url, pattern)).toBe(expected);
        });
    });
});
