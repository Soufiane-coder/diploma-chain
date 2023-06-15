import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectStudentProfileList } from '../../redux/students-profile/students-profile.selectors';
import LoadingSpin from '../loading-spin/loading-spin';


const withLoading = (WrappedComponent) => {
    const Loading = ({ studentProfileList, ...props }) => {
        // Render the wrapped component with enhanced props or additional elements

        return studentProfileList ? <WrappedComponent {...props} /> : <LoadingSpin />;
    }
    const mapStateToProps = createStructuredSelector({
        studentProfileList: selectStudentProfileList
    })
    return connect(mapStateToProps)(Loading);
};



export default withLoading;