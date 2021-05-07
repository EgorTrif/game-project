export interface LoginData {
type: 1;
body: {
    login: string
    password: string
    }
}

export interface KeepAlive {
    type: 3;
    body: {};
}

export interface CompaniesList {
        uuid: String,
        name: String,
        cost: Number
    }