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
        cost: number
    }

export interface BuyStock {
    type: 5;
    body: {
        uuid: String,
        amount: Number,
        cost: Number
    }
}

export interface ClientData {
    login : String,
	player_data :
		{
			money : Number,
			stocks :
			{
				amount : Number,
				list :
				[
					uuid : String,
                    name: String,
                    silver: {
                        amount: Number,
                        cost: Number
                    },
                    gold: {
                        amount: Number,
                        cost: Number,
                        owner: boolean
                    },
                ]
			},
            companies: []
		}
}

export interface NewsData {
    theme: String,
    source: String,
	server_time: Number
}

export interface ChatMessage {
    player_name: string,
    server_time: number,
    text: string
}

export interface ShortInfo {
    login: string;
    money: {
        money: number,
        stokes: number
    };
    news: {
        theme: string,
        source: string
    }
}