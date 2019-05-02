import React from 'react';
import renderer from 'react-test-renderer';
import Page from '../components/Page';

describe('Page', () => {
    it('should render Page', () => {
        const tree = renderer.create(
            <Page
                _dashprivate_layout={{
                    props: {
                        id: 'page',
                        title: 'Page',
                        children: [
                            <h1>Header</h1>,
                            <p>Some text here</p>,
                            <p>Some more text here</p>,
                        ],
                    },
                }}
            />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
