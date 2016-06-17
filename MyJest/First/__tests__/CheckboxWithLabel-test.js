/**
 * Created by heke on 2016/6/17.
 */
'use strict'
jest.unmock('../CheckboxWithLabel');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import CheckboxWithLabel from '../CheckboxWithLabel';

describle('CheckboxWithLabel', ()=> {
    it('changes the text after click', ()=> {
        const checkbox = TestUtils.renderIntoDocument(
            <CheckboxWithLabel labelOn="On" labelOff="Off"/>
        );
        const checkboxNode = ReactDOM.findDOMNode(checkbox);
        expect(checkboxNode.textContent).toEqual('Off');

        TestUtils.Simulate.change(
            TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input')
        );
        expect(checkboxNode.textContent).toEqual('On');
    });
});
