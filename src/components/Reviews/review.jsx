// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Button, Dialog } from '@material-ui/core';

// class Review extends Component {
//     constructor() {
//         super();
//         this.state = {
//             examples: [{ image: 'Denim.jpg' }, { image: '' }],
//             open: false,
//             image: {image: ''},
//             selected: {image: ''},
//             input1: 'Review the product:',

//         }
//     }
//     handleClose = () => {
//         this.setState({
//             ...this.state,
//             open: false,
//             image: {image: ''}
//         })
//     }
//     handleChangeFor = (event, property) => {
//         this.setState({
//             ...this.state,
//             [property]: event.target.value,
//         });
//     }

//     selectProject = (example) => {
//         this.props.dispatch({ type: 'CHOOSE_PRODUCT', payload: example });
//         this.setState({
//             ...this.state,
//             selected: example
//         })
//     }
//     sendValueToStorage = () => {
//         const action = { type: '', payload: [this.state.input1] };
//         this.props.dispatch(action);

//     }

//     render() {
//         return (
//             <div className="main">
//                 <div>
//                     <div className="column-4 column-md-8">

//                         <div className="flex-box flex-evenly">
//                             {this.state.storage.product.products.map((ex, i) => {
//                                 return (
//                                     <div className="thumbnail" key={i}>
//                                         {this.state.selected === ex ? (<div className="flex-col selected-image">
//                                             <img src={this.props.state.product.products[ex].url} onClick={() => this.setState({ ...this.state, open: true, image: ex })} alt={`example-work-${i + 1}`} />
//                                             <Button onClick={() => this.selectProject('')}>undo</Button></div>) : (<div className="flex-col">
//                                                 <img src={this.props.state.product.products[ex].url} onClick={() => this.setState({ ...this.state, open: true, image: ex })} alt={`example-work-${i + 1}`} />
//                                             <Button color="secondary" onClick={() => this.selectProject(ex)}>select</Button></div>)}
//                                     </div>
//                                 )
//                             })}
//                         </div>
//                         <Dialog open={this.state.open} onClose={this.handleClose}>
//                             <div className="dialog">
//                                 <div className="flex-box flex-end close-icon" onClick={this.handleClose}>x</div>
//  (<div><h3>Example photo</h3><img className="full-img" src={require(`../overall/${this.state.image.image}`)} alt="demo" /></div>)
//                             </div>
//                         </Dialog>

//                     </div>
//                     {this.state.selected.image.length !== 0 && <div className="instructions column-6 column-md-10 text-left">

//                         <div className="flex-col column-12">
//                             <input value={this.state.input1} onChange={(event) => this.handleChangeFor(event, 'input1')} required />
//                         </div>
//                         <div className="flex-box flex-center margin-top-15">
//                             <Button variant="contained" color="secondary" onClick={() => this.sendValueToStorage()}>Submit</Button>
//                         </div>


//                     </div>}
//                 </div>


//             </div>
//         );
//     }
// }
// const mapStoreToProps = (storage) => ({
//     storage
// });
// export default connect(mapStoreToProps)(Review);

import React from 'react'
// import ReviewList from './ReviewList.jsx'
import RatingsView from './ratingsView.jsx';
import NewReview from './newReview.jsx'
import { connect } from 'react-redux';

const url = 'http://52.26.193.201:3000//reviews/';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    const {rating} = props;

    this.state = {
      more: false,
      reviews: [],
      meta: {},
      page: 1,
      sort: 'helpful',
      charsLeft: 50,
      starFilters: [],
      currentRating: 0,
      search: ''
    };

    this.updateState = this.updateState.bind(this);
    this.markHelpful = this.markHelpful.bind(this);
    this.force = this.force.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }

  getReviews() {
    fetch(url + this.props.state.product.products.id + `/list?page=${this.state.page}&sort=${this.state.sort}`)
      .then((response) => {
        console.log(this.state);
        return response.json();
      })
      .then((result) => {
        if (!this.state.reviews.length) {
          this.setState({
            reviews: result.results
          }, () => { console.log('this.state.reviews', this.state.reviews)} );
        } else if (JSON.stringify(this.state.reviews) !== JSON.stringify(result.results)) {
          this.setState({
            reviews: this.state.reviews.concat(result.results)
          }, () => {
            // console.log('Reviews retrieved and state updated successfully!');
          })
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }

  // getMeta() {
  //   fetch(url + this.props.productInfo.id + `/meta`)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((result) => {
  //       this.setState({
  //         meta: result
  //       }, () => {
  //       })
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     })
  // }

  markHelpful(rid) {
    fetch(url + 'helpful/' + rid, {
      method: 'PUT'
    })
    .then(() => {
      this.forceUpdate();
      // console.log('refresh')
    })
    .catch((err) => {
      console.error(err);
    })
  }

  reportReview(rid) {
    fetch(url + 'report/' + rid, {
      method: 'PUT'
    })
    .then(() => {
      // console.log('reported, refresh and this review should be gone')
    })
    .catch((err) => {
      console.error(err);
    })
  }

  submitReview(review) {
    fetch(url + this.props.productInfo.id, {
      method: 'POST',
      body: JSON.stringify(review),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      this.getMeta();
      // console.log('New review added', response.status)
    })
    .catch((err) => {
      console.error(err);
    })
  }

  force() {
    this.forceUpdate();
    // console.log('updated');
  }

  updateState(obj, update) {
    this.setState(obj, () => {
      if (update) {
        this.getReviews();
      }
    });
  }

  componentDidMount() {
    this.getReviews();
    // this.getMeta();
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.productInfo.id !== prevProps.productInfo.id) {
  //     this.setState({
  //       reviews: [],
  //       meta: {},
  //       more: false
  //     }, () => {
  //       // this.getReviews();
  //       // this.getMeta();
  //       this.render();
  //     })
  //   }
  // }

  render() {
    console.log(this.state)
    return (this.state.meta.hasOwnProperty('characteristics') ? this.renderReviews() : (
    <div>Loading Ratings & Reviews...</div>
    ));
  }

  renderReviews() {
    return (
      // <div id='reviews' data-widget={'reviews' + this.props.productInfo.id}>
        <div>
        <RatingsView state={this.state}
        update={this.updateState}/>
        {/* <ReviewList state={this.state}
        update={this.updateState}
        helpful={this.markHelpful}
        report={this.reportReview}
        total={this.state.meta.recommended['0'] && this.state.meta.recommended['1'] ? this.state.meta.recommended['0'] + this.state.meta.recommended['1'] : (this.state.meta.recommended['0'] ? this.state.meta.recommended['0'] : (this.state.meta.recommended['1'] ? this.state.meta.recommended['1'] : 0))}/> */}
        {/* <NewReview state={this.state}
        update={this.updateState}
        pname={this.props.productInfo.name}
        force={this.force}
        submit={this.submitReview} /> */}
      </div>
    )
  }
}

const mapStoreToProps = (state) => ({
  state
});
export default connect(mapStoreToProps)(Reviews);