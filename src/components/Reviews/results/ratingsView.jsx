

import React, {Component} from 'react';
import TableComponent from './TableComponent.js';

class ResultsView extends Component {
    render(){
        return(
            <div className="form-view">
            <TableComponent/>
            </div>
        );
    }
}
export default ResultsView;