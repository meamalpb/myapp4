import React, { Component } from 'react';
import fire from '../config/fire';
import '../styles/card.css';
import $ from 'jquery';

const db=fire.firestore();

class Card extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            complains:[],
            cards:[]
        }
    }
   
    


    getCards(){
                const cards = this.state.complains.map( (complain,index) => 
                    <div className="accordion ComplainContainer mt-1" id={"accordion"+index} key={index}>
                        <div className="card">
                            <div className="card-header" id={"heading"+index}> 
                                <button className="btn btn-link col-lg-10" data-toggle="collapse" data-target={"#collapse"+index} aria-expanded="true" aria-controls="collapseOne1">
                                    <span className='complain-heading'>{complain.problem_type}</span>
                                    <span className='float-right status'>Status</span>
                                    <span className='float-right date'>Date</span>
                                </button>
                            </div>

                            <div id={"collapse"+index} className="collapse p-2" aria-labelledby={"heading"+index} data-parent={"#accordion"+index}>
                                <div className="card-body row">
                                    <div className = "col-lg-3 card-col">
                                        <h6 className="card-subtitle user label">User:  </h6>
                                        <div></div>
                                        <h6 className="card-subtitle phone label">Phone:</h6>
                                        <div>{complain.ph_no} </div>
                                    </div>
                                    <div className="col-lg-3 card-col">
                                        <h6 className="card-subtitle district label">District:</h6>
                                        <div>{complain.District} </div>
                                        <h6 className="card-subtitle panchayat label">Panchayat:</h6>
                                        <div>{complain.Panchayat} </div>
                                        <h6 className="card-subtitle ward label">Ward:</h6>
                                        <div>{complain.Ward_no} </div>
                                        <h6 className="card-subtitle landmark label">Landmark:</h6>
                                        <div>{complain.Landmark} </div>
                                    </div>
                                    <div className="col-lg-6 card-col">
                                        <h6 className="card-subtitle type label">Problem Type:</h6>
                                        <div>{complain.problem_type} </div>
                                        <h6 className="card-subtitle desc label">Problem Description:</h6>
                                        <div>{complain.problem_description} </div>
                                    </div>
                                    <button className="btn btn-success Rectified">Mark Rectified</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    );

        this.setState({
            cards:cards
        });
    }




    componentDidMount(){
        db.collection('Complaints').get().then(snapshot => {
            let temp = [];
			snapshot.docs.forEach(doc => {
                temp.push(doc.data());
            });
            this.setState({
                complains:temp
            }, this.getCards)
        });
    }



    render() {
        return (
            <div>
                { this.state.cards }
            </div>
        );
    }
}

export default Card;