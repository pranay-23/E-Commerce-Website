// image-slider for sproducs--------------------------------

const main=$("#main-img");

$(".small-img-grp").on("click",".small-img",function(){
    changeImg(this);
});

const changeImg=(e)=>{
    let img=e.getAttribute("src");
    main.attr("src",img);
}


// cart-functions--------------------------------

const data=[];
let data2=[];


$(".fa-cart-shopping").click(function(){
    saveItem(this);
});


let saveItem=(e)=>{
    let item=e.parentElement.firstElementChild.getAttribute("src");
    if(!data.includes(item) && item!==null){
        data.push(item);
    }
    if(data.length===0){
        localStorage.removeItem("item");
    }else{
        localStorage.setItem("item",JSON.stringify(data));
    }
}



const addToCart=(text,val=1)=>{
    if(text!==""){
        const cart=$("#cart table tbody");
    const cartItem=document.createElement("tr");
    cartItem.innerHTML=`<td><i id="rem" class="fa-regular fa-circle-xmark"></i></td>
    <td><img src="${text}" alt=""></td>
    <td>Cartoon Astronaut T-Shirts</td>
    <td>$<span class="price">118</span></td>
    <td><input type="number" value="${val}"></td>
    <td>$<span class="tot">118</span></td>`;
    cart.append(cartItem);
    }
}

(
    function(){
        const litem=JSON.parse(localStorage.getItem("item"));
        const lquant=JSON.parse(localStorage.getItem("items"));
        if(litem!==null){
            litem.forEach(
                (lsitem,i)=>{
                    addToCart(lsitem,lquant[i+1]);
                    data.push(lsitem);
                }
            )
        }
    }
)()

$("#cart").on("click","#rem",function(){
    $(this).parent().parent().remove();
    let tarImgPar=this.parentElement.parentElement;
    let tarImg=tarImgPar.querySelector("td img");
    const index=data.indexOf(tarImg.getAttribute("src"));
    data.splice(index,1);
    data2.splice(index+1,1);
    if(data.length===0){
        localStorage.removeItem("item");
    }else{
        localStorage.setItem("item",JSON.stringify(data));
    }
    if(data2.length===0){
        localStorage.removeItem("items");
    }else{
        localStorage.setItem("items",JSON.stringify(data2));
    }
});

// sproduct-page save--------------------------------

$(".single-pro-details").on("click","button",function(){
    let desItem=this.parentElement.parentElement;
    let desImg=desItem.querySelector("#main-img").getAttribute("src");

    if(!data.includes(desImg) && desImg!==null){
        data.push(desImg);
    }
    addToCart(desImg);
})



// total-cal--------------------------------

$("#cart tbody input").on("change",function(){
    data2=[];
    getTot(this);
    changeSub();
    changeQuant();
})


const getTot=(e)=>{
    const itemVal=e.value;
    const priceDiv=e.parentElement.parentElement;
    const price=priceDiv.querySelector(".price").textContent;
    const totVal=itemVal*price;
    const totDiv=priceDiv.querySelector(".tot");
    totDiv.textContent=totVal;
}

const changeSub=()=>{
    let rows=$("#cart tbody tr");
    let subtot=0;
    for(let i=0;i<rows.length;i++){
        subtot+=Number(rows[i].querySelector(".tot").textContent);
    }
    $("#subtotal .subtot").text(subtot);
}

const changeQuant=()=>{
    let lenInp=$("#cart tbody input").length;
    let rows=$("#cart tbody tr");
    for(let i=0;i<lenInp;i++){
        data2.push(rows[i].querySelector("input").value);
    }
    console.log(data2);
    if(data2.length===0){
        localStorage.removeItem("items");
    }else{
        localStorage.setItem("items",JSON.stringify(data2));
    }
}

const tinput=document.querySelectorAll("#cart tbody input");
for(let j=0;j<tinput.length;j++){
    getTot(tinput[j]);
}
changeSub();
