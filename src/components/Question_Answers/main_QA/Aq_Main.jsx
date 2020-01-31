// const React = require('react')
import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

import Search from '../Search'
import List from '../List'
 import Modal from '../Modal'
// import {useSelector} from 'react-redux'


class Aq_Main extends Component {
    // constructor(props) {
    //     super(props);
    // }
    
    render() {
    //  const reactState = useSelector(state => state)
        return (
            
        <div>
            <p>{`Questions & answers`}</p>
            <p>{this.props.state}</p>
            {/* <p>this is state:{reactState}</p> */}
            <Search/>
            <List/>
            <div>
            {/* <ButtonGroup color="primary" aria-label="outlined primary button group"> */}
             <Button variant="contained" variant="outlined">more answered questions</Button>
             <Modal/>
            {/* </ButtonGroup> */}
             </div>

        </div>


        )
    }
}
export default Aq_Main;