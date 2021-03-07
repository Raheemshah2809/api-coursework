window.addEventListener('load', init);
const apiUrl = "https://www.vam.ac.uk/api/json/museumobject/search?";
function init(){
    const submitForm = document.querySelector('#submitForm');
    submitForm.addEventListener('click', fetchAction);
}
function fetchAction(evt){
    evt.preventDefault();
    document.querySelector('#loading').style.display = "block";
    const generalSearch = document.querySelector('#generalSearch');
    if(generalSearch.value.length>0){
        let value2Url = "q=" + decodeURIComponent(generalSearch.value) +"&images=1";
        let url = apiUrl + value2Url;
        fetch(url)
        .then(data => data.json())
        .then(function(data) {
            let targetDiv = document.querySelector('#success');
            while(targetDiv.firstChild){
                  targetDiv.removeChild(targetDiv.firstChild);
                  }
            for (let i = 0; i<data.records.length; i++){
                let section = document.createElement("section");
                section.setAttribute("class", "records");
                section.setAttribute("id", "record" + i);
                targetDiv.appendChild(section);
                let sectionID = section.getAttribute("id");
                appendImg("#"+sectionID, data.records[i].fields.primary_image_id);
                appendFeature("#"+sectionID ,"Object", data.records[i].fields.object);
                appendFeature("#"+sectionID ,"Title", data.records[i].fields.title);
                appendFeature("#"+sectionID ,"Place of origin", data.records[i].fields.place);
                appendFeature("#"+sectionID ,"Date", data.records[i].fields.date_text);
                appendFeature("#"+sectionID ,"Artist/Maker", data.records[i].fields.artist);
                appendFeature("#"+sectionID ,"Museum number", data.records[i].fields.museum_number);
                appendFeature("#"+sectionID ,"Gallery location", data.records[i].fields.location);
                displaySuccess();
            }
            let p = document.createElement("p");
            p.setAttribute("id", "footer");
            let a = document.createElement("a");
            a.setAttribute("href", "#top");
            a.textContent = "GO TO TOP";
            p.appendChild(a);
            targetDiv.appendChild(p);
        })
        .catch(displayFail());
       } else {
            generalSearch.setAttribute("placeholder", "You must enter text here");
        }
}

function appendFeature(recordId, fieldName, fieldValue){ 
    let targetAppend = document.querySelector(recordId);
    let nameValuePair = document.createElement("p");
    nameValuePair.setAttribute("class", "features ");
    nameValuePair.textContent = fieldName + ": "+ fieldValue;
    targetAppend.appendChild(nameValuePair);
}

function appendImg(recordId, imgId){
    let imgCollecUrl = "https://media.vam.ac.uk/media/thira/collection_images/";
    let targetAppend = document.querySelector(recordId);
    let imgElem = document.createElement("img");
    //The second part of the URL is constructed from the first 6 characters of the image id.
    //The final part of the URL is the image id with a jpg extension - at its most simple...
    let href = imgCollecUrl + "/" + imgId.substr(0,6) +"/"+ imgId + "_jpg_l.jpg";
    imgElem.setAttribute("id", "image");
    imgElem.setAttribute("src", href);
    targetAppend.appendChild(imgElem);
}

function displaySuccess(){
    document.querySelector('#loading').style.display = "none";
    document.querySelector('#fail').style.display = "none";
    document.querySelector('#formPage').style.display = "block";
    document.querySelector('#formPage').style.paddingTop = "2vh";
    document.querySelector('#success').style.display = "block";
}

function displayFail(){
    document.querySelector('#loading').style.display = "none";
        document.querySelector('#success').style.display = "none";
    document.querySelector('#formPage').style.display = "block";
    document.querySelector('#formPage').style.paddingTop = "2vh";
    document.querySelector('#fail').style.display = "block";
}

