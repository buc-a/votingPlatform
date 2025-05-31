
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';


export type TRegisterData = {
  name: string;
  password: string;
};

const baseUrl = 'http://158.160.90.212:8000';

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

export type Poll = {
  id: number;
  name: string;
  description: string | null;
  owner_username: string;
  options: string[];
};

export const getAllVotingsApi = () => {
  return fetch(`${baseUrl}/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkResponse<any[]>);
};

export const getVotingsByOwnerApi = (ownerId: string) => {
  return fetch(`${baseUrl}/votings?owner=${ownerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkResponse<any[]>);
};

export const getParticipatedVotingsApi = (userId: string) => {
  return fetch(`${baseUrl}/part?user=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkResponse<any[]>);
};

export const createVotingApi = (data: object) => {
  return fetch(`${baseUrl}/votings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkResponse<any>);
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
                    {name: 'Кофе', count: 22, selected: true},
                    {name: 'Чай', count: 32, selected: false}
                ]  
            },{
                id: '1235',
                owner: '2223',
                name: 'Ваш любимый язык программирования',
                description: "Поделитесь своими предпочтениями",
                photo: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/20706947/original/6ed03a6143dc49fac0db697e5f026c3f0844b24a/do-all-programming-assignments-for-you.png',
                variants: [
                    {name: 'Java', count: 22, selected: false},
                    {name: 'C++', count: 40, selected: false},
                    {name: 'Python', count: 10, selected: false}                ]  
            },{
                id: '1236',
                owner: '2224',
                name: 'Вырубка леса на Воробьевых горах',
                description: "Отстоим лес у предпринимателей!",
                photo: 'https://willtowers.ru/upload/iblock/569/k7kbn6ba5fwgaozqfm0l40ps9o9za8j9.jpg',
                variants: [
                    {name: 'За', count: 10, selected: false},
                    {name: 'Против', count: 50, selected: false}                ]  
            },
        ]            
        }

        else if (uri === "/votings?owner=1234"){
            return [{
                id: '1234',
                owner: '2222',
                name: 'Кофе или чай?',
                description: "Ученые выяснили, что самая важная часть дня - утро. Поделитесь тем, чем вы его начинаете: бодрящий кофе или сладкий чай?",
                photo: 'https://avatars.mds.yandex.net/i?id=d740c540e95bf3f94b775d202cb75d19_l-8287363-images-thumbs&n=13',
                variants: [
                    {name: 'Кофе', count: 22, selected: true},
                    {name: 'Чай', count: 32, selected: false}
                ]  
            },{
                id: '1235',
                owner: '2223',
                name: 'Ваш любимый язык программирования',
                description: "Поделитесь своими предпочтениями",
                photo: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/20706947/original/6ed03a6143dc49fac0db697e5f026c3f0844b24a/do-all-programming-assignments-for-you.png',
                variants: [
                    {name: 'Java', count: 22, selected: false},
                    {name: 'C++', count: 40, selected: false},
                    {name: 'Python', count: 10, selected: false}                ]  
            }]  
        }
        else if (uri === "/part?user=2222"){
            return [{
                id: '1236',
                owner: '2224',
                name: 'Вырубка леса на Воробьевых горах',
                description: "Отстоим лес у предпринимателей!",
                photo: 'https://willtowers.ru/upload/iblock/569/k7kbn6ba5fwgaozqfm0l40ps9o9za8j9.jpg',
                variants: [
                    {name: 'За', count: 10, selected: false},
                    {name: 'Против', count: 50, selected: false}                ]  
            }]  
        }
        
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method: 'GET'
        }).then(this.handleResponse);
        
    }
    /*
    post(uri: string, data: object, method: ApiPostMethods = 'POST') {
        return fetch(this.baseUrl + uri, {
            ...this.options,
            method,
            body: JSON.stringify(data)
        }).then(this.handleResponse);
    }
        */
}
