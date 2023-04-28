let indexmultiplicador = [];
let colocar_bolas = false;
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

const embrulhoscarroseis = document.querySelectorAll(".carrosel");
embrulhoscarroseis.forEach((embrulho,index) => {
    let itensporpartes = 1
    if (embrulho.querySelector("input")) {
        let b = embrulho.querySelectorAll("input");
        b.forEach((item) => {
            if (item.classList.contains("quantidade")) {
                itensporpartes = item.defaultValue;
                item.remove();
            }
        });
    }


    indexmultiplicador.push(0);
    embrulho.classList.remove("carrosel");
    embrulho.classList.add("embrulhocarrosel")

    //seta as propriedades do embrulho
    embrulho.style.width = "100%";
    embrulho.style.marginTop = "18px";
    embrulho.style.marginBottom = "26px";
    embrulho.style.position = "relative";
    embrulho.style.backgroundColor = "transparent";
    //


    let carrosel = document.createElement("div");
    carrosel.classList.add("carrosel");

    // seta as propriedas do carrosel
    carrosel.style.display = "flex";
    carrosel.style.flexWrap = "nowrap";
    carrosel.style.flexDirection = "row";
    carrosel.style.overflow = "hidden";
    carrosel.style.cursor = "grab";
    carrosel.style.scrollBehavior = "smooth";
    carrosel.style.scrollSnapAlign = "center";
    //



    let listabolas = document.createElement("div");
    listabolas.classList.add("bolas");
    listabolas.style.position = "absolute";
    listabolas.style.display = "flex";
    listabolas.style.left = "50%";
    listabolas.style.bottom = "-10%";
    listabolas.style.transform = "translateX(-50%)";


    while (embrulho.childNodes.length > 0) {
        carrosel.appendChild(embrulho.childNodes[0]);
    }

    for ( let i = 0 ; i < carrosel.children.length; i++){
        if (colocar_bolas == true) {
            listabolas.append(document.createElement("div"));
        }
        if ( carrosel.children[i].tagName == ("IMG" || "PICTURE")) {
            carrosel.children[i].setAttribute("draggable", false);
        }
        carrosel.children[i].style.backgroundColor = random_rgba();

    }

    let setas = [document.createElement("i"),document.createElement("i")];
    setas.forEach( (seta, index) => {

        //seta as propriedades das setas
        seta.style.height = "46px";
        seta.style.width = "46px";
        seta.style.cursor = "pointer";
        seta.style.textAlign = "center";
        seta.style.fontSize = "1.2rem";
        seta.style.lineHeight = "46px";
        seta.style.backgroundColor = "whitesmoke";
        seta.style.borderRadius = "50%";
        seta.style.transform = "translateY(-50%)";
        seta.style.position = "absolute";
        seta.style.backgroundColor = "red";
        //

        if (index == 0) {
            //seta esquerda
            seta.style.top = "50%";
            seta.style.left = "-23px";
            seta.classList.add("esquerda");
            seta.style.display = "none";
            carrosel.insertBefore(seta, carrosel.children[0]);
        } else {
            //seta direita
            seta.style.top = "50%";
            seta.style.right = "-23px";
            seta.classList.add("direita");
            carrosel.append(seta)
        }



        seta.addEventListener("click", () => {
            let tamanhoprimeiroelemento = (carrosel.children[1].clientWidth) + 14;
            if (seta.classList.contains("esquerda")) {
                carrosel.scrollLeft -= tamanhoprimeiroelemento ;
            }else{
                carrosel.scrollLeft += tamanhoprimeiroelemento ;
            }
            setTimeout(() => mostraresconderflechas(carrosel), 60);

        });

    });

    //
    let filhos = [...carrosel.children];
    for (let i = 0; i < filhos.length; i++ ) {
        let filho = filhos[i];
        if (i == 0) {

            continue;
        }
        if (i == [...carrosel.children].length - 1) {

            continue;
        }


        filho.style.flexShrink = "0";
        filho.style.display = "inline-flex";
        filho.style.height = "340px";
        filho.style.objectFit = "cover";
        filho.style.marginLeft = "14px";
        filho.style.userSelect = "none";
        filho.style.backgroundColor = "rgb("+ random_rgba() +")";

        let comando = "calc(100% / "+ itensporpartes +")";
        

        filho.style.width = comando;
    }


    carrosel.children[1].style.marginLeft = "0";


    embrulho.append(listabolas);
    embrulho.append(carrosel)

    //seção addEventListener

    carrosel.addEventListener("mousedown",(evt) =>{ inicioescorrega(evt,carrosel,index)});
    carrosel.addEventListener("touchstart",(evt) =>{ inicioescorrega(evt,carrosel,index)});

    carrosel.addEventListener("mousemove",(evt) =>{escorrega(evt,carrosel,index)});
    carrosel.addEventListener("touchmove",(evt) =>{escorrega(evt,carrosel,index)});

    carrosel.addEventListener("mouseup",(evt) =>{fimescorrega(evt,carrosel,index)});
    carrosel.addEventListener("touchend",(evt) =>{fimescorrega(evt,carrosel,index)});
    carrosel.addEventListener("mouseleave",(evt) =>{fimescorrega(evt,carrosel,index)});

});




const inicioescorrega = (e,carrosel,index) => {
    carrosel.classList.add("iniciado");
    pagexantigo = e.pageX || e.touches[0].pageX;
    posicaoantiga = carrosel.scrollLeft;

}
const escorrega = (e,carrosel,index) => {
    if (!carrosel.classList.contains("iniciado")) return;
    e.preventDefault();
    diferencaposicao = (e.pageX || e.touches[0].pageX) - pagexantigo;
    carrosel.style.cursor = "grabbing";
    carrosel.scrollLeft = posicaoantiga - diferencaposicao;
    carrosel.classList.add("estapuxando");
    setTimeout(() => mostraresconderflechas(carrosel), 60); // a ser implementado

}
const fimescorrega = (e,carrosel,index) => {
    carrosel.classList.remove("iniciado");
    carrosel.style.cursor = "grab";

    if(!carrosel.classList.contains("estapuxando")) return;
    carrosel.classList.remove("estapuxando");

    autoescorrega(carrosel,index);
}
const mostraresconderflechas = (carrosel) =>{
    let tamanhobarra = carrosel.scrollWidth - carrosel.clientWidth;
    carrosel.children[0].style.display = carrosel.scrollLeft == 0 ? "none" : "block";
    carrosel.children[carrosel.children.length - 1].style.display = carrosel.scrollLeft == tamanhobarra ? "none" : "block";
}
const autoescorrega = (carrosel,index) => {
    let posicaoatual = carrosel.scrollLeft;

    if (posicaoatual > posicaoantiga) {

        if (indexmultiplicador[index] == carrosel.children.length - 1) {
            indexmultiplicador[index] = carrosel.children.length - 1;
        } else {indexmultiplicador[index]++;}

    } else {indexmultiplicador[index] = indexmultiplicador[index] - 1;}
    //testes de limite
    if (indexmultiplicador[index] < 0) {
        indexmultiplicador[index] = 0;
    }
    if (indexmultiplicador[index] >= carrosel.children.length) {
        indexmultiplicador[index] = carrosel.children.length;
    }

    //escorregasozinho para localização

    carrosel.scrollLeft = (carrosel.children[1].clientWidth + 14) * (indexmultiplicador[index]);

}
