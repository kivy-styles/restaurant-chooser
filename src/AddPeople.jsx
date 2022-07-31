import React from 'react'
import {useNavigate} from 'react-router-dom'

export default class AddPeople extends React.Component{
    constructor(props) {
        super(props);
        this.state={firstname:'', lastname:'', relationship:'', id: new Date()
    }
    }
    render(){
        return(
            <div className={'container'}>
                <form style={{fontSize:20,fontFamily:'Sofia'}} onSubmit={(event)=>{
                    let navigate=useNavigate()
                    event.preventDefault();
                    navigate('./people',{replace:true})}}>
                    <div className='form-group row' style={{paddingTop:20}}>>
                        <label className='col-sm-3 col-md-3 col-lg-3 label label-default control-label'
                               htmlFor='firstname'>First name</label>
                        <input className='col-sm-9 col-md-9 col-lg-9 form-control' id='firstname' type='text' name='firstname'
                               value={this.state.firstname}
                               onChange={(Event) => {
                                   let value
                                   value=Event.target.value
                                   let newvalue=value.toUpperCase()
                                   return this.setState({firstname: newvalue})
                               }
                        }/>
                    </div>
                    <div className='form-group row' style={{paddingTop:20}}>>
                        <label className='col-sm-3 col-md-3 col-lg-3 label label-default control-label'
                               htmlFor='lastname'>Last name</label>
                        <input className='col-sm-9 col-md-9 col-lg-9 form-control' id='lastname' type='text' name='lastname' value={this.state.lastname}
                               onChange={(Event) => {
                                   let value
                                   value=Event.target.value
                                   let newvalue=value.toUpperCase()
                                   this.setState({lastname: newvalue})
                               }
                        }/>
                    </div>
                    <div className='form-group row' style={{paddingTop:20}}>>
                        <label className='col-sm-3 col-md-3 col-lg-3 label label-default control-label'
                               htmlFor='relationship'>Relationship</label>
                        <input className='col-sm-9 col-md-9 col-lg-9 form-control' id='relationship' type='text'
                               name='relationship' value={this.state.relationship}
                               onChange={(Event) => {
                                   let value
                                   value=Event.target.value
                                   let newvalue=value.toUpperCase()
                                   this.setState({relationship: newvalue})
                               }
                        }/>
                    </div>
                    <div className='text-center' style={{textAlign:'center',paddingTop:20}}>
                        <input type='submit' style={{width:100}} name='submit' value='Submit' className='btn btn-primary' onClick={(Event)=> {
                                let inPeople = localStorage.getItem('People')
                                if (inPeople === null) {
                                    inPeople = []
                                } else {
                                    inPeople = JSON.parse(inPeople)
                                }
                                inPeople.push(this.state)
                                inPeople = JSON.stringify(inPeople)
                                localStorage.setItem('People', inPeople)
                        }
                        }/>
                    </div>
                </form>
            </div>
        )
    }
}