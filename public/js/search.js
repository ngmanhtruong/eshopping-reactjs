constructor(props){
    super(props);
    this.state = {
        query: "",
        data: [],
        value: ''
    }
    this.handleChange = this.handleChange.bind(this);
}
handleChange(ev){
    this.setState({value: ev.target.value});
    console.log(ev.target.value);
}
getRelevancy(value, searchTerm){
    if (value === searchTerm){
        return 2;
    } else if (value.startsWith(searchTerm)){
        return 1;
    } else if (value.includes(searchTerm)){
        return 0;
    }
}
getData = () =>{
    fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(data=>this.setState({data:data}));
}
componentDidMount(){
    this.getData();
}

let data = [];
function initData(dataFromServer){
    data = dataFromServer;
}
fetch('https://fakestoreapi.com/products/categories')
    .then(res=>res.json())
    .then(data=>initData(data));

//PERFORM SEARCH
//TAO LIST TRA VE KET QUA CHO SEARCH 
const searchResult = document.querySelector('#search-result');

//FUNCTION TAO LIST BANG UL LI
function setList(arr){
    //CLEAR LIST FIRST
    clearList();

    for (let product of arr){
        let item = document.createElement('li');
        let a = document.createElement('a');
        item.classList.add('list-group-item');
        let text = document.createTextNode(product.title);
        // let att = document.createAttribute("onClick");
        // att.value = "productClicked("+ product.id +")";
        // let att2 = document.createAttribute('data-bs-toggle');
        // att2.value = "modal";
        // let att3 = document.createAttribute('data-bs-target');
        // att3.value = "#staticBackdrop";
        a.appendChild(text);
        // a.setAttributeNode(att);
        // a.setAttributeNode(att2);
        // a.setAttributeNode(att3);
        item.appendChild(a);
        searchResult.appendChild(item);
    }
    if (arr.length === 0){
        setNoResults();
    }
}

//CLEARLIST WHEN NO RESULT
function clearList(){
    while(searchResult.firstChild){
        searchResult.removeChild(searchResult.firstChild);
    }
}

//TRA VE NO RESULT FOUND KHI KHONG CO KET QUA
function setNoResults(){
    let item = document.createElement('li');
    item.classList.add('list-group-item');
    let text = document.createTextNode("No Results Found!");
    item.appendChild(text);
    searchResult.appendChild(item);
}

//TIM KIEM DUA TREN MUC DO LIEN QUAN
function getRelevancy(value, searchTerm){
    if (value === searchTerm){
        return 2;
    } else if (value.startsWith(searchTerm)){
        return 1;
    } else if (value.includes(searchTerm)){
        return 0;
    }
}

//DOC DU LIEU NGUOI DUNG NHAP VAO
const searchInput = document.querySelector('#search');
searchInput.addEventListener('input', (event)=>{
    let value = event.target.value;
    if (value && value.trim().length > 0){ //trim() dung de bo di khoang trang
        value = value.trim().toLowerCase();
        setList(products.filter(product =>{
            return product.title.toLowerCase().includes(value);
        }).sort((productA, productB)=>{
            return getRelevancy(productB.title, value) - getRelevancy(productA.title, value);
        }));
    } else {
        clearList();
    }
})
