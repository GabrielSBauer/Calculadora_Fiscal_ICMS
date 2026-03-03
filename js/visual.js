// =====================================================
// GERAÇÃO DE VISUALIZAÇÃO/INVOICE E PDF
// =====================================================

function gerarVisual() {
    const secaoVisual = document.getElementById('secao-visual');
    const containerVisual = document.getElementById('visual-nota');

        // Função auxiliar para converter YYYY-MM-DD para DD/MM/YYYY
    const formatarDataBR = (data) => {
        if (!data || data === '-') return '-';
        const partes = data.split('-');
        if (partes.length === 3) {
            return `${partes[2]}/${partes[1]}/${partes[0]}`;
        }
        return data; // Se já vier diferente, mantém como está
    };


    // Capturar dados do formulário
    const filial = document.getElementById('filial').value || 'Não informado';
    const razaoSocial = document.getElementById('razao-social').value || 'Não informado';
    const cnpj = document.getElementById('cnpj').value || 'Não informado';
    const produto = document.getElementById('produto').value || 'Não selecionado';
    const nfLote = document.getElementById('nf-lote').value || '-';
    const dataNfLote     = formatarDataBR(document.getElementById('data-nf-lote').value);
    const cte            = document.getElementById('cte').value            || '-';
    const dataCte        = formatarDataBR(document.getElementById('data-cte').value);
    const nfVenda        = document.getElementById('nf-venda').value       || '-';
    const dataNfVenda    = formatarDataBR(document.getElementById('data-nf-venda').value);
    const pesoSaida = document.getElementById('peso-saida').value || '0';
    const pesoDestino = document.getElementById('peso-destino').value || '0';
    const pesoSinistrado = document.getElementById('peso-sinistrado').value || '0';
    const percentualPerda = document.getElementById('percentual-perda').value || '0%';
    const valorNf = document.getElementById('valor-nf-saida').value || '0';
    const valorFrete = document.getElementById('valor-frete').value || '0';
    const ufOrigem = document.getElementById('uf-origem').value || '-';
    const ufDestino = document.getElementById('uf-destino').value || '-';
    const aliquotaIcms = document.getElementById('aliquota-icms').value || '0';
    const fornecedorNome = document.getElementById('fornecedor-nome').value || 'Não informado';
    const fornecedorDoc = document.getElementById('fornecedor-doc').value || 'Não informado';

    // Dados de cálculo
    const dados = window.dadosCalculo || {};
    const tipoCalculo = dados.operacaoMT ? 'SEM GROSS-UP (MT)' : 'COM GROSS-UP';

    // Data/hora atual
    const agora = new Date();
    const dataGeracao = agora.toLocaleDateString('pt-BR');
    const horaGeracao = agora.toLocaleTimeString('pt-BR');

    // HTML da nota/invoice
    const html = `
        <div class="invoice-header">
            <div class="invoice-title">
                <h1>💼 CÁLCULO DE INDENIZAÇÃO</h1>
                <p class="invoice-subtitle">Nota de Débito por Sinistro em Transporte</p>
            </div>
            <div class="invoice-info">
                <p><strong>Data de Emissão:</strong> ${dataGeracao} às ${horaGeracao}</p>
                <p><strong>Tipo de Cálculo:</strong> <span class="badge badge-${dados.operacaoMT ? 'warning' : 'info'}">${tipoCalculo}</span></p>
            </div>
        </div>

        <div class="invoice-grid">
            <!-- COLUNA 1: TRANSPORTADOR -->
            <div class="invoice-section">
                <h2 class="invoice-section-title">🚚 Transportador</h2>
                <div class="invoice-data">
                    <div class="invoice-line">
                        <span class="label">Filial:</span>
                        <span class="value">${filial}</span>
                    </div>
                    <div class="invoice-line">
                        <span class="label">Razão Social:</span>
                        <span class="value">${razaoSocial}</span>
                    </div>
                    <div class="invoice-line">
                        <span class="label">CNPJ:</span>
                        <span class="value">${cnpj}</span>
                    </div>
                </div>
            </div>

            <!-- COLUNA 2: FORNECEDOR -->
            <div class="invoice-section">
                <h2 class="invoice-section-title">👤 Fornecedor/Remetente</h2>
                <div class="invoice-data">
                    <div class="invoice-line">
                        <span class="label">Razão Social:</span>
                        <span class="value">${fornecedorNome}</span>
                    </div>
                    <div class="invoice-line">
                        <span class="label">CPF/CNPJ:</span>
                        <span class="value">${fornecedorDoc}</span>
                    </div>
                </div>
            </div>
        </div>

        <hr class="invoice-divider">

        <!-- DETALHES DE DOCUMENTOS -->
        <div class="invoice-grid">
            <div class="invoice-section">
                <h2 class="invoice-section-title">📦 Documentos</h2>
                <div class="invoice-data">
                    <div class="invoice-line">
                        <span class="label">NF Lote:</span>
                        <span class="value">${nfLote} em ${dataNfLote}</span>
                    </div>
                    <div class="invoice-line">
                        <span class="label">CT-e:</span>
                        <span class="value">${cte} em ${dataCte}</span>
                    </div>
                    <div class="invoice-line">
                        <span class="label">NF Venda:</span>
                        <span class="value">${nfVenda} em ${dataNfVenda}</span>
                    </div>
                </div>
            </div>

            <div class="invoice-section">
                <h2 class="invoice-section-title">🏛️ Informações Fiscais</h2>
                <div class="invoice-data">
                    <div class="invoice-line">
                        <span class="label">Produto:</span>
                        <span class="value">${produto}</span>
                    </div>
                    <div class="invoice-line">
                        <span class="label">Rota:</span>
                        <span class="value">${ufOrigem} → ${ufDestino}</span>
                    </div>
                    <div class="invoice-line">
                        <span class="label">ICMS:</span>
                        <span class="value">${aliquotaIcms}%</span>
                    </div>
                </div>
            </div>
        </div>

        <hr class="invoice-divider">

        <!-- PESOS E VALORES -->
        <div class="invoice-grid">
            <div class="invoice-section">
                <h2 class="invoice-section-title">⚖️ Pesos (kg)</h2>
                <div class="invoice-data">
                    <div class="invoice-line">
                        <span class="label">Saída:</span>
                        <span class="value">${parseFloat(pesoSaida).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} kg</span>
                    </div>
                    <div class="invoice-line">
                        <span class="label">Destino:</span>
                        <span class="value">${parseFloat(pesoDestino).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} kg</span>
                    </div>
                    <div class="invoice-line highlight">
                        <span class="label">Sinistrado:</span>
                        <span class="value">${parseFloat(pesoSinistrado).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} kg (${percentualPerda})</span>
                    </div>
                </div>
            </div>

            <div class="invoice-section">
                <h2 class="invoice-section-title">💰 Valores (R$)</h2>
                <div class="invoice-data">
                    <div class="invoice-line">
                        <span class="label">NF Saída:</span>
                        <span class="value">R$ ${parseFloat(valorNf).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                    <div class="invoice-line">
                        <span class="label">Frete:</span>
                        <span class="value">R$ ${parseFloat(valorFrete).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                </div>
            </div>
        </div>

        <hr class="invoice-divider">

        <!-- DETALHES DE CÁLCULO -->
        <div class="invoice-calculos">
            <h2>📊 Detalhes do Cálculo</h2>
            
            <div class="calculos-grid">
                <div class="calculo-item">
                    <p class="calculo-label">Base Mercadoria:</p>
                    <p class="calculo-valor">R$ ${(dados.baseMercadoria || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                </div>
                <div class="calculo-item">
                    <p class="calculo-label">Base Frete:</p>
                    <p class="calculo-valor">R$ ${(dados.baseFrete || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                </div>
            </div>

            <div class="calculos-impostos">
                <h3>Impostos Recuperáveis:</h3>
                <div class="impostos-grid">
                    <div class="imposto-item">
                        <span class="imposto-label">ICMS Mercadoria:</span>
                        <span class="imposto-valor">R$ ${(dados.icmsMerc || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                    <div class="imposto-item">
                        <span class="imposto-label">ICMS Frete:</span>
                        <span class="imposto-valor">R$ ${(dados.icmsFrete || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                    <div class="imposto-item">
                        <span class="imposto-label">PIS:</span>
                        <span class="imposto-valor">R$ ${(dados.pisMerc || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                    <div class="imposto-item">
                        <span class="imposto-label">COFINS:</span>
                        <span class="imposto-valor">R$ ${(dados.cofinsMerc || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                </div>
            </div>
        </div>

        <hr class="invoice-divider">

        <!-- RESUMO FINAL -->
        <div class="invoice-resumo">
            <div class="resumo-item">
                <span class="resumo-label">Ressarcimento Mercadoria:</span>
                <span class="resumo-valor">R$ ${(dados.baseMercadoria || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
            <div class="resumo-item">
                <span class="resumo-label">Ressarcimento Impostos:</span>
                <span class="resumo-valor">R$ ${(dados.totalImpostos || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
            <div class="resumo-item total">
                <span class="resumo-label">💰 TOTAL À PAGAR:</span>
                <span class="resumo-valor-total">R$ ${(dados.totalPagar || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
        </div>
    `;

    containerVisual.innerHTML = html;
    secaoVisual.style.display = 'block';

    // Scroll para visualização
    secaoVisual.scrollIntoView({ behavior: 'smooth' });
}

// =====================================================
// FUNÇÃO AUXILIAR: monta o HTML/CSS completo para
// impressão A4 (usada tanto por imprimir quanto por PDF)
// =====================================================
function _gerarHTMLA4() {
    const dados = window.dadosCalculo || {};

    // Função auxiliar para converter YYYY-MM-DD para DD/MM/YYYY
    const formatarDataBR = (data) => {
        if (!data || data === '-') return '-';
        const partes = data.split('-');
        if (partes.length === 3) {
            return `${partes[2]}/${partes[1]}/${partes[0]}`;
        }
        return data; // Se já vier diferente, mantém como está
    };

    const filial         = document.getElementById('filial').value         || 'Não informado';
    const razaoSocial    = document.getElementById('razao-social').value   || 'Não informado';
    const cnpj           = document.getElementById('cnpj').value           || 'Não informado';
    const produto        = document.getElementById('produto').value        || 'Não selecionado';
    const nfLote         = document.getElementById('nf-lote').value        || '-';
    // Aplicando a formatação nas datas:
    const dataNfLote     = formatarDataBR(document.getElementById('data-nf-lote').value);
    const cte            = document.getElementById('cte').value            || '-';
    const dataCte        = formatarDataBR(document.getElementById('data-cte').value);
    const nfVenda        = document.getElementById('nf-venda').value       || '-';
    const dataNfVenda    = formatarDataBR(document.getElementById('data-nf-venda').value);
    const pesoSaida      = document.getElementById('peso-saida').value       || '0';
    const pesoDestino    = document.getElementById('peso-destino').value     || '0';
    const pesoSinistrado = document.getElementById('peso-sinistrado').value  || '0';
    const percentualPerda= document.getElementById('percentual-perda').value || '0%';
    const valorNf        = document.getElementById('valor-nf-saida').value   || '0';
    const valorFrete     = document.getElementById('valor-frete').value      || '0';
    const ufOrigem       = document.getElementById('uf-origem').value        || '-';
    const ufDestino      = document.getElementById('uf-destino').value       || '-';
    const aliquotaIcms   = document.getElementById('aliquota-icms').value    || '0';
    const fornecedorNome = document.getElementById('fornecedor-nome').value  || 'Não informado';
    const fornecedorDoc  = document.getElementById('fornecedor-doc').value   || 'Não informado';

    const tipoCalculo = dados.operacaoMT ? 'SEM GROSS-UP (MT)' : 'COM GROSS-UP';
    const agora       = new Date();
    const dataGeracao = agora.toLocaleDateString('pt-BR');
    const horaGeracao = agora.toLocaleTimeString('pt-BR');

    const fmt = v => parseFloat(v || 0).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Nota de Débito - ${dataGeracao}</title>
    <style>
        /* ── Página A4 ── */
        @page {
            size: A4 portrait;
            margin: 10mm 12mm;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 9pt;
            color: #1a1a1a;
            background: #fff;
            width: 186mm; /* A4 210mm - 2 × 12mm de margem */
        }

        /* ── Cabeçalho ── */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #2563eb;
            padding-bottom: 5px;
            margin-bottom: 7px;
        }
        .header h1 { font-size: 13pt; color: #1d4ed8; }
        .header p  { font-size: 8pt; color: #555; margin-top: 2px; }
        .header-right { text-align: right; font-size: 8pt; color: #444; }

        .badge {
            display: inline-block;
            padding: 1px 7px;
            border-radius: 10px;
            font-size: 7.5pt;
            font-weight: bold;
            color: #fff;
            background: #2563eb;
        }
        .badge-warning { background: #d97706; }

        /* ── Grade 2 colunas ── */
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
            margin-bottom: 6px;
        }

        /* ── Caixas de seção ── */
        .box {
            border: 1px solid #d1d5db;
            border-radius: 4px;
            padding: 5px 7px;
        }
        .box h2 {
            font-size: 8.5pt;
            color: #1d4ed8;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 3px;
            margin-bottom: 5px;
        }

        /* ── Linhas de dados ── */
        .row {
            display: flex;
            justify-content: space-between;
            padding: 1.5px 0;
            border-bottom: 1px dotted #e5e7eb;
            font-size: 8.5pt;
        }
        .row:last-child { border-bottom: none; }
        .lbl { color: #555; }
        .val { font-weight: 600; text-align: right; max-width: 55%; word-break: break-word; }
        .val.hl { color: #dc2626; }

        /* ── Impostos recuperáveis ── */
        .impostos-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3px;
        }
        .imp {
            display: flex;
            justify-content: space-between;
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 3px;
            padding: 3px 6px;
            font-size: 8pt;
        }

        /* ── Totais ── */
        .totais {
            border: 2px solid #1d4ed8;
            border-radius: 5px;
            overflow: hidden;
            margin-top: 6px;
        }
        .totais .row {
            padding: 4px 10px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 9pt;
        }
        .totais .row:last-child { border-bottom: none; }
        .totais .row.grand {
            background: #1d4ed8;
            color: #fff;
            font-size: 11pt;
            font-weight: 800;
        }
        .totais .row.grand .val { color: #fff; }

        /* ── Rodapé ── */
        .footer {
            margin-top: 8px;
            text-align: center;
            font-size: 7.5pt;
            color: #9ca3af;
            border-top: 1px solid #e5e7eb;
            padding-top: 4px;
        }
    </style>
</head>
<body>

    <!-- CABEÇALHO -->
    <div class="header">
        <div>
            <h1>💼 CÁLCULO DE INDENIZAÇÃO</h1>
            <p>Nota de Débito por Sinistro em Transporte</p>
        </div>
        <div class="header-right">
            <p><strong>Emissão:</strong> ${dataGeracao} às ${horaGeracao}</p>
            <p><strong>Cálculo:</strong> <span class="badge ${dados.operacaoMT ? 'badge-warning' : ''}">${tipoCalculo}</span></p>
        </div>
    </div>

    <!-- TRANSPORTADOR + FORNECEDOR -->
    <div class="grid-2">
        <div class="box">
            <h2>🚚 Transportador</h2>
            <div class="row"><span class="lbl">Filial</span><span class="val">${filial}</span></div>
            <div class="row"><span class="lbl">Razão Social</span><span class="val">${razaoSocial}</span></div>
            <div class="row"><span class="lbl">CNPJ</span><span class="val">${cnpj}</span></div>
        </div>
        <div class="box">
            <h2>👤 Fornecedor / Remetente</h2>
            <div class="row"><span class="lbl">Razão Social</span><span class="val">${fornecedorNome}</span></div>
            <div class="row"><span class="lbl">CPF/CNPJ</span><span class="val">${fornecedorDoc}</span></div>
        </div>
    </div>

    <!-- DOCUMENTOS + FISCAL -->
    <div class="grid-2">
        <div class="box">
            <h2>📦 Documentos</h2>
            <div class="row"><span class="lbl">NF Lote</span><span class="val">${nfLote} — ${dataNfLote}</span></div>
            <div class="row"><span class="lbl">CT-e</span><span class="val">${cte} — ${dataCte}</span></div>
            <div class="row"><span class="lbl">NF Venda</span><span class="val">${nfVenda} — ${dataNfVenda}</span></div>
        </div>
        <div class="box">
            <h2>🏛️ Informações Fiscais</h2>
            <div class="row"><span class="lbl">Produto</span><span class="val">${produto}</span></div>
            <div class="row"><span class="lbl">Rota</span><span class="val">${ufOrigem} → ${ufDestino}</span></div>
            <div class="row"><span class="lbl">ICMS</span><span class="val">${aliquotaIcms}%</span></div>
        </div>
    </div>

    <!-- PESOS + VALORES -->
    <div class="grid-2">
        <div class="box">
            <h2>⚖️ Pesos (kg)</h2>
            <div class="row"><span class="lbl">Saída</span><span class="val">${fmt(pesoSaida)} kg</span></div>
            <div class="row"><span class="lbl">Destino</span><span class="val">${fmt(pesoDestino)} kg</span></div>
            <div class="row"><span class="lbl">Sinistrado</span><span class="val hl">${fmt(pesoSinistrado)} kg (${percentualPerda})</span></div>
        </div>
        <div class="box">
            <h2>💰 Valores (R$)</h2>
            <div class="row"><span class="lbl">NF Saída</span><span class="val">R$ ${fmt(valorNf)}</span></div>
            <div class="row"><span class="lbl">Frete</span><span class="val">R$ ${fmt(valorFrete)}</span></div>
            <div class="row"><span class="lbl">Base Mercadoria</span><span class="val">R$ ${fmt(dados.baseMercadoria)}</span></div>
            <div class="row"><span class="lbl">Base Frete</span><span class="val">R$ ${fmt(dados.baseFrete)}</span></div>
        </div>
    </div>

    <!-- IMPOSTOS RECUPERÁVEIS -->
    <div class="box" style="margin-bottom:6px;">
        <h2>📊 Impostos Recuperáveis</h2>
        <div class="impostos-grid">
            <div class="imp"><span>ICMS Mercadoria</span><strong>R$ ${fmt(dados.icmsMerc)}</strong></div>
            <div class="imp"><span>ICMS Frete</span><strong>R$ ${fmt(dados.icmsFrete)}</strong></div>
            <div class="imp"><span>PIS</span><strong>R$ ${fmt(dados.pisMerc)}</strong></div>
            <div class="imp"><span>COFINS</span><strong>R$ ${fmt(dados.cofinsMerc)}</strong></div>
        </div>
    </div>

    <!-- TOTAIS -->
    <div class="totais">
        <div class="row"><span class="lbl">Ressarcimento Mercadoria</span><span class="val">R$ ${fmt(dados.baseMercadoria)}</span></div>
        <div class="row"><span class="lbl">Ressarcimento Impostos</span><span class="val">R$ ${fmt(dados.totalImpostos)}</span></div>
        <div class="row grand"><span>💰 TOTAL A PAGAR</span><span class="val">R$ ${fmt(dados.totalPagar)}</span></div>
    </div>

    <!-- RODAPÉ -->
    <div class="footer">
        Documento gerado automaticamente em ${dataGeracao} às ${horaGeracao} — Uso interno
    </div>

</body>
</html>`;
}

// =====================================================
// IMPRIMIR
// =====================================================
function imprimirResultado() {
    if (!window.dadosCalculo) {
        alert('⚠️ Calcule primeiro antes de imprimir!');
        return;
    }

    // Atualiza também a visualização na tela
    gerarVisual();

    const printWindow = window.open('', '', 'height=900,width=800');
    const htmlA4 = _gerarHTMLA4();

    // Injeta o conteúdo e dispara o print ao carregar
    printWindow.document.write(
        htmlA4.replace('</body>', '<script>window.onload = () => window.print();<\/script></body>')
    );
    printWindow.document.close();
}

// =====================================================
// GERAR PDF (print-to-PDF do navegador)
// =====================================================
function gerarPDF() {
    if (!window.dadosCalculo) {
        alert('⚠️ Calcule primeiro antes de gerar PDF!');
        return;
    }

    // Atualiza também a visualização na tela
    gerarVisual();

    const printWindow = window.open('', '', 'height=900,width=800');
    const htmlA4 = _gerarHTMLA4();

    printWindow.document.write(
        htmlA4.replace('</body>', '<script>window.onload = () => window.print();<\/script></body>')
    );
    printWindow.document.close();
}

// =====================================================
// AUXILIAR: formatar moeda na visualização inline
// =====================================================
function formatarMoedaVisual(valor) {
    return parseFloat(valor).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
