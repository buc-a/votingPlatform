
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';


export type TRegisterData = {
  name: string;
  password: string;
};

const baseUrl = 'http://172.20.10.2:8000';

export type TRegisterResponse = {
    username: string;
    access_token: string;
    token_type: string;
};

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const registerUserApi = (data: TRegisterData) =>{
    return fetch(baseUrl + '/register/', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: data.name,  
            password: data.password
        }),
    })
    .then(checkResponse<TRegisterResponse>);
}

export const loginUserApi = (data: TRegisterData) => {
  const formData = new URLSearchParams();
  formData.append("username", data.name);
  formData.append("password", data.password);

  return fetch(baseUrl + '/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  }).then(checkResponse<TRegisterResponse>);
};



export class Api {
    readonly baseUrl: string;
    protected options: RequestInit;

    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers as object ?? {})
            }
        };
    }

    protected handleResponse(response: Response): Promise<object> {
        if (response.ok) return response.json();
        else return response.json()
            .then(data => Promise.reject(data.error ?? response.statusText));
    }

    get(uri: string) {
        if (uri === "/all"){
            return [{
                id: '1234',
                owner: '2222',
                name: 'Кофе или чай?',
                description: "Ученые выяснили, что самая важная часть дня - утро. Поделитесь тем, чем вы его начинаете: бодрящий кофе или сладкий чай?",
                photo: 'https://avatars.mds.yandex.net/i?id=d740c540e95bf3f94b775d202cb75d19_l-8287363-images-thumbs&n=13',
                variants: [
                    {name: 'Чай', count: 22, selected: true},
                    {name: 'Чай', count: 32, selected: false},
                    {name: 'Чай', count: 22, selected: true},
                    {name: 'Чай', count: 22, selected: true},
                    {name: 'Чай', count: 22, selected: true},
                    {name: 'Чай', count: 22, selected: true}
                ]  
            },{
                id: '1234',
                owner: '2223',
                name: 'Привлечение к ответственности Адама Кадырова',
                description: "Адам Кадыров, избивший журналиста Никиту Журавеля, должен сидеть в тюрьме. Адам Кадыров, избивший журналиста Никиту Журавеля, должен сидеть в тюрьме",
                photo: 'https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_66cbbad76e0d2e2fbef8bdbb_66cbbada6e0d2e2fbef8c149/scale_1200',
                variants: [
                    {name: 'За', count: 22, selected: false},
                    {name: 'Против', count: 32, selected: false},
                ]  
            }]            
        }

        else if (uri === "/votings?owner=1234"){
            return [{
                id: '1234',
                owner: '2222',
                name: 'Кофе или чай?',
                description: "Ученые выяснили, что самая важная часть дня - утро. Поделитесь тем, чем вы его начинаете: бодрящий кофе или сладкий чай?",
                photo: 'https://avatars.mds.yandex.net/i?id=d740c540e95bf3f94b775d202cb75d19_l-8287363-images-thumbs&n=13',
                variants: [
                    {name: 'Чай', count: 22, selected: true},
                    {name: 'Чай', count: 32, selected: false},
                ]  
            },{
                id: '1234',
                owner: '2223',
                name: 'Привлечение к ответственности Адама Кадырова',
                description: "Адам Кадыров, избивший журналиста Никиту Журавеля, должен сидеть в тюрьме. Адам Кадыров, избивший журналиста Никиту Журавеля, должен сидеть в тюрьме",
                photo: 'https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_66cbbad76e0d2e2fbef8bdbb_66cbbada6e0d2e2fbef8c149/scale_1200',
                variants: [
                    {name: 'За', count: 22, selected: false},
                    {name: 'Против', count: 32, selected: false},
                ]  
            }]  
        }
        else if (uri === "/part?user=2222"){
            return [{
                id: '1234',
                owner: '2222',
                name: 'Кофе или чай?',
                description: "Ученые выяснили, что самая важная часть дня - утро. Поделитесь тем, чем вы его начинаете: бодрящий кофе или сладкий чай?",
                photo: 'https://avatars.mds.yandex.net/i?id=d740c540e95bf3f94b775d202cb75d19_l-8287363-images-thumbs&n=13',
                variants: [
                    {name: 'Чай', count: 22, selected: true},
                    {name: 'Чай', count: 32, selected: false},
                ]  
            },{
                id: '1234',
                owner: '2223',
                name: 'Привлечение к ответственности Адама Кадырова. Зверь должен находиться в клетке. Привлечение к ответственности Адама Кадырова. Привлечение к ответственности Адама Кадырова. Зверь должен находиться в клетке. Привлечение к ответственности Адама Кадырова.',
                description: "Адам Кадыров, избивший журналиста Никиту Журавеля, должен сидеть в тюрьме. Адам Кадыров, избивший журналиста Никиту Журавеля, должен сидеть в тюрьме",
                photo: 'https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_66cbbad76e0d2e2fbef8bdbb_66cbbada6e0d2e2fbef8c149/scale_1200',
                variants: [
                    {name: 'За', count: 22, selected: true},
                    {name: 'Против', count: 32, selected: false},
                ]  
            }]  
        }
        /*
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method: 'GET'
        }).then(this.handleResponse);
        */
    }

    post(uri: string, data: object, method: ApiPostMethods = 'POST') {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method,
            body: JSON.stringify(data)
        }).then(this.handleResponse);
    }
}
