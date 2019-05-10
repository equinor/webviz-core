import React from 'react';
import renderer from 'react-test-renderer';
import Map, {makeFlowLayers, make2DLayers} from '../components/Map';

const dataNoFlow = {
    i: {'0': 0, '1': 1, '2': 0, '3': 1},
    j: {'0': 0, '1': 0, '2': 1, '3': 1},
    k: {'0': 0, '1': 0, '2': 0, '3': 0},
    x0: {'0': 0, '1': 1, '2': 0, '3': 1},
    y0: {'0': 0, '1': 0, '2': 1, '3': 1},
    x1: {'0': 1, '1': 2, '2': 1, '3': 2},
    y1: {'0': 0, '1': 0, '2': 1, '3': 1},
    x2: {'0': 1, '1': 2, '2': 1, '3': 2},
    y2: {'0': 1, '1': 1, '2': 2, '3': 2},
    x3: {'0': 0, '1': 1, '2': 0, '3': 1},
    y3: {'0': 1, '1': 1, '2': 2, '3': 2},
    value: {'0': 1, '1': 0, '2': 4, '3': 2},
};

const dataWithFlow = {
    ...dataNoFlow,
    'FLOWI+': {'0': 0.005, '1': 0.002, '2': 0.001, '3': 0.004},
    'FLOWJ+': {'0': 0.0025, '1': 0.0045, '2': 0.0025, '3': 0.0035},
};

describe('Map', () => {
    it('should render Map', () => {
        const tree = renderer.create(
            <Map id="simple-map" data={JSON.stringify(dataWithFlow)} />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });
    it('should render Map as a dash component', () => {
        const dashTree = renderer.create(
            <Map
                id="simple-map"
                data=""
                _dashprivate_layout={{
                    props: {
                        id: 'simple-map',
                        data: JSON.stringify(dataWithFlow),
                    },
                }}
            />
        );
        const tree = renderer.create(
            <Map id="simple-map" data={JSON.stringify(dataWithFlow)} />
        );
        expect(tree.toString()).toEqual(dashTree.toString());
    });
});

describe('makeFlowLayers', () => {
    it('should match snapshot', () => {
        const layers = makeFlowLayers(dataWithFlow);
        expect(layers).toMatchSnapshot();
    });
});

describe('make2DLayers', () => {
    it('should match snapshot', () => {
        const layers = make2DLayers(dataNoFlow);
        expect(layers).toMatchSnapshot();
    });
});
