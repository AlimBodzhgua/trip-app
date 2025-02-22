import {lazy} from 'react';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const ProfilePage = lazy(() => import('pages/ProfilePage/ProfilePage'));
const RegisterPage = lazy(() => import('pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));
const TravelsPage = lazy(() => import('pages/TravelsPage/TravelsPage'));
const TravelDetailsPage = lazy(() => import('pages/TravelDetailsPage/TravelDetailsPage'));
const UsersPage = lazy(() => import('pages/UsersPage/UsersPage'));
const FriendsPage = lazy(() => import('pages/FriendsPage/FriendsPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage/NotFoundPage'));

export enum RouteNames {
	HOME = '/',
	NOT_FOUND = '*',
	TRAVELS = '/travels',
	TRAVEL_DETAILS = '/travels/:id',
	PROFILE = '/profile',
	REGISTER = '/regiser',
	LOGIN = '/login',
	USERS = '/users',
	FRIENDS = '/friends',
}

export const getTravelPage = (id: string | number) => `/travels/${id}`;

export const privateRoutes = [
	{path: RouteNames.HOME, component: <HomePage />},
	{path: RouteNames.TRAVELS, component: <TravelsPage />},
	{path: RouteNames.TRAVEL_DETAILS, component: <TravelDetailsPage />},
	{path: RouteNames.PROFILE, component: <ProfilePage />},
	{path: RouteNames.NOT_FOUND, component: <NotFoundPage />},
	{path: RouteNames.USERS, component: <UsersPage />},
	{path: RouteNames.FRIENDS, component: <FriendsPage />},

];

export const publicRoutes = [
	{path: RouteNames.HOME, component: <HomePage />},
	{path: RouteNames.LOGIN, component: <LoginPage />},
	{path: RouteNames.REGISTER, component: <RegisterPage />},
	{path: RouteNames.NOT_FOUND, component: <NotFoundPage /> }
];