import React from 'react';
import renderer from 'react-test-renderer';
import Layout from '../components/Layout';

describe('Layout', () => {
    it('should render Layout with one child element', () => {
        const tree = renderer.create(
            <Layout>
                <div id="page" title="page">
                    Page
                </div>
            </Layout>
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should render Layout with multiple child elements', () => {
        const tree = renderer.create(
            <Layout>
                <div id="frontpage" title="Frontpage">
                    Frontpage
                </div>
                <div id="subpage 1" title="Subpage 1">
                    Subpage 1
                </div>
                <div id="subpage 2" title="Subpage 2">
                    Subpage 2
                </div>
            </Layout>
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should render Layout with banner', () => {
        const tree = renderer.create(
            <Layout
                banner={{
                    color: '#333333',
                    title: 'Banner',
                }}
            >
                <div id="page" title="Page">
                    Page
                </div>
            </Layout>
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should render Layout with multiple child elements as a dash component', () => {
        const dashTree = renderer.create(
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
                        banner: null,
                        basepath: '',
                    },
                }}
            />
        );
        const tree = renderer.create(
            <Layout>
                <div id="frontpage" title="Frontpage">
                    Frontpage
                </div>
                <div id="subpage 1" title="Subpage 1">
                    Subpage 1
                </div>
                <div id="subpage 2" title="Subpage 2">
                    Subpage 2
                </div>
            </Layout>
        );
        expect(dashTree.toString()).toEqual(tree.toString());
    });
});
