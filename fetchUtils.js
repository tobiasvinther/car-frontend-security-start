export function makeOptions(method, body, addToken) {
    const opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if(addToken){
        opts.headers.Authorization = "Bearer " + sessionStorage.getItem("token")
    }
    if (body) { //Observe how we can add new fields to an object when needed
        opts.body = JSON.stringify(body);
    }
    return opts;
}