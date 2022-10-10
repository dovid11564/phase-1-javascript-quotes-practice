//Dom content loaded, grab quotes, authors from  db. append them to appropriate place on page
const BASE_URL = "http://localhost:3000/quotes?_embed=likes"
document.addEventListener('DOMContentLoaded', () => {
    fetch(BASE_URL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            renderQuotes(data)
            document.addEventListener("submit", (e) => {
                e.preventDefault()
                addQuote(data)
            })


        })
})

//the following code is the function appendData()
//append data creates all of the nessecery dom elements, sets their inner text to the quotes gathered from the API,
//and sticks them to the page. yowzers!

const renderQuotes = function (data) {
    //following line grabs the ul to which our fave quote lis will be appended to. saves the ul as a variable, "ul"

    //following code is a for each statement,
    //for each item in the json object, it does a bunch of stuff, including creating li elements and appending them to the ul variable.
    data.forEach(data => {
        //console log to test that this is working
        console.log(data)
        //now that we are sure that everything is working, lets create our li element.
        //as per our deliverables, each of our li elements needs certain characteristics.
        //I will just copy paste them over from the read me.
        //our li has relevant p tags where we can set our api data to interpolate relevant information into

        //gonna turn this block into a function that can be reused later for when we add new quotes

        //also need to grab out the buttons here for event listeners i think
        renderOneQuote(data)


    });
}

const renderOneQuote = function (data) {
    const ul = document.querySelector("#quote-list")
    const li = document.createElement("li")
    li.innerHTML = `<blockquote class="blockquote">
        <p class="mb-0">${data.quote}</p>
        <footer class="blockquote-footer">${data.author}</footer>
        <br>
        <button class='btn btn-success'>Likes: <span>${data.likes}</span></button>
        <button class='btn btn-danger'>Delete</button>
      </blockquote>`
    li.classList.add("quote-card")
//following code lets us do the delete button things. 
    const deleteButton = li.querySelector(".btn-danger")
    deleteButton.addEventListener('click', () => li.remove())
    //following code is the like button things lmao
    const likeButton = li.querySelector(".btn-success")
    likeButton.addEventListener('click', () => {
        const likeSpan = li.querySelector("span")
        const like = parseInt(likeSpan.textContent)
        likeSpan.textContent = like + 1
    })

    //following line appends the above to our webpage
    ul.appendChild(li)
}
//below is the form that allows us to create new quotes.
//adding an event listener to grab the stuff and append it. similar to task listener

//the following is the function inside of submit listener that adds new quote
//gonna have to grab the input feilds from the form and send them back as a post i think
const addQuote = function (data) {

    let newQuoteForm = document.querySelector("#new-quote-form")
    newQuoteForm.addEventListener("submit", e => {
        e.preventDefault()
        console.log('form submitted')

        const quote = e.target.quote.value
        console.log('quote: ', quote)
        const author = e.target.author.value
        const newQuote = {
            quote: quote,
            author: author,
            likes: 0
        }

    renderOneQuote(newQuote)
    e.target.reset()
    })
}

//post is just a fetch but you have to specify method:POST
//just remembered that lol
