import { inject } from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class DataServices {

	constructor(http) {
        this.httpClient = http;
        
        this.BASE_URL = "http://localhost:5000/api/";
        
        this.httpClient.configure(config => {
            config
                .withBaseUrl(this.BASE_URL)
                .withDefaults({
                credentials: 'same-origin',
                headers: { 
                    'Accept': 'application/json',
                    'X-Requested-With': 'Fetch' //using the aurelia fetch protocol
                }
                })
                .withInterceptor({
				request(request) { //debug things, whether requests are being sent or not
					

					
                    console.log(`Requesting ${request.method} ${request.url}`);
                    return request;
                },
                response(response) {
                    console.log(`Received ${response.status} ${response.url}`);
                    return response;
                }
                });
            });
    

	}

    // Get
    get(url) {
		return this.httpClient.fetch(url)
			.then(response => response.json())
			.then(data => {
				return data;
			})
			.catch(error => {
				return error;
			});
    }
    
    //Post
    post(content, url) { 
		return this.httpClient
			.fetch(url, {
				method: 'post', // tell server this is a post
				body: json(content) 
			})
			.then(response => response.json()) // wait for response
			.then(object => {
				return object; // send response back up
			})
			.catch(error => {
				return error;
			});
	}

    //Put
    put(content, url) {
		return this.httpClient
			.fetch(url, {
				method: 'put',
				body: json(content)
			})
			.then(response => response.json())
			.then(object => {
				return object;
			})
			.catch(error => {
				return error;
			});
	}


    //Delete
    delete(url) {
		return this.httpClient
			.fetch(url, {
				method: 'delete'
			})
			.then(response => response.json())
			.then(object => {
				return object;
			})
			.catch(error => {
				return error ;
			});
	}


	//File Upload
	uploadFiles(files, url){
	    return this.httpClient
	    .fetch(url, {
	        method: 'post',
	        body: files
	    })
	    .then(response => response.json())
	    .then(object => {
	        return object;
	    })
	    .catch(error => {
	        return error;
	    });
	}
		
}
