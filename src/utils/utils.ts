import {
	IUser, 
	ITravel, 
	IUserResponse, 
	IGroup, 
	ICard,
	IFriend,
    IPublicUser,
} from 'types/types';
import dayjs, {Dayjs} from 'dayjs';


export const getErrorMessage = (error: unknown):string => {
	if (error instanceof Error) return error.message;
	return String(error);
};

export const createNewUser = 
	(data: {login: string, email: string, password: string}
): IUser => {
	return {
		...data, 
		id: Date.now(), 
		friends: [], 
		friendRequests: [], 
		travels: []}
	;
};


export const createNewTravel = (value: string, startDate: Dayjs, endDate: Dayjs): ITravel => {
	return { 
		id: crypto.randomUUID(),
		name: value,
		dateStart: startDate.format('YYYY.MM.DD'),
		dateEnd: endDate.format('YYYY.MM.DD'),
		members: [],
		backlog: [],
		groups: [],
		places: [],
	};
};


export const createNewGroup = (title: string): IGroup => {
	return { id: crypto.randomUUID(), title, cards: [] };
};


export const createNewCard = (title: string, description: string): ICard => {
	return { id: crypto.randomUUID(), title, description };
};


export const saveUserToLocalStorage = (user: IUser): void => {
	localStorage.setItem('user', JSON.stringify(user));
};


export const isUserLoggedIn = (): boolean => {
	return localStorage.hasOwnProperty('user');
};


export const modifyUserResponseObject = (data: IUserResponse): IUser => {
	return {...data.user, password: data.accessToken};
};


export const stringToDayjsObject = (date: string): Dayjs => {
	const jsDateObj = dayjs(date).toDate();
	return dayjs(jsDateObj);
};


export const removeMembersFromFriendList = (members: IFriend[], friends: IFriend[]): IFriend[] => {
	return friends.filter((friend) => {
		const find = members.find(member => member.id === friend.id);
		return !find;
	}) || [];
};


export const removeFriendsFromAllUsers = (friends: IFriend[], users: IPublicUser[]): IPublicUser[] => {
	return users.filter((user) => {
		const find = friends.find(friend => friend.id === user.id);
		return !find;
	}) || [];
};