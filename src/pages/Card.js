import React, { Component } from 'react';
import fire from '../config/fire';
import '../styles/card.css';

const db=fire.firestore();

class Card extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            complains:[],
            cards:[]
        }
    }
   

    BackgroundSelector =(n)=>{
        if(n%2 === 0)
            return "rgba(120,120,255,0.15)";
        else
            return "rgba(120,120,255,0.6)";
    } 


    getCards(){
                const cards = this.state.complains.map( (complain,index) => 
                    <div className="accordion ComplainContainer mt-1" id={"accordion"+index} key={index}>
                        <div className="card" style={{backgroundColor:this.BackgroundSelector(index)}}>
                            <div className="card-header" id={"heading"+index}> 
                                <div className="row card-head" data-toggle="collapse" data-target={"#collapse"+index} aria-expanded="true" aria-controls="collapseOne1">
                                    <div className='complain-heading col-lg-6 col-xs-6'>{complain.problem_type}</div>
                                    <div className='status col-lg-3 col-xs-3'>date</div>
                                    <div className='date col-lg-3 col-xs-3'>{complain.Status}</div>
                                </div>
                            </div>

                            <div id={"collapse"+index} className="collapse p-2" aria-labelledby={"heading"+index} data-parent={"#accordion"+index}>
                                <div className="card-body row">
                                    <div className="col-lg-6 card-col col-sm-12">
                                        <h6 className="card-subtitle type label">Problem Type:</h6>
                                        <div>{complain.problem_type} </div>
                                        <h6 className="card-subtitle desc label">Problem Description:</h6>
                                        <div>{complain.problem_description} </div>
                                    </div>
                                    <div className="col-lg-3 card-col col-sm-12">
                                        <h6 className="card-subtitle district label">District:</h6>
                                        <div>{complain.District} </div>
                                        <h6 className="card-subtitle panchayat label">Panchayat:</h6>
                                        <div>{complain.Panchayat} </div>
                                        <h6 className="card-subtitle ward label">Ward:</h6>
                                        <div>{complain.Ward_no} </div>
                                        <h6 className="card-subtitle landmark label">Landmark:</h6>
                                        <div>{complain.Landmark} </div>
                                    </div>
                                    <div className = "col-lg-3 card-col col-sm-12">
                                        <h6 className="card-subtitle user label">Email:  </h6>
                                        <div>{complain.mail_id}</div>
                                        <h6 className="card-subtitle phone label">Phone:</h6>
                                        <div>{complain.ph_no} </div>
                                    </div>
                                    <div className= "col-lg-12">
                                        <button className="btn btn-success Rectified float-right">Mark Rectified</button>
                                    </div>
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
            <div id="Cards">
                { this.state.cards }
            </div>
        );
    }
}

export default Card;