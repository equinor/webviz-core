import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import Menu from '../Menu';

describe('Menu', () => {
    it('should render Menu', () => {
        const tree = renderer.create(
            <BrowserRouter>
                <Menu
                    subPages={[
                        {
                            id: 'subpage 1',
                            title: 'Subpage 1',
                        },
                        {
                            id: 'subpage 2',
                            title: 'Subpage 2',
                        },
                    ]}
                />
            </BrowserRouter>
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
