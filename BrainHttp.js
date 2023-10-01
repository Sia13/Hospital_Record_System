export class BrainHttp {
    constructor() {
        this.http = new XMLHttpRequest();
    }

    //get request
    get = (url, callback) => {
        this.http.open('GET', url, true);
        this.http.send();
        this.http.onload = () => {
            if(this.http.status === 200) {
                let data = this.http.responseText;
                let objects = JSON.parse(data);
                callback(null, objects);
            }
            else {
                callback(`Error : ${this.http.status}`);
            }
        }
    }

    //post  request
    post = (url, object, callback) => {
        this.http.open('POST', url, true);
        this.http.setRequestHeader('Content-Type', 'application/json')
        this.http.send(JSON.stringify(object));
        this.http.onload = () => {
            let data = this.http.responseText;
            let objects = JSON.parse(data);
            callback(objects);
        }
    }

    //put request
    put = (url, object, callback) => {
        this.http.open('PUT', url, true);
        this.http.setRequestHeader('Content-Type', 'application/json')
        this.http.send(JSON.stringify(object));
        this.http.onload = () => {
            let data = this.http.responseText;
            let objects = JSON.parse(data);
            callback(objects);
        }
    }

    //delete request
    delete = (url, callback) => {
        this.http.open('DELETE', url, true);
        this.http.send();
        this.http.onload = () => {
            console.log("Deleted successfully");
            // Call the callback function if provided
            if (typeof callback === 'function') {
                callback();
            }
        }
    }    
}