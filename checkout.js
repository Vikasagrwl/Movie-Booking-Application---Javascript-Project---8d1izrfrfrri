const url=new URLSearchParams(window.location.search);
const movieID=url.get('movie-id');
const API_URL="https://api.themoviedb.org/3/movie/"+movieID+"?api_key=ba215763d6fdc77f212907452ba34e9f";
const movieName=document.querySelector('.movie-name');
fetch(API_URL).then(res => res.json()).then(data =>{
    if(Object.keys(data).length==3){
        console.log("error");
        document.write("404 error!! No movies found for the given URL Plaese try again..");
    }
    else{
        movieName.textContent=data.original_title;
    }
    
})

const numberOfTickets=document.getElementById('number-of-ticket');
const tax=document.querySelector('#fee');
const total=document.querySelector('#subtotal')

function getAmount(){
    tax.textContent=(Number(numberOfTickets.value)*250*1.75)/100;
    total.textContent=Number(tax.textContent)+Number(numberOfTickets.value)*250;
}

const credit=document.getElementById('credit-card');
const debit=document.getElementById('debit-card');
const upi=document.getElementById('upi');

const paymentDetail=document.querySelector('.paymentDetail');
function displayPaymentMethod(){
    if(credit.checked){
        paymentDetail.innerHTML=`<label for="nameOnCard">Name on card</label><br>
        <input type="text" id="nameOnCard"><br>
        <label for="creditCardNumber">Credit Card Number</label><br>
        <input type="number" id="creditCardNumber"><br>
        <div>
            <label for="expiry">Expiry</label><br>
            <input type="date" id="expiry"><br>
            <label for="cvv">CVV</label><br>
            <input type="password" id="cvv">
        </div>`
    }

    else if(debit.checked){
        paymentDetail.innerHTML=`
        <label for="nameOnCard">Name on card</label><br>
        <input type="text" id="nameOnCard"><br>
        <label for="debitCardNumber">Debit Card Number</label><br>
        <input type="number" id="debitCardNumber"><br>
        <div>
            <label for="expiry">Expiry</label><br>
            <input type="date" id="expiry"><br>
            <label for="cvv">CVV</label><br>
            <input type="password" id="cvv">
        </div>`
    }

    else if(upi.checked){
        paymentDetail.innerHTML=`<label for="upi-id">UPI ID</label><br>
        <input type="text" id="upi-id" placeholder="xyz@abcbank"><br>
        <button>Verify UPI ID</button>`
    }


}