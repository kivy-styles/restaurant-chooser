import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import People from './People.jsx'
import AddPeople from './AddPeople.jsx'
import Restaurants from './Restaurant.jsx'
import AddRestaurants from './AddRestaurant.jsx'
import Decision from './Decision.jsx'
import  Whosgoing, {Filter,Chosen, Alldone} from './Whosgoing.jsx'




const contentNode= document.getElementById('container')

const App = ()=>(
    <div className='container-fluid'>
        <nav className='navbar' style={{backgroundColor:'#3E606F', height:150}}>
            <div className='navbar-header'>
                <div className='navbar-brand' style={{marginLeft:20, fontFamily:'Sofia'}}>
                    <a href='/people' style={{textDecoration:'none',color:'#B9E6F2'}}>
                    <h1><b>Restaurant</b></h1>
                    <h1><b>chooser</b></h1>
                    </a>
                </div>
            </div>
            <ul className='nav nav-pills'>
                <div className='row arrange-nav'>
                    <li className='col-sm-4 col-md-4 col-lg-4 people-nav' >
                        <Link to='/people' style={{textDecoration:'none', color:'white', fontSize:20,fontFamily:'Sofia'}}>People</Link></li>
                    <li className='col-sm-3 col-md-3 col-lg-3 decision-nav'><Link to='/decision' style={{textDecoration:'none', color:'white', fontSize:20,fontFamily:'Sofia'}}>Decision</Link></li>
                    <li className='col-sm-4 col-md-4 col-lg-4 restaurant-nav'><Link to='/restaurants'  style={{textDecoration:'none', color:'white',fontSize:20,fontFamily:'Sofia'}}>Restaurants</Link></li>
                </div>
            </ul>
        </nav>
        <Routes>
            <Route index element={<People/>}/>
            <Route path='people' element={<People/>}/>
            <Route path='addpeople' element={<AddPeople/>}/>
            <Route path='restaurants' element={<Restaurants/>}/>
            <Route path='addrestaurants' element={<AddRestaurants/>}/>
            <Route path='decision' element={<Decision/>}/>
            <Route path='whosgoing' element={<Whosgoing/>}/>
            <Route path={'filter'} element={<Filter/>}/>
            <Route path={'chosenrestaurants'} element={<Chosen/>}/>
            <Route path={'alldone'} element={<Alldone/>}/>
        </Routes>
    </div>
)

const RoutedApp=()=>(
    <Router>
        <Routes>
            <Route path='/*' element={<App/>}/>
        </Routes>
    </Router>
)

ReactDOM.render(<RoutedApp/>,contentNode)

if (module.hot){
    module.hot.accept();
}