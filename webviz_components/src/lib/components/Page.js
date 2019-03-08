import React from 'react';
import PropTypes from 'prop-types';

const Page = ({id, children, title}) => (
    <div style={{margin: '20px'}} id={id} key={title}>
        {children}
    </div>
);

Page.defaultProps = {
    children: null,
};

Page.propTypes = {
    /**
     * The ID of this component, used to identify dash components
     * in callbacks. The ID needs to be unique across all of the
     * components in an app.
     */
    id: PropTypes.string.isRequired,
    /**
     * The title of this page. Will be displayed in the menu.
     */
    title: PropTypes.string.isRequired,
    /**
     * The content of the page.
     */
    children: PropTypes.node,
};

export default Page;
