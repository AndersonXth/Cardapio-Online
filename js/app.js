$(document).ready(function() {
    cardapio.eventos.init();
});

var cardapio = {};

cardapio.eventos = {
    init: () => {
        cardapio.metodos.obterItensCardapio();
    }
};

cardapio.metodos = {
    obterItensCardapio: (categoria = 'burgers', vermais = false) => {
        var filtro = MENU[categoria];

        if (!vermais) {
            $('#itensCardapio').html('')
            $('#btnVerMais').removeClass('hiden')
        }
        
        $.each(filtro, (i, e) => {
            let temp = cardapio.templates.item.replace(/\${img}/g,e.img)
            .replace(/\${price}/g,e.price.toFixed(2).replace('.',','))
            .replace(/\${name}/g,e.name)

            if (vermais && i >= 4 && i < 12){
                $("#itensCardapio").append(temp)
            };

            if (!vermais && i < 4) {
                $("#itensCardapio").append(temp)
            }
            
        })

        $('.container-menu a').removeClass('active');

        $('#menu-' + categoria).addClass('active');
    },

    verMais: () => {
        var ativo = $('.container-menu a.active').attr('id').split('menu-')[1];
        cardapio.metodos.obterItensCardapio(ativo,true);
        $('#btnVerMais').addClass('hiden')
    }
};

cardapio.templates = {
    item: `
        <div class="col-3 mb-5">
            <div class="card card-item">
                <div class="img-produto">
                    <img src="\${img}">
                </div>
                <p class="title-produto text-center mt-4">
                    <b>\${name}</b>
                </p>
                <p class="price-produto text-center">
                    <b>R$ \${price}</b>
                </p>
                <div class="add-carrinho">
                    <span class="btn-menos"><i class="fas fa-minus"></i></span>
                    <span class="add-numero-itens">0</span>
                    <span class="btn-mais"><i class="fas fa-plus"></i></span>
                    <span class="btn btn-add"><i class="fas fa-shopping-bag"></i></span>
                </div>
            </div>
        </div>
    `
};