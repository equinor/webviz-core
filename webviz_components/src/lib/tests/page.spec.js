import React from 'react';
import renderer from 'react-test-renderer';
import Page from '../components/Page';

describe('Page', () => {
    it('should render page as a dash component', () => {
        const dashTree = renderer.create(
            <Page
                id="page"
                title="Page"
                _dashprivate_layout={{
                    props: {
                        id: 'page',
                        title: 'Page',
                        children: [
                            <h1 key="1">Header</h1>,
                            <p key="2">Some text here</p>,
                            <p key="3">Some more text here</p>,
                        ],
                    },
                }}
            />
        );
        const tree = renderer.create(
            <Page id="page" title="Page">
                <h1>Header</h1>
                <p>Some text here</p>
                <p>Some more text here</p>
            </Page>
        );
        expect(dashTree.toString()).toEqual(tree.toString());
    });

    it('should render page', () => {
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
