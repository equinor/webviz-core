import React from 'react';
import renderer from 'react-test-renderer';
import Page from '../components/Page';

describe('Page', () => {
    it('should render Page', () => {
        const tree = renderer.create(
            <Page id="page" title="Page">
                <h1>Header</h1>
                <p>Some text here</p>
                <p>Some more text here</p>
            </Page>
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
