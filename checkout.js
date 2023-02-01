const url=new URLSearchParams(window.location.search);
const clickedMovie=url.get('movie-name');
const movieName=document.querySelector('.movie-name');
movieName.textContent=clickedMovie;
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

    if(debit.checked){
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

    if(upi.checked){
        paymentDetail.innerHTML=`<label for="upi-id">UPI ID</label><br>
        <input type="text" id="upi-id" placeholder="xyz@abcbank"><br>
        <button>Verify UPI ID</button>`
    }


}