 import React from 'react'
import {Alert} from 'react-bootstrap'

export default class Decision extends React.Component{
    constructor(props) {
        super(props);
        this.state={show:false, show2:false, show3:false}
    }
    handleAlert1(){
        return <Alert show={this.state.show} style={{position:'absolute', top:'50%', left:'35%', fontSize:18}}
                      variant='danger' onClose={()=>this.setState({show:false})} dismissible>
            <Alert.Heading>Oops!!</Alert.Heading>
            You have not added anyone to the list of People
        </Alert>
    }
    handleAlert2(){
        return <Alert show={this.state.show2} style={{position:'absolute', top:'50%', left:'35%', fontSize:18}}
                      onClose={()=>this.setState({show2:false})} variant='danger' dismissible>
            <Alert.Heading>Oops!!</Alert.Heading>
            You have not added any restaurant to the list of Restaurants
        </Alert>
    }
    handleAlert3 (){
        return <Alert show={this.state.show3} style={{position:'absolute', top:'50%', left:'35%', fontSize:18}}
                      onClose={()=>this.setState({show3:false})} variant='danger' dismissible>
            <Alert.Heading>Oops!!</Alert.Heading>
            The people and restaurants lists are currently empty<br/>
        </Alert>
    }
    render(){
        return(
            <div className={'container'} style={{textAlign:'center'}}>
                <div>
                    <img className={'arrow'} src='./images/arrow.png'/>
                </div>
                <div onClick={()=>{
                    let inPeople=localStorage.getItem('People')
                    let inRestaurants= localStorage.getItem('Restaurants')
                    if(inPeople===null){
                        inPeople=[]
                    }
                    else{
                        inPeople=JSON.parse(inPeople)
                    }
                    if(inRestaurants===null){
                        inRestaurants=[]
                    }
                    else{
                        inRestaurants=JSON.parse(inRestaurants)
                    }
                    if (inPeople.length===0 && inRestaurants.length!==0){
                        this.setState({show:true})
                    }
                    else if (inRestaurants.length===0 && inPeople.length!==0){
                        this.setState({show2:true})
                    }
                    else if (inRestaurants.length===0 && inPeople.length===0){
                        this.setState({show3:true})
                    }
                    else{
                        location.href='/whosgoing'
                    }
                }}>
                    <img className={'image'} src='./images/dishes.png'/>
                </div>
                <div>
                    {this.state.show && this.handleAlert1()}
                    {this.state.show2 && this.handleAlert2()}
                    {this.state.show3 && this.handleAlert3()}
                    {console.log(this.state.show)}
                </div>
            </div>
        )
    }
}