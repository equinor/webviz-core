import React from 'react';
import renderer from 'react-test-renderer';
import Layout from '../components/Layout';

describe('Layout', () => {
    it('should render Layout with one child element', () => {
        const tree = renderer.create(
            <Layout
                _dashprivate_layout={{
                    props: {
                        children: [
                            <div id="page" title="page">
                                Page
                            </div>,
                        ],
                    },
                }}
            />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should render Layout with multiple child elements', () => {
        const tree = renderer.create(
            <Layout
                _dashprivate_layout={{
                    props: {
                        children: [
                            <div id="frontpage" title="Frontpage">
                                Frontpage
                            </div>,
                            <div id="subpage 1" title="Subpage 1">
                                Subpage 1
                            </div>,
                            <div id="subpage 2" title="Subpage 2">
                                Subpage 2
                            </div>,
                        ],
                    },
                }}
            />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should render Layout with banner', () => {
        const tree = renderer.create(
            <Layout
                _dashprivate_layout={{
                    props: {
                        banner: {
                            color: '#333333',
                            title: 'Banner',
                        },
                        children: [
                            <div id="page" title="Page">
                                Page
                            </div>,
                        ],
                    },
                }}
            />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should not compare props before updates by default', () => {
        jest.mock('deep-equal', () => jest.fn(() => true));

        const equal = require('deep-equal'); // eslint-disable-line global-require
        renderer.create(
            <Layout
                _dashprivate_layout={{
                    props: {
                        children: [
                            <div id="page" title="Page">
                                Page
                            </div>,
                        ],
                    },
                }}
            />
        );
        expect(equal).toHaveBeenCalledTimes(0);
        equal.mockRestore();
    });

    it('should compare props before updates if strictUpdates is true', () => {
        jest.mock('deep-equal', () => jest.fn(() => true));

        const equal = require('deep-equal'); // eslint-disable-line global-require
        renderer.create(
            <Layout
                strictUpdate
                _dashprivate_layout={{
                    props: {
                        children: [
                            <div id="page" title="Page">
                                Page
                            </div>,
                        ],
                    },
                }}
            />
        );
        expect(equal).toHaveBeenCalledTimes(0);
        equal.mockRestore();
    });
});
