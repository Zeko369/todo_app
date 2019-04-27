import React, { Component, Fragment } from 'react';
import './ModalTest.scss';
import BottomNav from '../components/BottomNav';

export default class ModalTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opened: false
    }

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  open() {
    this.setState({opened: true});
  }

  close() {
    this.setState({opened: false});
  }

  handleClick(event){
    if(event.target.classList.contains('modal')){
      this.close();
    }
  }

  render() {
    return (
      <Fragment>
        <button className="butun" onClick={this.open}>Open</button>

        <div className={`modal ${this.state.opened ? 'show-modal' : ''}`} onClick={this.handleClick}>
          <div className="modal-content">
            <span className="close-button" onClick={this.close}>&times;</span>
            <h1>Hello, I am a modal!</h1>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa massa ultricies mi quis hendrerit dolor magna. Ipsum dolor sit amet consectetur adipiscing elit ut. Cursus metus aliquam eleifend mi in. Tellus integer feugiat scelerisque varius morbi enim nunc. Dolor sit amet consectetur adipiscing elit ut aliquam. Suspendisse potenti nullam ac tortor vitae purus. Tristique risus nec feugiat in fermentum posuere urna nec. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Nisi quis eleifend quam adipiscing vitae. Interdum varius sit amet mattis vulputate enim nulla aliquet. Nullam ac tortor vitae purus faucibus.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa massa ultricies mi quis hendrerit dolor magna. Ipsum dolor sit amet consectetur adipiscing elit ut. Cursus metus aliquam eleifend mi in. Tellus integer feugiat scelerisque varius morbi enim nunc. Dolor sit amet consectetur adipiscing elit ut aliquam. Suspendisse potenti nullam ac tortor vitae purus. Tristique risus nec feugiat in fermentum posuere urna nec. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Nisi quis eleifend quam adipiscing vitae. Interdum varius sit amet mattis vulputate enim nulla aliquet. Nullam ac tortor vitae purus faucibus.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa massa ultricies mi quis hendrerit dolor magna. Ipsum dolor sit amet consectetur adipiscing elit ut. Cursus metus aliquam eleifend mi in. Tellus integer feugiat scelerisque varius morbi enim nunc. Dolor sit amet consectetur adipiscing elit ut aliquam. Suspendisse potenti nullam ac tortor vitae purus. Tristique risus nec feugiat in fermentum posuere urna nec. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Nisi quis eleifend quam adipiscing vitae. Interdum varius sit amet mattis vulputate enim nulla aliquet. Nullam ac tortor vitae purus faucibus.
            </p>
          </div>
        </div>
        <BottomNav path={this.props.location}/>
      </Fragment>
    );
  }
}
