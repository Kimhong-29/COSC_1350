const form = document.getElementById("tip-form");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let billAmount = document.getElementById("billAmount").value;

    let serviceQuality =
        document.getElementById("serviceQuality").value;

    console.log("Bill Amount:", billAmount);

    console.log("Service Quality:", serviceQuality);

});