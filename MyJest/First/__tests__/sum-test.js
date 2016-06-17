/**
 * Created by heoo442 on 2016/6/16.
 */
'use strict'
jest.unmock('../sum');

describe('sum', () => {
    it('add 1+2 to equal 3', ()=> {
        const sum = require('../sum');
        expect(sum(1, 2)).toBe(3);
    });
});

