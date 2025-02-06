const inputCpf = document.getElementById('cpf');
const inputRG = document.getElementById('rg');
const inputCelular = document.getElementById('celular');
const btn = document.querySelector('button');
const nome = document.getElementById('name');
const last_name = document.getElementById('last-name');
const dtNascimento = document.getElementById('dtNascimento');
const div_name = document.getElementById('div-name');
const div_last_name = document.getElementById('div-last-name');
const div_cpf = document.getElementById('div-cpf');
const div_rg = document.getElementById('div-rg');
const div_cel = document.getElementById('div-celular');
const form = document.querySelector('form');

/*máscaras para cpf ** apenas para salvar
inputCpf.addEventListener('keypress',() =>{
    let cpfLength = cpf.value.length;

    if(cpfLength === 3 || cpfLength === 7){
        cpf.value += '.';
    } else if(cpfLength === 11){
        cpf.value += '-';
    }
})*/

// máscaras e validador de n° para cpf, rg e telefone
inputCpf.addEventListener('input', () => {
    let cpfValue = inputCpf.value;
    cpfValue = cpfValue.replace(/\D/g, ''); 
    if (cpfValue.length <= 3) {
        inputCpf.value = cpfValue;
    } else if (cpfValue.length <= 6) {
        inputCpf.value = cpfValue.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    } else if (cpfValue.length <= 9) {
        inputCpf.value = cpfValue.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else {
        inputCpf.value = cpfValue.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }
});

inputRG.addEventListener('input', () => {
    let rgValue = inputRG.value;
    rgValue = rgValue.replace(/\D/g, ''); 
    if (rgValue.length <= 2) {
        inputRG.value = rgValue;
    } else if (rgValue.length <= 5) {
        inputRG.value = rgValue.replace(/(\d{2})(\d{1,3})/, '$1.$2');
    } else if (rgValue.length <= 8) {
        inputRG.value = rgValue.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else {
        inputRG.value = rgValue.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, '$1.$2.$3-$4');
    }
});

inputCelular.addEventListener('input', () => {
    let celularValue = inputCelular.value;
    celularValue = celularValue.replace(/\D/g, ''); 
    if (celularValue.length <= 2) {
        inputCelular.value = `(${celularValue}`;
    } else if (celularValue.length <= 6) {
        inputCelular.value = `(${celularValue.slice(0, 2)}) ${celularValue.slice(2)}`;
    } else {
        inputCelular.value = `(${celularValue.slice(0, 2)}) ${celularValue.slice(2, 7)}-${celularValue.slice(7, 11)}`;
    }
});

btn.addEventListener('click', () => {
    if(nome.value === '' || last_name.value === '' || inputCpf.value === '' || inputRG.value === '' || inputCelular.value === '' || dtNascimento.value === ''){
        alert('Preencha os campos obrigatórios em vermelho!');
        if(nome.value === ''){
            incluirBorder(div_name);
        }
        if(last_name.value === ''){
            incluirBorder(div_last_name);
        }
        if(inputCpf.value === ''){
            incluirBorder(div_cpf);
        }
        if(inputRG.value === ''){
            incluirBorder(div_rg);
        }
        if(inputCelular.value === ''){
            incluirBorder(div_cel);
        }
        if(dtNascimento.value === ''){
            incluirBorder(dtNascimento);
        }
        return;
    }else{
        alert('Cliente cadastrado com sucesso!');
    }        
})

function incluirBorder(campo){
    campo.style.border = '1px solid red';
}
