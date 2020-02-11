// import React from 'react';

// const nodeIcon = (icon) => {
//   if (React.isValidElement(icon)) {
//     return icon;
//   }
//   if (typeof icon === 'object' && icon !== null) {
//     return <span style={icon} />;
//   }
//   if (Object.prototype.toString.call(icon) === '[object String]') {
//     return <span className={icon} />;
//   }
// };

// class RatingSymbol extends React.PureComponent {
//   render() {
//     const {
//       index,
//       inactiveIcon,
//       activeIcon,
//       percent,
//       direction,
//       readonly,
//       onClick,
//       onMouseMove
//     } = this.props;
//     const backgroundNode = nodeIcon(inactiveIcon);
//     const showbgIcon = percent < 100;
//     const bgIconStyle = showbgIcon
//       ? {}
//       : {
//           visibility: 'hidden'
//         };
//     const iconNode = nodeIcon(activeIcon);
//     const iconStyle = {
//       display: 'inline-block',
//       position: 'absolute',
//       overflow: 'hidden',
//       top: 0,
//       [direction === 'rtl' ? 'right' : 'left']: 0,
//       width: `${percent}%`
//     };
//     const style = {
//       cursor: !readonly ? 'pointer' : 'inherit',
//       display: 'inline-block',
//       position: 'relative'
//     };

//     function handleMouseMove(e) {
//       if (onMouseMove) {
//         onMouseMove(index, e);
//       }
//     }

//     function handleMouseClick(e) {
//       if (onClick) {

//         e.preventDefault();
//         onClick(index, e);
//       }
//     }

//     return (
//       <span
//         style={style}
//         onClick={handleMouseClick}
//         onMouseMove={handleMouseMove}
//         onTouchMove={handleMouseMove}
//         onTouchEnd={handleMouseClick}
//       >
//         <span style={bgIconStyle}>
//           {backgroundNode}
//         </span>
//         <span style={iconStyle}>
//           {iconNode}
//         </span>
//       </span>
//     );
//   }
// }

// export default RatingSymbol;


// // import React from 'react';

// // // returns undefined if there is no rating

// // class StarRating extends React.Component {
// //   constructor(props) {
// //     super(props)
// //     this.state = {
// //       clickable: (this.props.clickable ? true : false),
// //       stars: null
// //     }
// //     this.starTypes = this.calcStarTypes(this.props.rating)
// //   }

// //   componentDidMount() {
// //     let stars = this.calcStarTypes(this.props.rating)
// //     this.setState({ stars: stars })
// //   }

// //   componentDidUpdate(prevProps) {
// //     if (prevProps.rating !== this.props.rating) {
// //       let stars = this.calcStarTypes(this.props.rating)
// //       this.setState({ stars: stars })
// //     }
// //   }

// //   calcStarTypes(rating) {
// //     if (rating === undefined) { return }
// //     let star_filled = Math.floor(rating);
// //     let star_0quarter = 5 - Math.ceil(rating)
// //     let quarter;
// //     if (star_filled + star_0quarter < 5 ) {
// //       quarter = Math.floor((rating - star_filled) * 4);
// //     }
// //     let stars = [];
// //     // add filled stars
// //     for (let i = 0; i < star_filled; i++) { stars.push('star_filled') }
// //     // add quarter stars
// //     if (quarter !== undefined) { stars.push(`star_${quarter}quarter`) }
// //     // add empty stars
// //     for (let i = 0; i < star_0quarter; i++) { stars.push('star_0quarter')}
// //     return stars;
// //   }

// //   starFilename(starType) {
// //     return `icons/${starType}.png`
// //   }

// //   render() {
// //     return (
// //       <span>
// //         {!this.state.stars ? null :
// //           this.state.stars.map((starType, i) => {
// //             return <img className="star-rating" key={i} src={this.starFilename(starType)} onClick={(e) => {
// //               if (this.state.clickable) {
// //                 this.props.update({ currentRating: i + 1 })
// //               }
// //             }}></img>
// //           })
// //         }
// //       </span>
// //     )
// //   }
// // }

// // export default StarRating;

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';

class StarRating extends React.Component {
  constructor() {
    super();

    this.state = {
      rating: 1
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  render() {
    const { rating } = this.state.rating
    return (
      <div>
        <h2>Rating from state: {rating}</h2>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}
const mapStoreToProps = (state) => ({
  state
});
export default connect(mapStoreToProps)(StarRating);