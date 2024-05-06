
const requestBody = {
    email: "test@mail.com",
    verification_code_length: 10,
    html: "<p>Example text. Here is your verification code: ${verification_code}<p>"
}
console.log(JSON.stringify(requestBody));
fetch("http://urlToApi.com/verify", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
}).then(res => res.json()) // Use res.json() to parse the JSON response
    .then(data => console.log(data))
    .catch(err => console.log(err));
