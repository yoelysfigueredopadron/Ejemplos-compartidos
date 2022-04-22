let file = "../files/fetch_info.txt"

// 1st way
// fetch(file)
//     .then(x => x.text())
//     .then(y => document.getElementById("show").innerHTML = y);

// llamada a la función getText()
getText(file);

// 2nd way
// async function getText(file) {
//     let x = await fetch(file);
//     let y = await x.text();
//     document.getElementById("show").innerHTML = y;
// }

// 3th way
// Usemos nombres faciles de entender en lugar de x o y
async function getText(file) {
    let myObject = await fetch(file);
    let myText = await myObject.text();
    document.getElementById("show").innerHTML = myText;
}