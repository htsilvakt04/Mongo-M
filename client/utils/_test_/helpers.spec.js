import { generateHomePageLink, generateHomePageWithCatLink } from '../helpers';
describe('generateHomePageLink()', () => {
    it('should return the correct structure', () => {
        expect(generateHomePageLink()).toEqual({
            pathname: '/',
            search: '?cat=All'
        });
        expect(generateHomePageLink('something')).toEqual({
            pathname: '/',
            search: '?cat=All'
        });
    })
})

describe('generateHomePageWithCatLink()', () => {
    it('should return the correct structure', () => {
        expect(generateHomePageWithCatLink('All')).toEqual({
            pathname: '/',
            search: '?cat=All'
        });
        expect(generateHomePageWithCatLink('Books')).toEqual({
            pathname: '/',
            search: '?cat=Books'
        });
    })
})