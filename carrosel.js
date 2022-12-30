




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
let tamanhoprimeiroelemento = verificartamanho();
function verificartamanho() {return primeiroelemento.clientWidth + 14;}
const ultimoelemento = elementoscarrosel[elementoscarrosel.length - 1];
const bolas = embrulhocarrosel.children[2];
let iniciado = false, pagexantigo, estapuxando = false, posicaoantiga, diferencaposicao;


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
let indexmultiplicador = 0;
const autoescorrega = () => {
    if(indexmultiplicador < 0) {
        indexmultiplicador = 0;
    }
    if (indexmultiplicador >= elementoscarrosel.length) {
        indexmultiplicador = elementoscarrosel.length ;
    }

    let posicaoatual = carrosel.scrollLeft;

        if(posicaoatual > posicaoantiga) {

            if (indexmultiplicador == elementoscarrosel.length -1) {
                indexmultiplicador = elementoscarrosel.length - 1;
            } else{
                indexmultiplicador++;
            }
        } else{
            //console.log("ESQUERDA");
            indexmultiplicador = indexmultiplicador - 1;
        }
    console.log(indexmultiplicador);
    carrosel.scrollLeft = (elementoscarrosel[0].clientWidth + 14) * (indexmultiplicador);



    // A ideia:
    //  dividir o scroll width em parcelas, cada uma sendo igual a :
    //  (larguraelemento + margem) * Multiplicador = elemento centralizado
    //  scrollleft = posicaoatualbarra
    //  calcular a diferença:
    //  multiplicador = (posicaoatual / tamanhoelementos) / 100;
    //
    //  Solução:
    //  utilizando o elemento atual como base, ir para o próximo elemento quando uma porcentagem dele estiver passada, se não, focar nele.
    //  ideia : a porcentagem é fixa 40%, problema : elementos menores serão inconsistentes.
    //  ideia : o tamanho do elemento e quantos elementos por vez são mostrados no carrosel.
};

const inicioescorrega = (e) => {
    iniciado = true;
    pagexantigo = e.pageX || e.touches[0].pageX;
    posicaoantiga = carrosel.scrollLeft;
}
const escorrega = (e) => {
    if (!iniciado) return;
    e.preventDefault();
    diferencaposicao = (e.pageX || e.touches[0].pageX) - pagexantigo;
    carrosel.style.cursor = "grabbing";
    carrosel.scrollLeft = posicaoantiga - diferencaposicao;
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

