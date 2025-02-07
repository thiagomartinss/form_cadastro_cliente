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

btn.addEventListener('click', (e) => {
    e.preventDefault();
    const currentDate = new Date();
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
    }else if(!validarCPF(inputCpf.value)){
        alert('CPF inválido!');
        incluirBorder(div_cpf);
        return;
    }else if(validarData(dtNascimento.value)){
        alert('Data de nascimento inválida!');
        incluirBorder(dtNascimento);
        return;
    }else{
        alert('Cliente cadastrado com sucesso!')
        form.reset();
        removerBorder(div_name);
        removerBorder(div_last_name);
        removerBorder(div_cpf);
        removerBorder(div_rg);
        removerBorder(div_cel);
        removerBorder(dtNascimento);

    }
})

function incluirBorder(campo){
    campo.style.border = '1px solid red';
}
function removerBorder(campo){
    campo.style.border = 'none';
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) 
        return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;

    return cpf.charAt(9) == digito1 && cpf.charAt(10) == digito2;
}

function validarData(data){
    const currentDate = new Date();
    const dataAtual = new Date(data);

    currentDate.setHours(0,0,0,0);
    dataAtual.setHours(0,0,0,0);
    return dataAtual > currentDate;
}