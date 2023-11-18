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



const addToCart=(text)=>{
    if(text!==""){
        const cart=$("#cart table tbody");
    const cartItem=document.createElement("tr");
    cartItem.innerHTML=`<td><i id="rem" class="fa-regular fa-circle-xmark"></i></td>
    <td><img src="${text}" alt=""></td>
    <td>Cartoon Astronaut T-Shirts</td>
    <td>$<span class="price">118</span></td>
    <td><input type="number" value="1"></td>
    <td>$<span class="tot">118</span></td>`;
    cart.append(cartItem);
    }
}

(
    function(){
        const lnotes=JSON.parse(localStorage.getItem("item"));

        if(lnotes!==null){
            lnotes.forEach(
                (lsnote)=>{
                    addToCart(lsnote);
                    data.push(lsnote);
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
    if(data.length===0){
        localStorage.removeItem("item");
    }else{
        localStorage.setItem("item",JSON.stringify(data));
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
    getTot(this);
    changeSub();
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


changeSub();