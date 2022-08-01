import React from 'react'

export default class AddRestaurants extends React.Component{
    constructor(props) {
        super(props);
        this.state={name:'', cuisine:'', rating:'',phone:'',address:'',website:'',delivery:'', id : new Date()}
    }
    handleInput
    render(){
        return(
            <div className={'main-container'}>
                <form  style={{fontSize:20,fontFamily:'Sofia'}}>
                    <div className='form-group row' style={{paddingTop:20}}>
                        <label className='col-sm-3 col-md-3 label label-default control-label'
                               htmlFor='name'>> Restaurant's Name</label>
                        <input className='col-xs-9 col-sm-9 col-md-9 form-control' id='name' type='text' name='name'
                               value={this.state.name} onInput={(Event)=>{
                            let value
                            value=Event.target.value
                            let newvalue=value.toUpperCase()
                                   this.setState({name:newvalue})}}/>
                    </div>
                    <div className='form-group row' style={{paddingTop:20}}>
                        <label className='col-xs-3 col-sm-3 col-md-3 label label-default control-label'
                               htmlFor='cuisine'>> Cuisine</label>
                        <select className='col-xs-9 col-sm-9 col-md-9 form-control' id='cuisine' type='text' name='cuisine'
                               value={this.state.cuisine} onChange={(Event)=>this.setState({cuisine:Event.target.value})}>
                            <option value=''></option>
                            <option value='English'>English</option>
                            <option value='Yoruba'>Yoruba</option>
                            <option value='Igbo'>Igbo</option>
                            <option value='hausa'>Hausa</option>
                            <option value='mixed'>Mixed</option>
                            <option value='Other Nigerian Delicacies'>Other Nigerian Delicacies</option>
                        </select>
                    </div>
                    <div className='form-group row' style={{paddingTop:20}}>
                        <label className='col-xs-3 col-sm-3 col-md-3 label label-default control-label'
                               htmlFor='rating'>> Rating</label>
                        <select className='col-xs-9 col-sm-9 col-md-9 form-control' id='rating' type='text' name='rating'
                                value={this.state.rating} onChange={(Event)=>this.setState({rating:Event.target.value})}>
                            <option value=''></option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>
                    <div className='form-group row' style={{paddingTop:20}}>
                        <label className='col-xs-3 col-sm-3 col-md-3 label label-default control-label'
                               htmlFor='delivery'>> Delivery</label>
                        <select className='col-xs-9 col-sm-9 col-md-9 form-control' id='delivery' type='text' name='delivery'
                                value={this.state.delivery} onChange={(Event)=>this.setState({delivery:Event.target.value})}>
                            <option value=''></option>
                            <option value='No'>No</option>
                            <option value='Yes'>Yes</option>
                        </select>
                    </div>
                    <div className='form-group row' style={{paddingTop:20}}>
                        <label className='col-xs-3 col-sm-3 col-md-3 label label-default control-label'
                               htmlFor='phone'>> Phone number</label>
                        <input className='col-xs-9 col-sm-9 col-md-9 form-control' id='phone' type='tel' name='phone'
                               value={this.state.phone} onInput={(Event)=>this.setState({phone:Event.target.value})}/>
                    </div>
                    <div className='form-group row' style={{paddingTop:20}}>
                        <label className='col-xs-3 col-sm-3 col-md-3 label label-default control-label'
                               htmlFor='address'>> Address</label>
                        <input className='col-xs-9 col-sm-9 col-md-9 form-control' id='address' type='text' name='address'
                               value={this.state.address} onInput={(Event)=>this.setState({address:Event.target.value})}/>
                    </div>
                    <div className='form-group row' style={{paddingTop:20}}>
                        <label className='col-xs-3 col-sm-3 col-md-3 label label-default control-label'
                               htmlFor='address'>> Website</label>
                        <input className='col-xs-9 col-sm-9 col-md-9 form-control' id='website' type='text' name='website'
                               value={this.state.website} onInput={(Event)=>this.setState({website:Event.target.value})}/>
                    </div>
                    <div className='text-center' style={{textAlign:'center',paddingTop:20}}>
                        <input type='submit' style={{width:100}} name='submit' value='Submit' className='btn btn-primary' onClick={(Event)=> {
                            let inRestaurants = localStorage.getItem('Restaurants')
                            if (inRestaurants === null) {
                                inRestaurants = []
                            } else {
                                inRestaurants = JSON.parse(inRestaurants)
                            }
                            inRestaurants.push(this.state)
                            inRestaurants = JSON.stringify(inRestaurants)
                            localStorage.setItem('Restaurants', inRestaurants)
                        }
                        }/>
                    </div>
                </form>
            </div>
        )
    }
}