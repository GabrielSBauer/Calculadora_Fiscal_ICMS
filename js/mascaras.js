// =====================================================
// MÁSCARAS E VALIDAÇÕES DE INPUT
// =====================================================

// Máscara para CNPJ: XX.XXX.XXX/XXXX-XX
function mascaraCNPJ(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 14) value = value.slice(0, 14);
    
    if (value.length > 0) {
        value = value.replace(/(\d{2})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1/$2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
    input.value = value;
}

// Máscara que detecta CPF ou CNPJ conforme o tamanho
function mascaraCpfCnpj(input) {
    let value = input.value.replace(/\D/g, '');
    // limita a 14 dígitos (máximo CNPJ)
    if (value.length > 14) value = value.slice(0, 14);

    if (value.length <= 11) {
        // CPF
        if (value.length > 0) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1-$2');
        }
    } else {
        // CNPJ
        value = value.replace(/(\d{2})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1/$2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
    input.value = value;
}

// Máscara para CPF: XXX.XXX.XXX-XX
function mascaraCPF(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 0) {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1-$2');
    }
    input.value = value;
}

// Máscara para Nota Fiscal: apenas números
function mascaraNumeros(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}

// Máscara para Peso: permite apenas números e até 2 casas decimais
function mascaraPeso(input) {
    let value = input.value.replace(/[^0-9.]/g, '');
    
    // Evita múltiplos pontos
    if ((value.match(/\./g) || []).length > 1) {
        value = value.replace(/\.(?=.*\.)/, '');
    }
    
    // Limita casas decimais
    const parts = value.split('.');
    if (parts.length === 2) {
        parts[1] = parts[1].slice(0, 2);
        value = parts.join('.');
    }
    
    input.value = value;
}

// Máscara para Moeda: R$ com 2 casas decimais
function mascaraMoeda(input) {
    let value = input.value.replace(/[^0-9.]/g, '');
    
    // Evita múltiplos pontos
    if ((value.match(/\./g) || []).length > 1) {
        value = value.replace(/\.(?=.*\.)/, '');
    }
    
    // Limita casas decimais a 2
    const parts = value.split('.');
    if (parts.length === 2) {
        parts[1] = parts[1].slice(0, 2);
        value = parts.join('.');
    }
    
    input.value = value;
}

// Máscara para Percentual: apenas números até 100
function mascaraPercentual(input) {
    let value = input.value.replace(/[^0-9.]/g, '');
    
    // Evita múltiplos pontos
    if ((value.match(/\./g) || []).length > 1) {
        value = value.replace(/\.(?=.*\.)/, '');
    }
    
    // Limita casas decimais
    const parts = value.split('.');
    if (parts.length === 2) {
        parts[1] = parts[1].slice(0, 2);
        value = parts.join('.');
    }
    
    // Limita a 100%
    if (parseFloat(value) > 100) {
        value = '100';
    }
    
    input.value = value;
}

// Validar CNPJ
function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^0-9]/g, '');
    if (cnpj.length !== 14) return false;
    
    // Implementar validação do dígito verificador
    return true;
}

// Validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^0-9]/g, '');
    if (cpf.length !== 11) return false;
    
    // Implementar validação do dígito verificador
    return true;
}

// Inicializar máscaras ao carregar página
document.addEventListener('DOMContentLoaded', function() {
    // CNPJ
    const cnpjInputs = document.querySelectorAll('input[data-mascara="cnpj"]');
    cnpjInputs.forEach(input => {
        input.addEventListener('input', function() { mascaraCNPJ(this); });
    });
    
    // CPF
    const cpfInputs = document.querySelectorAll('input[data-mascara="cpf"]');
    cpfInputs.forEach(input => {
        input.addEventListener('input', function() { mascaraCPF(this); });
    });
    // CPF/CNPJ alternado
    const cpfcnpjInputs = document.querySelectorAll('input[data-mascara="cpfcnpj"]');
    cpfcnpjInputs.forEach(input => {
        input.addEventListener('input', function() { mascaraCpfCnpj(this); });
    });
    
    // Números (Nota Fiscal, CT-e, etc)
    const numeroInputs = document.querySelectorAll('input[data-mascara="numero"]');
    numeroInputs.forEach(input => {
        input.addEventListener('input', function() { mascaraNumeros(this); });
    });
    
    // Peso
    const pesoInputs = document.querySelectorAll('input[data-mascara="peso"]');
    pesoInputs.forEach(input => {
        input.addEventListener('input', function() { mascaraPeso(this); });
    });
    
    // Moeda
    const moedaInputs = document.querySelectorAll('input[data-mascara="moeda"]');
    moedaInputs.forEach(input => {
        input.addEventListener('input', function() { mascaraMoeda(this); });
    });
    
    // Percentual
    const percentualInputs = document.querySelectorAll('input[data-mascara="percentual"]');
    percentualInputs.forEach(input => {
        input.addEventListener('input', function() { mascaraPercentual(this); });
    });
});
