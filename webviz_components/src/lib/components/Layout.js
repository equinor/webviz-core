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
            // If dashprivate_layout, get props from there
            // Else, get props from component itself
            const props2 =
                props._dashprivate_layout && props._dashprivate_layout.props
                    ? props._dashprivate_layout.props
                    : props;

            if (props2 && !props2.title && props2.children) {
                return props2.children.props;
            }

            return props2;
        });
        const pages = subPages.map((page) => {
            // If dashprivate_layout, get props from there
            // Else, get props from component itself
            const pageProps =
                page.props._dashprivate_layout &&
                page.props._dashprivate_layout.props
                    ? page.props._dashprivate_layout.props
                    : page.props;

            <Route
                key={pageProps.id}
                path={`${basepath}/${pageProps.id}`}
                render={() => <PageWrapper>{page}</PageWrapper>}
            />;
        });
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
