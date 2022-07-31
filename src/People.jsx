import React from 'react'
import {Alert} from 'react-bootstrap'

export default class People extends React.Component{
    constructor(props) {
        super(props);
        this.state={listdata:[], name:'', show:true, item:{id:''}}
    }
    componentDidMount() {
        let inPeople=localStorage.getItem('People')
        if (inPeople===null){
            inPeople=[]
        }
        else
        {inPeople=JSON.parse(inPeople)}
        this.setState({listdata:inPeople})
    }
    handledelete(item){
        return <Alert key={item.id} variant='danger' show={!this.state.show} dismissible>
            Are you sure you want to delete this person<span className='row'>
                    <button className='btn btn-primary btn-sm col-sm-4 col-md-4 col-lg-4' onClick={()=>this.setState({show:true})}>No</button>
                    <button className='btn btn-primary btn-sm col-sm-4 col-md-4 col-lg-4' onClick={(Event)=>{
                        Event.preventDefault();
                        let inPeople=localStorage.getItem('People')
                        if(inPeople===null){
                            inPeople=[]
                        }
                        else{
                            inPeople=JSON.parse(inPeople)
                        }
                        //const filterPeople=inPeople.filter(val=>val.id!=item.id)
                        for(let i=0; i<inPeople.length; i++){
                            const person=inPeople[i]
                            if(item.id===person.id){
                                inPeople.splice(i,1)
                                break;
                            }
                        }
                        inPeople=JSON.stringify(inPeople)
                        localStorage.setItem('People',inPeople)
                        this.setState({listdata:inPeople})
                        location.href='/people'
                    }
                    }>Yes</button>
                </span>
        </Alert>
    }
    render(){
        const Items=this.state.listdata.map(
            (item)=><div key={item.id} className='list-group-item' style={{fontSize:18, fontFamily:'Sofia'}}>
                <div className='row'>
                <div className='col-sm-3 col-md-3 col-lg-3' style={{paddingLeft:20}}>{item.firstname}</div>
                <div className='col-sm-3 col-md-3 col-lg-3' style={{paddingLeft:20}}>{item.lastname}</div>
                <div className='col-sm-3 col-md-3 col-lg-3' style={{paddingLeft:20}}>{item.relationship}</div>
                <button className='col-sm-3 col-md-3 col-lg-3 btn btn-primary' onClick={(Event)=> {
                    this.setState({show:false, item:item})
                }
                }>Delete</button>
            </div>
        </div>
        )
        return(
            <div style={{marginTop:20, marginLeft:20, marginRight:20}}>
                <div style={{marginTop:20}} onClick={()=>{location.href='/addpeople'}}>
                    <button className='btn btn-primary btn-lg' style={{width:'100%'}}><a
                        style={{color:'white', textDecoration:'none'}} href='/addpeople'>Add People</a></button>
                </div>
                <form style={{width:'100%'}}>
                    <div className='input-group' style={{paddingTop:10}}>
                        <div className='input-group-addon'>
                            <button className='btn' onClick={(event)=>{
                                event.preventDefault()
                                let people=localStorage.getItem('People')
                                if(people===null){
                                    people=[]
                                }
                                else{
                                    people=JSON.parse(people)
                                }
                                let inpeople=people.filter(item=>{
                                    if(this.state.name===item.firstname || this.state.name===item.lastname){
                                        return item
                                    }
                                })
                                this.setState({listdata:inpeople})
                            }}
                            ><span className='glyphicon glyphicon-search'></span>Search</button>
                        </div>
                        <input className='form-control' type='text' name='name' value={this.state.name}
                               onChange={(Event)=>{
                                   let value
                                   value=Event.target.value
                                   let newvalue=value.toUpperCase()
                                   this.setState({name:newvalue})}}/>
                    </div>
                </form>
                <div className='list-group' style={{paddingTop:20}}>
                        {Items}
                </div>
                {!this.state.show && this.handledelete(this.state.item)}
            </div>
        )
    }
}
