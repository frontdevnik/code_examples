import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Routes } from '../constans';
import Home from '../features/home/Home';
import LoginPage from '../features/login/LoginPage';
import ProtectedRoutes from './ProtectedRoutes';
import RegistrationPage from '../features/registration/RegistrationPage';
import Movie from '../features/movie/Movie';
import EditMovie from '../features/editMovie/EditMovie';
import ActorPage from '../features/actor/ActorPage';
import NotFoundPage from '../features/notFoundPage/NotFoundPage';

export const Routers = (
  <Switch>
    <ProtectedRoutes path={Routes.HOMEPAGE} component={Home} />
    <ProtectedRoutes exact path={`${Routes.MOVIE}/:id`} component={Movie} />
    <ProtectedRoutes path={`${Routes.MOVIE}/:id/edit`} component={EditMovie} />
    <ProtectedRoutes path={`${Routes.ACTOR}/:id`} component={ActorPage} />
    <Route exact path={Routes.LOGIN} component={LoginPage} />
    <Route exact path={Routes.REGISTRATION} component={RegistrationPage} />
    <Route exact path="/" component={LoginPage} />
    <Route component={NotFoundPage} />
  </Switch>
);
