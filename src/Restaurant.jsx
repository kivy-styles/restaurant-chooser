import React from 'react'
import {Alert} from 'react-bootstrap'

export default class Restaurants extends React.Component{
    constructor(props) {
        super(props);
        this.state={listdata:[], name:'', show:true, item:{id:''}}
    }
    componentDidMount() {
        let inRestaurants=localStorage.getItem('Restaurants')
        if (inRestaurants===null){
            inRestaurants=[]
        }
        else
        {inRestaurants=JSON.parse(inRestaurants)}
        this.setState({listdata:inRestaurants})
    }
    handledelete(item){
        return <Alert key={item.id} variant='danger' style={{position:'absolute', top:'50%', left:'35%', fontSize:18}}
                      show={!this.state.show} dismissible>
            Are you sure you want to delete this restaurant<span className='row'>
                    <button className='btn btn-primary btn-sm col-sm-4 col-md-4 col-lg-4' onClick={()=>this.setState({show:true})}>No</button>
                    <button className='btn btn-primary btn-sm col-sm-4 col-md-4 col-lg-4' onClick={(Event)=>{
                        Event.preventDefault();
                        let inRestaurants=localStorage.getItem('Restaurants')
                        if(inRestaurants===null){
                            inRestaurants=[]
                        }
                        else{
                            inRestaurants=JSON.parse(inRestaurants)
                        }
                        //const filterPeople=inPeople.filter(val=>val.id!=item.id)
                        for(let i=0; i<inRestaurants.length; i++){
                            const restaurant=inRestaurants[i]
                            if(item.id===restaurant.id){
                                inRestaurants.splice(i,1)
                                break;
                            }
                        }
                        inRestaurants=JSON.stringify(inRestaurants)
                        localStorage.setItem('Restaurants',inRestaurants)
                        this.setState({listdata:inRestaurants})
                        location.href='/restaurants'
                    }
                    }>Yes</button>
                </span>
        </Alert>
    }
    render(){
        const Items=this.state.listdata.map(
            (item)=><div key={item.id} className='list-group-item' style={{fontSize:18, fontFamily:'Sofia'}}>
                <div className='row arrange-people'>
                    <div className='col-sm-3 col-md-3 col-lg-3 restaurant-name'>{item.name}</div>
                    <span className='col-sm-6 col-md-6'></span>
                    <button className='col-sm-3 col-md-3 col-lg-3 btn btn-primary delete-btn' onClick={(Event)=> {
                        this.setState({show:false, item:item})
                    }
                    }>Delete</button>
                </div>
            </div>
        )
        return(
            <div className={'main-container'}>
                <div style={{marginTop:20}} onClick={(Event)=>{Event.preventDefault(); location.href='/addrestaurants'}}>
                    <button className='btn btn-primary btn-lg' style={{width:'100%'}}><a style={{color:'white', textDecoration:'none'}}
                                                                                         href='/addrestaurants'>Add Restaurants</a></button>
                </div>
                <form style={{width:'100%'}}>
                    <div className='input-group' style={{paddingTop:10}}>
                        <div className='input-group-addon'>
                            <button className='btn' onClick={(event)=>{
                                event.preventDefault()
                                let restaurants=localStorage.getItem('Restaurants')
                                if(restaurants===null){
                                    restaurants=[]
                                }
                                else{
                                    restaurants=JSON.parse(restaurants)
                                }
                                let inrestaurants=restaurants.filter(item=>{
                                    if(this.state.name===item.name){
                                        return item
                                    }
                                })
                                this.setState({listdata:inrestaurants})
                            }}><span className='glyphicon glyphicon-search'></span>Search</button>
                        </div>
                        <input className='form-control' type='text' name='name' value={this.state.name}
                               onChange={(Event)=>{
                                   let value
                                   value=Event.target.value
                                   let newvalue=value.toUpperCase()
                                   this.setState({name:newvalue})}}/>
                    </div>
                </form>
                <div className='list-group'style={{paddingTop:20}}>
                    {Items}
                </div>
                {!this.state.show && this.handledelete(this.state.item)}
            </div>
        )
    }
}
