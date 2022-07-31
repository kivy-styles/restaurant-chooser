import React, {useState, useEffect} from 'react'
import {Modal} from 'react-bootstrap'


export default function Whosgoing(){
    const [List, setList]=useState([])
    const [Select, setSelect]=useState({})
    useEffect(()=>{
        let inPeople = localStorage.getItem('People')
        let inRestaurants = localStorage.getItem('Restaurants')
        if (inPeople===null){
            inPeople=[]
        }
        else{
            inPeople=JSON.parse(inPeople)
        }
        if (inRestaurants===null){
            inRestaurants=[]
        }
        else{
            inRestaurants=JSON.parse(inRestaurants)
        }
        if (inRestaurants.length===0 && inPeople.length!==0){
            location.href='/addrestaurants'
            alert("You have not added any restaurant to the restaurant's list")
        }
        if(inPeople.length===0 && inRestaurants.length!==0){
            location.href='/addpeople'
            alert('You have not added anyone to the list of People')
        }
        if(inPeople.length===0 && inRestaurants.length===0){
            location.href='/people'
            alert('The People list and Restaurant list are currently empty')
        }
        else if(inPeople.length===1){
            location.href='/addpeople'
            alert('Your People list must have more than one entry')
        }
        else{
        setList(inPeople)
        }
    },[])
    return(
        <div style={{padding:20}}>
            <div style={{textAlign:'center', paddingBottom:20}}><h2>Who's going?</h2></div>
            <div style={{paddingBottom:20, display:'flex',  paddingRight:20, justifyContent:'right'}}>
                <button className={'btn btn-default animate__animated animate__pulse animate__infinite'}
                        style={{borderRadius:5, backgroundColor:'whitesmoke'}}
                       type={'button'} onClick={(event)=>{
                    event.preventDefault()
                    let participants=[]
                    List.forEach((item)=>{
                        if(Select[item.id]===true){
                            item.vetoed='no'
                            participants.push(item)
                        }
                    })
                    if(participants.length===0){
                        alert("You haven't selected anyone to go with ya")
                    }
                    else{
                        let Participants=localStorage.getItem('Participants')
                        if(Participants===null){
                            Participants=[]
                        }
                        else{
                            Participants=JSON.parse(Participants)
                        }
                        Participants.push(participants)
                        localStorage.setItem('Participants',JSON.stringify(Participants))
                        console.dir(participants)
                        location.href='/filter'
                    }
                }}>Next &rarr;</button>
            </div>
            <div className='list-group'>
            {List && List.length>=2 && List.map(item=><div key={item.id} className='list-group-item' style={{fontSize:18, fontFamily:'Sofia'}}>
                <div className='row'>
                    <div className='col-sm-3 col-md-3 col-lg-3' style={{paddingLeft:20}}>{item.firstname}</div>
                    <div className='col-sm-3 col-md-3 col-lg-3' style={{paddingLeft:20}}>{item.lastname}</div>
                    <div className='col-sm-3 col-md-3 col-lg-3' style={{paddingLeft:20}}>{item.relationship}</div>
                    <input type={'checkbox'} className='col-sm-3 col-md-3' onClick={(Event)=> {
                        const select=Select
                        select[item.id]=!select[item.id]
                        setSelect(select)
                        console.log(Select)
                    }
                    }/>
                </div>
            </div>
            )}
            </div>
            <div style={{paddingTop:20, paddingBottom:20, display:'flex',  paddingRight:20, justifyContent:'right'}}>
                <button className={'btn btn-default animate__animated animate__pulse animate__infinite'}
                        style={{borderRadius:5, backgroundColor:'whitesmoke'}}
                        type={'button'} onClick={(event)=>{
                            event.preventDefault()
                            let participants=[]
                            List.forEach((item)=>{
                                if(Select[item.id]===true){
                                    item.vetoed='no'
                                    participants.push(item)
                                }
                            })
                    if(participants.length===0){
                        alert("You haven't selected anyone to go with ya")
                    }
                    else{
                        let Participants=localStorage.getItem('Participants')
                        if(Participants===null){
                            Participants=[]
                        }
                        else{
                            Participants=JSON.parse(Participants)
                        }
                        Participants.push(participants)
                        localStorage.setItem('Participants', JSON.stringify(Participants))
                        console.dir(participants)
                        location.href='/filter'
                    }
                }}>Next &rarr;</button>
            </div>
        </div>
    )
}

export function Filter(){
    const[cuisine, setCuisine]=useState('')
    const [rating, setRating]=useState('')
    const [delivery, setDelivery]=useState('')
    useEffect(()=>{
        let inPeople = localStorage.getItem('People')
        let inRestaurants = localStorage.getItem('Restaurants')
        let Participants = localStorage.getItem('Participants')
        if (inPeople===null){
            inPeople=[]
        }
        else{
            inPeople=JSON.parse(inPeople)
        }
        if (inRestaurants===null){
            inRestaurants=[]
        }
        else{
            inRestaurants=JSON.parse(inRestaurants)
        }
        if(Participants===null){
            Participants=[]
        }
        else{
            Participants=JSON.parse(Participants)
        }
        if (inRestaurants.length===0 && inPeople.length!==0){
            location.href='/addrestaurants'
            alert("You have not added any restaurant to the restaurant's list")
        }
        if(inPeople.length===0 && inRestaurants.length!==0){
            location.href='/addpeople'
            alert('You have not added anyone to the list of People')
        }
        if(inPeople.length===0 && inRestaurants.length===0){
            location.href='/people'
            alert('The People list and Restaurant list are currently empty')
        }
        else if(inPeople.length===1){
            location.href='/addpeople'
            alert('Your People list must have more than one entry')
        }
        else if(Participants.length===0){
            alert("You haven't selected anyone to go with ya")
            location.href='/whosgoing'
        }
    },[])
    return(
        <div style={{padding:20}}>
            <div style={{textAlign:'center',paddingBottom:20}}><h2>Add requirements<span style={{fontSize:19,
                fontStyle:'italic'}}>(Optional)</span></h2>
                <div style={{marginTop:10, fontStyle:'italic'}}>Only Restaurants that meet any of your requirements will be shortlisted.
                    You can also decide to leave all the fields blank to shortlist all the Restaurants</div>
            </div>
            <form style={{fontSize:20,fontFamily:'Sofia'}}>
                <div>
                    <label className={'col-sm-3 col-md-3 label label-default control-label'} style={{paddingTop:20}}
                           htmlFor={'name'}>> Cuisine<span style={{fontSize:16,fontStyle:'italic'}}>
                        (optional)</span></label>
                    <select className='col-xs-9 col-sm-9 col-md-9 form-control' id='cuisine' type='text' name='cuisine'
                            value={cuisine} onChange={(Event)=>setCuisine(Event.target.value)}>
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
                           htmlFor='rating'>> Rating<span style={{fontSize:16,fontStyle:'italic'}}>
                        (optional)</span></label>
                    <select className='col-xs-9 col-sm-9 col-md-9 form-control' id='rating' type='text' name='rating'
                            value={rating} onChange={(Event)=>setRating(Event.target.value)}>
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
                           htmlFor='delivery'>> Delivery<span style={{fontSize:16,fontStyle:'italic'}}>
                        (optional)</span></label>
                    <select className='col-xs-9 col-sm-9 col-md-9 form-control' id='delivery' type='text' name='delivery'
                            value={delivery} onChange={(Event)=>setDelivery(Event.target.value)}>
                        <option value=''></option>
                        <option value='No'>No</option>
                        <option value='Yes'>Yes</option>
                    </select>
                </div>
                <div style={{paddingTop:20, display:'flex',  paddingRight:20, justifyContent:'right'}}>
                    <button type='button' className={'btn btn-default animate__animated animate__pulse animate__infinite'}
                            style={{borderRadius:5, backgroundColor:'whitesmoke'}}
                    onClick={()=>{
                        let chosenRestaurants=[]
                         let inRestaurants=localStorage.getItem('Restaurants')
                        if (inRestaurants===null){
                            inRestaurants=[]
                        }
                        else{
                            inRestaurants=JSON.parse(inRestaurants)
                        }
                        inRestaurants.forEach(item=>{
                            let passTest=true
                            if(cuisine!==''){
                                if(Object.keys(cuisine).length>0){
                                if(cuisine!==item.name){
                                    passTest=false
                                    }
                                }
                            }
                            if(rating!==''){
                                if(rating!==item.rating){
                                    passTest=false
                                }
                            }
                            if(delivery!==''){
                                if(delivery!==item.delivery){
                                    passTest=false
                                }
                            }
                            if(cuisine.length===0 && rating==='' && delivery===''){
                                passTest=true
                            }
                            if(passTest===true){
                                chosenRestaurants.push(item)
                            }
                        })
                            if(chosenRestaurants.length===0){
                                alert('none of the restaurants match your requirements')
                            }
                            else{
                                let chosen=localStorage.getItem('chosenRestaurants')
                                if (chosen===null){
                                    chosen=[]
                                }
                                else{
                                    chosen=JSON.parse(chosen)
                                }
                                chosen.push(chosenRestaurants)
                                localStorage.setItem('chosenRestaurants', JSON.stringify(chosen))
                                location.href='/chosenrestaurants'
                            }

                    }}>Next &rarr;</button>
                </div>
            </form>
        </div>
    )
}

export function Chosen(){
    const [show, setShow]=useState(false)
    const [show2, setShow2]=useState(false)
    const [Participants, setParticipants]=useState([])
    const [Restaurants, setRestaurants]=useState([])
    const [chosenRestaurant, setChosenrestaurant]=useState({})
    const [hidden, setHidden]=useState(true)

    useEffect(()=>{
        let inPeople = localStorage.getItem('People')
        let inRestaurants = localStorage.getItem('Restaurants')
        let participants = localStorage.getItem('Participants')

        if (inPeople===null){
            inPeople=[]
        }
        else{
            inPeople=JSON.parse(inPeople)
        }
        if (inRestaurants===null){
            inRestaurants=[]
        }
        else{
            inRestaurants=JSON.parse(inRestaurants)
        }
        if(participants===null){
            participants=[]
        }
        else{
            participants=JSON.parse(participants)
        }
        if (inRestaurants.length===0 && inPeople.length!==0){
            location.href='/addrestaurants'
            alert("You have not added any restaurant to the restaurant's list")
        }
        if(inPeople.length===0 && inRestaurants.length!==0){
            location.href='/addpeople'
            alert('You have not added anyone to the list of People')
        }
        if(inPeople.length===0 && inRestaurants.length===0){
            location.href='/people'
            alert('The People list and Restaurant list are currently empty')
        }
        else if(inPeople.length===1){
            location.href='/addpeople'
            alert('Your People list must have more than one entry')
        }
        else if(participants.length===0){
            alert("You haven't selected anyone to go with ya")
            location.href='/whosgoing'
        }
        else{
            setParticipants(participants[0])
        }
        let restaurants=localStorage.getItem('chosenRestaurants')
        if (restaurants===null){
            restaurants=[]
        }
        else{
            restaurants=JSON.parse(restaurants)
        }
        if (restaurants.length===0){
            alert('No restaurant has been shortlisted')
            location.href='/whosgoing'
        }
        else{
        setRestaurants(restaurants[0])
        }
    },[]);

    console.dir(Restaurants)


    function handlemode(obj){
       return <Modal key={obj.id} show={show} onHide={()=>setShow(false)} size={'lg'} centered>
           <Modal.Header closeButton>
               <Modal.Title>Chosen Restaurant</Modal.Title>
           </Modal.Header>
           <Modal.Body>
               <h3>{obj.name}</h3><br/>
               <div>{'\u2B50'.repeat(obj.rating)}</div><br/>
               Phone number: {obj.phone}<br/>
               Website: {obj.website}<br/>
               Delivery: {obj.delivery}<br/>
           </Modal.Body>
           <Modal.Footer>
               <div hidden={hidden}>No vetoes left</div>
               <div><button className={'btn btn-primary'} onClick={(event)=>{event.preventDefault()
               location.href='/alldone'}}>Accept</button></div>
               <div><button className={'btn btn-primary'} onClick={()=>{
                   let stillveto=Participants.filter((item)=>{
                       return item.vetoed==='no'
                   })
                   if(stillveto.length===0 || !stillveto){
                       setHidden(false)
                   }
                   else{
                   setShow(false);
                   setShow2(true)}}}>Veto</button></div>
           </Modal.Footer>
       </Modal>
    }
    function handlemode2(obj){
        return <Modal show={show2} onHide={()=>setShow2(false)} size={'lg'} centered>
            <Modal.Header closeButton>
                <Modal.Title>Who's vetoing?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {obj.map(item=>{if(item.vetoed==='no'){return <div key={item.id} className={'row'} style={{paddingBottom:5}}>
                    <div className={'col-sm-4'}>{item.firstname}</div>
                    <div className={'col-sm-4'}>{item.lastname}</div>
                    <div className={'col-sm-4'}><button className={'btn btn-primary'} onClick={
                        ()=>{item.vetoed='yes'
                        setShow2(false)}
                    }>Veto</button></div>
                </div>
                }
                }
                )
                }
            </Modal.Body>
        </Modal>
    }
    function RandomSelect(b){
             let j=Math.floor(Math.random()*b.length)
            return j
    }

    return(
        <div style={{padding:20, fontSize:18}}>
            <div style={{textAlign:'center',paddingBottom:20}}><h2>Shortlisted Restaurants</h2><div
                style={{marginTop:10, fontStyle:'italic'}}>
                Below is the list of Restaurants that
                matched your requirements </div></div>
            <div className={'row'} style={{fontFamily:'Sofia'}}>
                <div className={'col-sm-3'}>NAME</div>
                <div className={'col-sm-3'}>CUISINE</div>
                <div className={'col-sm-3'}>RATING</div>
                <div className={'col-sm-3'}>DELIVERY</div>
            </div>
            <div className={'list-group'}style={{fontFamily:'Sofia'}}>
            {Restaurants.map(item=>(
                <div key={item.id} className={'list-group-item'}>
                    <div className={'row'}>
                    <div className={'col-sm-3'}>{item.name}</div>
                    <div className={'col-sm-3'}>{item.cuisine}</div>
                    <div className={'col-sm-3'}>{item.rating}</div>
                    <div className={'col-sm-3'}>{item.delivery}</div>
                    </div>
                </div>
            ))}
            </div>
            <div style={{textAlign:'center', marginTop:20}}><button className={'btn btn-primary'}
            onClick={()=>{const selected=Restaurants[RandomSelect(Restaurants)]
                setChosenrestaurant(selected)
                let theone=JSON.stringify(selected)
                localStorage.setItem('theone',theone)
                setShow(true)
            console.log(selected)
            }}>Randomly Choose</button></div>
            <div>
                {show && handlemode(chosenRestaurant)}
                {show2 && handlemode2(Participants)}
            </div>
        </div>
    )
}


export function Alldone(){
    const[done, setDone]=useState({})
    useEffect(()=>{
        let theone=localStorage.getItem('theone')
        theone=JSON.parse(theone)
        if(theone===undefined){
            alert('uh! uh!')
        }
        else{
            setDone(theone)
        }
        return ()=>{
            localStorage.removeItem('theone')
            alert()
        }
    },[])
    return(
        <div style={{padding:20}}>
            <div style={{textAlign:'center', padding:10}}><h1>
                Bon Appetit!!
            </h1></div>
            <h2 style={{padding:10}}>{done.name}</h2>
            <h3 style={{padding:10}}>{'\u2B50'.repeat(done.rating)}</h3>
            <h3 style={{padding:10}}>Delivery: {done.delivery}</h3>
            <h3 style={{padding:10}}>Address: {done.address}</h3>
            <h3 style={{padding:10}}>Phone: {done.phone}</h3>
            <h3 style={{padding:10}}>Website: {done.website}</h3>
        </div>
    )
}