import React, { Component } from 'react'
import fire from '../config/fire'

const db=fire.firestore()

class home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             users:[]
        }
    }
    

    componentDidMount(){
		db.collection('users').get().then(snapshot => {
			snapshot.docs.forEach(doc => {
                this.setState(prevState => ({
                    users: [...prevState.users, doc.data()]
                  }))
                  
                this.state.users.map(user=> console.log(user.name,user.email) )
                
			});
		});
	}
    render() {
        return (
            <div>
                <h1>home</h1>
                
            </div>
        )
    }
}

export default home
