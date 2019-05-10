/* eslint-disable react/no-children-prop */
/* eslint-disable react/no-unused-prop-types */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Link} from 'react-router-dom';
import styled, {css} from 'styled-components';
import MenuButton from './MenuButton';

const OuterWrapper = styled.div`
    background: var(--menuBackground);
    @media (min-width: 1201px) {
        min-height: fill-available;
    }
`;

const displayNone = css`
    display: none;
`;

const Wrapper = styled.div`
    background: var(--menuBackground);
    min-width: 250px;
    display: flex;
    flex-direction: column;
`;

const SubLinksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    @media (max-width: 1200px) {
        ${({menuOpen}) => !menuOpen && displayNone};
    }
    @media (min-width: 1201px) {
        height: 100%;
    }
`;

const MainLinkWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const LinkHome = styled(Link)`
    text-decoration: none;
    font-size: 30px;
    font-family: system-ui;
    @media (max-width: 1200px) {
        text-align: center;
        margin-left: -50px;
    }
`;

const LogoWrapper = styled.div`
    margin: 12px 20px 20px 18px;
    @media (max-width: 1200px) {
        height: 50px;
        margin: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    margin: 20px 30px;
    display: flex;
    align-items: center;
`;

const selectedStyle = css`
    background: var(--menuLinkBackgroundSelected);
    color: var(--menuLinkColorSelected);
`;

const hoverStyle = css`
    background: var(--menuLinkBackgroundHover);
    color: var(--menuLinkHoverColor);
`;

const SubPageLink = styled(Link)`
    text-decoration: none;
    padding: 20px 30px;
    font-size: 16px;
    font-family: var(--menuLinkFont);
    font-weight: var(--menuLinkFontWeight);
    font-style: var(--menuLinkFontStyle);
    border-bottom: 1px solid white;
    color: var(--menuLinkColor);
    :hover {
        ${({selected}) => !selected && hoverStyle};
    }
    ${({selected}) => selected && selectedStyle};
`;

const ButtonWrapper = styled.div`
    @media (min-width: 1201px) {
        display: none;
    }
`;

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false,
        };
    }

    render() {
        /* eslint-disable react/destructuring-assignment, react/prop-types */
        const {props} =
            this.props._dashprivate_layout &&
            this.props._dashprivate_layout.props
                ? this.props._dashprivate_layout
                : this;
        /* eslint-enable react/destructuring-assignment, react/prop-types */

        const {subPages, basePath} = props;
        const {menuOpen} = this.state;

        return (
            <OuterWrapper>
                <Wrapper>
                    <MainLinkWrapper>
                        <ButtonWrapper>
                            <MenuButton
                                onClick={() => {
                                    this.setState({menuOpen: !menuOpen});
                                }}
                            />
                        </ButtonWrapper>
                        <Route
                            exact
                            path={`${basePath}`}
                            children={() => (
                                <LogoWrapper>
                                    <LinkHome to={`${basePath}`}>
                                        <div id="logo" />
                                    </LinkHome>
                                </LogoWrapper>
                            )}
                        />
                    </MainLinkWrapper>
                    <SubLinksWrapper menuOpen={menuOpen}>
                        {subPages.map(({title, id}) => (
                            <Route
                                key={`subpage-${id}`}
                                path={`${basePath}/${id}`}
                                children={({match}) => (
                                    <SubPageLink
                                        selected={match}
                                        to={`${basePath}/${id}`}
                                    >
                                        {title}
                                    </SubPageLink>
                                )}
                            />
                        ))}
                    </SubLinksWrapper>
                </Wrapper>
            </OuterWrapper>
        );
    }
}

Menu.defaultProps = {
    subPages: [],
    basePath: '',
};

Menu.propTypes = {
    subPages: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ),
    basePath: PropTypes.string,
};

export default Menu;
