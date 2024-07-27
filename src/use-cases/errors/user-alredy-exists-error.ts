export class UserAlredyExistError extends Error {
    constructor() {
        super('Email alredy exists.')
    }
}