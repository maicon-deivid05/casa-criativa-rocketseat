function onOff(){
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")

    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll")
}

function onDelete(event) {
    const id = event.getAttribute('data-id');
    const form = document.createElement('form');
    form.id = 'fom_delete';
    form.action = `/${id}?_method=DELETE`;
    form.method = 'post';
  
    document.body.append(form);
  
    form.submit();
  
    event.remove();
  }

function checkFields(event){
    const valuesToCheck = [
        "title",
        "image",
        "category",
        "description",
        "link"
    ]

    const isEmpty = valuesToCheck.find(function(value){
       
        const checkIfsString = typeof event.target[value].value==="string"
        const checkIfsEmpty = !event.target["title"].value.trim()
        if (checkIfsString && checkIfsEmpty){
            return true
        }
    })
    
    if(isEmpty){
        event.preventDefault()
        alert("por favor, preencha todos os campos")
    }
}


