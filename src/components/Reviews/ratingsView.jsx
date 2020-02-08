
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button } from '@material-ui/core';
// import CloseIcon from '@material-ui/icons/Close'


class RatingsView extends Component {
    constructor(){
        super();
    this.state = {
        fit: 0,
        style: 0,
        overall: 0,
        image: '',
        open: false,
        input1: '',

        }
    }
    handleClose = () => {
        this.setState({
            ...this.state,
            input1: '',
            fit: 0,
            size: 0,
            length: 0,
            width: 0,
            quality: 0,
            comfort: 0
        })
    }

    handleChangeFor = (event, property) => {
        this.setState({
            ...this.state,
            [property]: event.target.value,
        });
    }

    handleRangeChangeFor = (event, property) => {
        this.setState({
            ...this.state,
            [property]: event.target.value,
        });
    }




    sendValueTostate = () => {
        if(!this.selectProduct) console.log('error')
        let action = {type: 'SIZE_RATING', payload: this.state.size};
        this.props.dispatch(action);
        action = {type: 'FIT_RATING', payload: this.state.fit};
        this.props.dispatch(action);
        action = {type: 'QUALITY_RATING', payload: this.state.quality};
        this.props.dispatch(action);
        action = {type: 'LENGTH_RATING', payload: this.state.length};
        this.props.dispatch(action);
        action = {type: 'WIDTH_RATING', payload: this.state.width};
        this.props.dispatch(action);
        action = {type: 'COMFORT_RATING', payload: this.state.comfort};
        this.props.dispatch(action);
        action = {type: 'ADD_REVIEW', payload: this.state.input1};
        this.props.dispatch(action);
        console.log(this.state)
        console.log(this.props.state)
        console.log(this.props.storage.review)
        this.handleClose()
    }
    render(){
        return(
            <div className="main">
                    <div className="main">
                <div className="flex-box flex-evenly form-zone animate-pop-in">

                    <div className="column-4 column-md-8">

                    </div>
                        <div className="ratings">
                            <h4>Rate Our Product</h4>
                            <p>Please rank our product for each category listed below on a scale from 0 (worst)  - 5 (best).</p>

                            <div>
                                <label>Name of Product: {this.state.name}</label>
                            </div>
                            <div>
                            <label>Size of product: {this.state.size}/5</label> <input value={this.state.size} onChange={(event)=>this.handleRangeChangeFor(event, 'size')} type="range" min="0" max="5" required/>
                            </div>
                            <div className="flex-col slider-div column-12">
                            <label>Fit of product: {this.state.fit}/5</label> <input value={this.state.fit} onChange={(event)=>this.handleRangeChangeFor(event, 'fit')} className="slider column-8" type="range" min="0" max="5" required/>
                            </div>
                            <div className="flex-col slider-div column-12">
                            <label>Width of product: {this.state.width}/5</label> <input value={this.state.width} onChange={(event)=>this.handleRangeChangeFor(event, 'width')} className="slider column-8" type="range" min="0" max="5" required/>
                            </div>
                            <div className="flex-col slider-div column-12">
                            <label>Length of product: {this.state.length}/5</label> <input value={this.state.length} onChange={(event)=>this.handleRangeChangeFor(event, 'length')} className="slider column-8" type="range" min="0" max="5" required/>
                            </div>
                            <div className="flex-col slider-div column-12">
                            <label>Comfort of product: {this.state.comfort}/5</label> <input value={this.state.comfort} onChange={(event)=>this.handleRangeChangeFor(event, 'comfort')} className="slider column-8" type="range" min="0" max="5" required/>
                            </div>
                            <div className="flex-col slider-div column-12">
                            <label>Quality of product: {this.state.quality}/5</label> <input value={this.state.quality} onChange={(event)=>this.handleRangeChangeFor(event, 'quality')} className="slider column-8" type="range" min="0" max="5" required/>
                            </div>
                            <div className="flex-col column-12">
                            <input value={this.state.input1} onChange={(event) => this.handleChangeFor(event, 'input1')} required />
                        </div>
                            <div className="flex-box flex-center margin-top-15">
                            <Button variant="contained" color="primary" onClick={()=>this.sendValueTostate()}>Submit</Button>
                            </div>

                        </div>
                    </div>
            </div>
            </div>
                                    );
    }
}
const mapStorageToProps = (storage) => ({
    storage
});
export default connect(mapStorageToProps)(RatingsView);