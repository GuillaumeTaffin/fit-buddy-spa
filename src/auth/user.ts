export class User {
	constructor(readonly id: string) {}
}

export class UserDao extends User {}

export class UserViewModel {
	constructor(readonly authenticated: boolean, readonly id: string) {}
}
