var form = document.getElementById("artistForm");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

var formG = document.getElementById("GaleriaForm");
function handleForm(event) { event.preventDefault(); } 
formG.addEventListener('submit', handleForm);

var listArstist = new Array();
var listGaleria = new Array();

window.onload = load;

class Artist 
{
    constructor(name, img, spotifyList, description)
    {
        this.name = name;
        this.img = img;
        this.spotifyList = spotifyList;
        this.description = description;
    }
}

class Galeria 
{
    constructor(name, img, description)
    {
        this.name = name;
        this.img = img;
        this.description = description;
    }
}

function load(){
    if (JSON.parse(localStorage.getItem("Artist")) != null){
        listArstist = JSON.parse(localStorage.getItem("Artist"));
    }
    
    if (JSON.parse(localStorage.getItem("Galeria")) != null){
        listGaleria = JSON.parse(localStorage.getItem("Galeria"));
    }

    display();     
}

function display(){
    if (listArstist != null) {
        for (let index = 0; index < listArstist.length; index++) {
            let element = listArstist[index];
            addElement(element);
        }
    }
    
    if (listGaleria != null) {
        for (let index = 0; index < listGaleria.length; index++) {
            let element = listGaleria[index];
            addGaleria(element);
        }
    }
    
}

function modifyA(){
    let nameArtist = document.querySelector('#mName').value
    for (let index = 0; index < listArstist.length; index++) {
        let element = listArstist[index];
        if (nameArtist == element.name) {
            localStorage.setItem("Modify",index);
            openForm();
            break;
        }        
    }
}

function modifyG(){
    let nameGaleria = document.querySelector('#gName').value
    for (let index = 0; index < listArstist.length; index++) {
        let element = listGaleria[index];
        if (nameGaleria == element.name) {
            localStorage.setItem("Modify",index);
            openFormG();
            break;
        }        
    }
}

function deletA(){
    let nameArtist = document.querySelector('#mName').value
    for (let index = 0; index < listArstist.length; index++) {
        let element = listArstist[index];
        if (nameArtist == element.name) {
            listArstist.splice(index,1);
            localStorage.setItem("Artist", JSON.stringify(listArstist));
            location.reload();
            break;
        }        
    }
}

function deletG(){
    let nameGaleria = document.querySelector('#gName').value
    for (let index = 0; index < listArstist.length; index++) {
        let element = listGaleria[index];
        if (nameGaleria == element.name) {
            listGaleria.splice(index,1);
            localStorage.setItem("Galeria", JSON.stringify(listGaleria));
            location.reload();         
            break;
        }        
    }    
}

function addElement (artist) {
    // crea un nuevo div
    // y añade contenido
    let img = new Image();
    let newDiv = document.createElement("div");
    let newButton = document.createElement("button");


    newButton.textContent =  artist.name;
    newButton.className = "artistButton";
    newButton.setAttribute("id","buttonArtist"+listArstist.length);
    newDiv.className = "artistDiv";
    img.src = '/Admin/src/img/'+artist.img;

    newDiv.appendChild(img); //añade imagen al div creado.
    newDiv.appendChild(newButton);

  
    // añade el elemento creado y su contenido al DOM
    let parentDiv = document.getElementById("childElement").parentNode;

    let dv2 = document.getElementById("childElement");
    parentDiv.insertBefore(newDiv, dv2);
}

function addGaleria (galeria) {
    // crea un nuevo div
    // y añade contenido
    let img = new Image();
    let newDiv = document.createElement("div");
    let newButton = document.createElement("button");

    newButton.textContent = galeria.name;
    newButton.className = "artistButton";
    newButton.setAttribute("id","buttonGaleria"+listGaleria.length);
    newDiv.className = "artistDiv";
    img.src = '/Admin/src/img/'+galeria.img;

    newDiv.appendChild(img); //añade texto al div creado.
    newDiv.appendChild(newButton);

  
    // añade el elemento creado y su contenido al DOM
    let parentDiv = document.getElementById("childGaleria").parentNode;

    let dv2 = document.getElementById("childGaleria");
    parentDiv.insertBefore(newDiv, dv2);
}

function openFormG() {
    document.getElementById("myFormGaleria").style.display = "block";
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}
  
function closeForm() {
    let index = null;

    if (localStorage.getItem("Modify") != null) {
        index = localStorage.getItem("Modify");        
    }

    let description = document.querySelector('#description').value;
    let artistName = document.querySelector('#name').value;
    let artistUrl = document.querySelector('#url').value;
    //Image Read Start
    let artistImg = document.querySelector('#file').files[0].name;
    //Image Read Finish
    let artist = new Artist(artistName,artistImg,artistUrl,description);

    if (index != null) {
        listArstist[index] = artist;
        localStorage.removeItem("Modify");
    } else {
        listArstist.push(artist);
    }

    
    localStorage.setItem("Artist", JSON.stringify(listArstist));
    location.reload()
    document.getElementById("myForm").style.display = "none";
}

function closeFormG() {
    let index = null;
    
    if (localStorage.getItem("Modify") != null) {
        index = localStorage.getItem("Modify");        
    }

    let description = document.querySelector('#Gdescription').value;
    let galeriaName = document.querySelector('#Gname').value;
    //Image Read Start
    let galeriaImg = document.querySelector('#Gfile').files[0].name;
    //Image Read Finish
    let galeria = new Galeria(galeriaName,galeriaImg,description);

    if (index != null) {
        listGaleria[index] = galeria;
        localStorage.removeItem("Modify");
    } else {
        listGaleria.push(galeria);
    }

    localStorage.setItem("Galeria", JSON.stringify(listGaleria));
    location.reload()
    document.getElementById("myFormGaleria").style.display = "none";
}