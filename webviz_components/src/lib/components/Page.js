/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Page extends Component {
    render() {
        /* eslint-disable react/destructuring-assignment, react/prop-types */
        const dashProps =
            this.props._dashprivate_layout &&
            this.props._dashprivate_layout.props
                ? this.props._dashprivate_layout.props
                : this.props;
        /* eslint-enable react/destructuring-assignment, react/prop-types */

        return (
            <div
                style={{margin: '20px'}}
                id={dashProps.id}
                key={dashProps.title}
            >
                {dashProps.children}
            </div>
        );
    }
}

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
