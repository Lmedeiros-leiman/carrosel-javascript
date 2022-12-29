




//
// Lista :
// 0 - <i>
//1 - <div id=carrosel>
//2 - <div id="bolas">
//3 - <i>
//
const embrulhocarrosel = document.querySelector("#embrulhocarrosel");
const carrosel = embrulhocarrosel.children[1];
const flechas = [embrulhocarrosel.children[0],embrulhocarrosel.children[3]];
const elementoscarrosel = carrosel.children;
const primeiroelemento = elementoscarrosel[0];
const tamanhoprimeiroelemento = primeiroelemento.clientWidth + 14;
const ultimoelemento = elementoscarrosel[elementoscarrosel.length - 1];
const bolas = embrulhocarrosel.children[2];


let iniciado = false, pagexantigo, estapuxando = false, scrollleftantigo, diferencaposicao;


const mostraresconderflechas = () =>{
    let tamanhobarra = carrosel.scrollWidth - carrosel.clientWidth;
    flechas[0].style.display = carrosel.scrollLeft == 0 ? "none" : "block";
    flechas[1].style.display = carrosel.scrollLeft == tamanhobarra ? "none" : "block";
}

flechas.forEach( icone => {
   icone.addEventListener("click", () => {
       if (icone.classList.contains("esquerda")) { carrosel.scrollLeft += -tamanhoprimeiroelemento;}else{carrosel.scrollLeft += tamanhoprimeiroelemento;}
        setTimeout(() => mostraresconderflechas(), 60);
   });
});

const autoescorrega = () => {
    console.log(carrosel.scrollHeight);
    console.log(carrosel.scrollWidth);

    // A ideia:
    //  dividir o scroll width em parcelas, cada uma sendo igual a :
    //  (larguraelemento + margem) * Multiplicador = elemento centralizado
    //
    //
    //
    return;
    if (carrosel.scrollLeft == (carrosel.scrollWidth - carrosel.clientWidth)) return ;
    diferencaposicao = Math.abs(diferencaposicao);

    let diferencavalores = tamanhoprimeiroelemento- diferencaposicao;

    if (carrosel.scrollLeft > scrollleftantigo) {
        return carrosel.scrollLeft -= diferencaposicao > tamanhoprimeiroelemento / 3 ? diferencavalores : -diferencaposicao;
    }
    carrosel.scrollLeft += diferencaposicao > tamanhoprimeiroelemento / 3 ? diferencavalores : -diferencaposicao;
};

const inicioescorrega = (e) => {
    iniciado = true;
    pagexantigo = e.pageX || e.touches[0].pageX;
    scrollleftantigo = carrosel.scrollLeft;
}
const escorrega = (e) => {
    if (!iniciado) return;
    e.preventDefault();
    diferencaposicao = (e.pageX || e.touches[0].pageX) - pagexantigo;
    carrosel.style.cursor = "grabbing";
    carrosel.scrollLeft = scrollleftantigo - diferencaposicao;
    estapuxando = true;
    setTimeout(() => mostraresconderflechas(), 60);
}
const fimescorrega = (e) => {
    iniciado = false;
    carrosel.style.cursor = "grab";

    if(!estapuxando) return;
    estapuxando = false;

    autoescorrega();
}

carrosel.addEventListener("mousedown",inicioescorrega);
carrosel.addEventListener("touchstart",inicioescorrega);

carrosel.addEventListener("mousemove",escorrega);
carrosel.addEventListener("touchmove",escorrega);

carrosel.addEventListener("mouseup",fimescorrega);
carrosel.addEventListener("touchend",fimescorrega);
carrosel.addEventListener("mouseleave",fimescorrega)