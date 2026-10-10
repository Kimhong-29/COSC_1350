window.addEventListener("load", function() {

    // Find the calculate button
    let button = document.getElementById("calculateBtn");

    // Run calculateTip when the button is clicked
    button.addEventListener("click", calculateTip);

});

function calculateTip() {

    let billAmount = document.getElementById("billAmount").value;

    let serviceQuality = document.getElementById("serviceQuality").value;

    let output = document.getElementById("tipOutput");

    if (billAmount.trim() === "") {
        output.textContent = "Please enter a bill amount.";
        return;
    }

    billAmount = Number(billAmount);
    serviceQuality = Number(serviceQuality);

    if (!Number.isFinite(billAmount) || billAmount < 0) {
        output.textContent = "Please enter a valid bill amount.";
        return;
    }

    let tip = billAmount * serviceQuality;

    output.textContent = "Your tip is: $" + tip.toFixed(2);

}
