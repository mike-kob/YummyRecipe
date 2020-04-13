import React, {Suspense} from 'react'
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom'

import RecipeList from './components/RecipeList'
import AddRecipe from './components/AddRecipe'
import EditRecipe from './components/EditRecipe'
import Header from './components/Header'
import Footer from './components/Footer'
import RecipePage from './components/RecipePage'
import ProfileRecipes from './components/ProfileRecipes';


function Router() {
    return (
        <HashRouter basename='/'>
            <Header/>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path="/recipes" component={RecipeList}/>
                    <Route path="/recipes/:recipeId" component={RecipePage}/>
                    <Route path="/add" component={AddRecipe}/>
                    <Route path="/edit/:recipeId" component={EditRecipe}/>
                    <Route path="/profile" component={ProfileRecipes}/>

                    <Redirect to="/recipes"/>
                </Switch>
            </Suspense>
            <Footer/>
        </HashRouter>
    )
}


export default Router;