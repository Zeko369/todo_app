import React, { Component, Fragment } from 'react';
import './Home.css'

import Card from '../components/Card'
import CreateTodoButton from '../components/CreateTodoButton'

class Home extends Component {
  render() {
    let aLot = [];
    for(let i = 0; i<20; i++){
      aLot.push(<Card key={i} title="Title" description="Fooo bar asdlkj asd jsad asd"/>);
    }

    return (
      <Fragment>
        <div className="container">
          <div className="card-container">
            <Card title="Title"/>
            <Card title="Title" description="Fooo bar asdlkj asd jsad asd"/>
            <Card title="Title" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor tortor elit, in accumsan felis suscipit et. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam pretium."/>
            { aLot }
          </div>

          <CreateTodoButton/>
        </div>
      </Fragment>
    );
  }
}

export default Home;
