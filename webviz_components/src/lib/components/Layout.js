import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Menu from '../private-components/Menu';
import Banner from '../private-components/Banner';
import '../resources/dash.css';

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Wrapper = styled.div`
    display: flex;
    height: 100%;
    @media (max-width: 1200px) {
        flex-direction: column;
    }
`;

class Layout extends Component {
    render() {
        const {children, banner, basepath} = this.props;
        const [frontPage, ...subPages] = Array.isArray(children)
            ? children
            : [children];
        const subPageProps = subPages.map(({props}) => {
            if (props && !props.title && props.children) {
                return props.children.props;
            }
            return props;
        });
        const pages = subPages.map(page => (
            <Route
                key={page.id}
                path={`${basepath}/${page.props.id}`}
                render={() => <PageWrapper>{page}</PageWrapper>}
            />
        ));
        return (
            <BrowserRouter>
                <Wrapper id="layout">
                    <Menu basePath={basepath} subPages={subPageProps} />
                    <Switch>
                        <Route
                            exact
                            path={`${basepath}/`}
                            render={() => (
                                <PageWrapper>
                                    {banner && <Banner {...banner} />}
                                    {frontPage}
                                </PageWrapper>
                            )}
                        />
                        {pages}
                    </Switch>
                </Wrapper>
            </BrowserRouter>
        );
    }
}

Layout.defaultProps = {
    children: null,
    banner: null,
    basepath: '',
};

Layout.propTypes = {
    /**
     * The content of the layout. Ideally a list of pages or a single page
     */
    children: PropTypes.node,
    /**
     * The banner is optional and is only the front page.
     * If you wish to have a banner provide dict containing a color or a url
     * and a title
     */
    banner: PropTypes.shape({
        url: PropTypes.string,
        color: PropTypes.string,
        title: PropTypes.string,
    }),
    basepath: PropTypes.string,
};

export default Layout;
