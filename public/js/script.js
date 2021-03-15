const inputForm = document.querySelector('form')
const inputField = document.querySelector('input')

const msg = document.querySelector('#msg')
const errorMsg = document.querySelector('#errorMsg')

document.addEventListener('submit', (e) => {
    e.preventDefault()
    errorMsg.textContent = ''
    msg.textContent = 'Loading ...'
    fetch('/weather?address=' + inputField.value).then((response) => {
    response.json().then((data) => {
            if(data.error) {
                errorMsg.textContent = data.error
                msg.textContent = ''
            } else {
                msg.textContent = data.description
            }
        })
    })
})