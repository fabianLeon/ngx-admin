import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const path = 'http://localhost:8080/v1/persona/';


@Injectable()
export class EstudianteService {

    constructor(private http: HttpClient) {
    }

    get() {
        return this.http.get(path);
    }
    post(element) {
        console.log(element)
        return this.http.post(path, element, httpOptions);
    }
    put(element) {
        const body = JSON.stringify(element);
        return this.http.put(path + element.Id, body, httpOptions);
    }
    delete(element) {
        return this.http.delete(path + element.id);
    }
};
