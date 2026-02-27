// Função para formatar dinheiro no padrão brasileiro (R$)
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Verifica se é operação em MT (sem gross-up)
function ehOperacaoMT() {
    const ufOrigem = document.getElementById('uf-origem').value;
    return ufOrigem === 'MT';
}

// Exibir aviso de MT
function atualizarAvisoMT() {
    const avisoMT = document.getElementById('aviso-mt');
    if (ehOperacaoMT()) {
        avisoMT.style.display = 'block';
    } else {
        avisoMT.style.display = 'none';
    }
}

// Calcula apenas o peso perdido
function calcularSinistro() {
    const pesoSaida = parseFloat(document.getElementById('peso-saida').value) || 0;
    const pesoDestino = parseFloat(document.getElementById('peso-destino').value) || 0;
    
    let pesoSinistrado = pesoSaida - pesoDestino;
    if (pesoSinistrado < 0) pesoSinistrado = 0;

    document.getElementById('peso-sinistrado').value = pesoSinistrado.toFixed(2);
    
    // Calcula o percentual de perda
    let percentualPerda = 0;
    if (pesoSaida > 0) {
        percentualPerda = (pesoSinistrado / pesoSaida) * 100;
    }
    document.getElementById('percentual-perda').value = percentualPerda.toFixed(2) + '%';
    
    // Sempre que o peso muda, os valores em R$ também precisam mudar
    calcularFinanceiro();
}

// Calcula todo o Gross Up e Impostos COM DETALHES
function calcularFinanceiro() {
    const valorNfSaida = parseFloat(document.getElementById('valor-nf-saida').value) || 0;
    const pesoSaida = parseFloat(document.getElementById('peso-saida').value) || 0;
    const pesoSinistrado = parseFloat(document.getElementById('peso-sinistrado').value) || 0;
    const valorFrete = parseFloat(document.getElementById('valor-frete').value) || 0;
    const aliquotaIcms = parseFloat(document.getElementById('aliquota-icms').value) || 0;

    // Se não tiver peso de saída ou sinistro, zera os resultados
    if (pesoSaida === 0 || pesoSinistrado === 0) {
        limparResultados();
        return;
    }

    // Determina se PIS/COFINS se aplicam ao produto selecionado
    const produto = (document.getElementById('produto') && document.getElementById('produto').value) ? document.getElementById('produto').value : '';
    const produtoUpper = produto.toUpperCase();
    const aplicaPisCofins = (produtoUpper.indexOf('MILHO') !== -1) || (produtoUpper.indexOf('ALGODAO') !== -1) || (produtoUpper.indexOf('ALGODÃO') !== -1) || (produtoUpper.indexOf('SORGO') !== -1);
    const aliqPis = aplicaPisCofins ? 1.65 : 0;
    const aliqCofins = aplicaPisCofins ? 7.60 : 0;
    const operacaoMT = ehOperacaoMT();

    // mostra ou esconde o aviso de PIS/COFINS
    const avisoPisCofins = document.getElementById('info-piscofins');
    if (avisoPisCofins) {
        avisoPisCofins.style.display = aplicaPisCofins ? 'none' : 'block';
    }

    // PASSO 1: Proporção de perda
    const proporcao = pesoSinistrado / pesoSaida;
    const baseMercadoria = valorNfSaida * proporcao;
    const baseFrete = valorFrete * proporcao;

    let icmsMerc = 0;
    let pisMerc = 0;
    let cofinsMerc = 0;
    let icmsFrete = 0;

    if (operacaoMT) {
        // CÁLCULO SEM GROSS-UP (MT)
        // Apenas aproveita os impostos proporcionais da perda
        icmsMerc = baseMercadoria * (aliquotaIcms / 100);
        pisMerc = baseMercadoria * (aliqPis / 100);
        cofinsMerc = baseMercadoria * (aliqCofins / 100);
        
        if (baseFrete > 0) {
            icmsFrete = baseFrete * (aliquotaIcms / 100);
        }
    } else {
        // CÁLCULO COM GROSS-UP (normal)
        // PASSO 2: Gross Up Mercadoria (descontar impostos)
        const fatorMercadoria = (100 - (aliquotaIcms + aliqPis + aliqCofins)) / 100;
        const valorGrossMercadoria = baseMercadoria / fatorMercadoria;

        // PASSO 3: Calcular impostos sobre o Gross Up da Mercadoria
        icmsMerc = valorGrossMercadoria * (aliquotaIcms / 100);
        pisMerc = valorGrossMercadoria * (aliqPis / 100);
        cofinsMerc = valorGrossMercadoria * (aliqCofins / 100);

        // PASSO 4: Gross Up Frete (Apenas ICMS)
        if (baseFrete > 0) {
            const fatorFrete = (100 - aliquotaIcms) / 100;
            const valorGrossFrete = baseFrete / fatorFrete;
            icmsFrete = valorGrossFrete * (aliquotaIcms / 100);
        }
    }

    // PASSO 5: Soma Final
    const totalImpostos = icmsMerc + pisMerc + cofinsMerc + icmsFrete;
    const totalPagar = baseMercadoria + totalImpostos;

    // EXIBIR DETALHES DOS CÁLCULOS
    document.getElementById('detalhe-base-merc').textContent = 'R$ ' + formatarMoeda(baseMercadoria);
    document.getElementById('detalhe-base-frete').textContent = 'R$ ' + formatarMoeda(baseFrete);
    document.getElementById('detalhe-icms-merc').textContent = 'R$ ' + formatarMoeda(icmsMerc);
    document.getElementById('detalhe-icms-frete').textContent = 'R$ ' + formatarMoeda(icmsFrete);
    document.getElementById('detalhe-pis').textContent = 'R$ ' + formatarMoeda(pisMerc);
    document.getElementById('detalhe-cofins').textContent = 'R$ ' + formatarMoeda(cofinsMerc);

    // EXIBIR RESUMO FINAL
    document.getElementById('res-mercadoria').value = formatarMoeda(baseMercadoria);
    document.getElementById('res-impostos').value = formatarMoeda(totalImpostos);
    document.getElementById('res-total').value = formatarMoeda(totalPagar);

    // Armazenar dados para visualização posterior
    window.dadosCalculo = {
        baseMercadoria,
        baseFrete,
        icmsMerc,
        icmsFrete,
        pisMerc,
        cofinsMerc,
        totalImpostos,
        totalPagar,
        operacaoMT
    };
}

// Limpar todos os resultados
function limparResultados() {
    document.getElementById('peso-sinistrado').value = '0.00';
    document.getElementById('percentual-perda').value = '0%';
    document.getElementById('detalhe-base-merc').textContent = 'R$ 0,00';
    document.getElementById('detalhe-base-frete').textContent = 'R$ 0,00';
    document.getElementById('detalhe-icms-merc').textContent = 'R$ 0,00';
    document.getElementById('detalhe-icms-frete').textContent = 'R$ 0,00';
    document.getElementById('detalhe-pis').textContent = 'R$ 0,00';
    document.getElementById('detalhe-cofins').textContent = 'R$ 0,00';
    document.getElementById('res-mercadoria').value = '0,00';
    document.getElementById('res-impostos').value = '0,00';
    document.getElementById('res-total').value = '0,00';
}

// --- EVENT LISTENERS (Ficam monitorando os campos) ---
document.getElementById('uf-origem').addEventListener('change', function() {
    buscarAliquota();
    atualizarAvisoMT();
    calcularFinanceiro();
});
document.getElementById('uf-destino').addEventListener('change', buscarAliquota);
document.getElementById('peso-saida').addEventListener('input', calcularSinistro);
document.getElementById('peso-destino').addEventListener('input', calcularSinistro);
document.getElementById('valor-nf-saida').addEventListener('input', calcularFinanceiro);
document.getElementById('valor-frete').addEventListener('input', calcularFinanceiro);
document.getElementById('aliquota-icms').addEventListener('input', calcularFinanceiro);

// atualiza quando o produto for alterado (para recalcular PIS/COFINS e possivelmente os valores)
const produtoSelect = document.getElementById('produto');
if (produtoSelect) {
    produtoSelect.addEventListener('change', calcularFinanceiro);
}

// Inicializar aviso MT
document.addEventListener('DOMContentLoaded', atualizarAvisoMT);