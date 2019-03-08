import React from 'react';
import renderer from 'react-test-renderer';
import Banner from '../Banner';

describe('Banner', () => {
    it('should render Banner', () => {
        const tree = renderer.create(
            <Banner color="#333333" title="Banner Title" />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
