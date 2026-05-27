// components/GraficoFormaPagamento/index.tsx
import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../global/themeContext";
import { darkTheme, lightTheme } from "../../global/themas";
import { getVendasPorFormaPagamento } from "../../database/vendaRepository";
import { createStyle } from "./style";

type Props = {
  dataInicioPadrao: string;
  dataFimPadrao: string;
};

function hoje(): string {
  return new Date().toISOString().split("T")[0];
}

function inicioMesAtual(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
}

function formatarDateInput(iso: string): string {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

function parseInput(str: string): string | null {
  const match = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  return `${match[3]}-${match[2]}-${match[1]}`;
}

function mascaraData(texto: string): string {
  const n = texto.replace(/\D/g, "");
  if (n.length <= 2) return n;
  if (n.length <= 4) return `${n.slice(0, 2)}/${n.slice(2)}`;
  return `${n.slice(0, 2)}/${n.slice(2, 4)}/${n.slice(4, 8)}`;
}

function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const CORES = [
  "#4CAF50", "#2196F3", "#FF9800", "#E91E63",
  "#9C27B0", "#00BCD4", "#FF5722", "#607D8B",
];

export function GraficoFormaPagamento({ dataInicioPadrao, dataFimPadrao }: Props) {
  const { dark, fontScale } = useTheme();
  const colors = dark ? darkTheme : lightTheme;
  const style = createStyle(colors, fontScale);

  const [dados, setDados] = useState<{ forma_pagamento: string; total: number }[]>([]);
  const [dataInicio, setDataInicio] = useState(dataInicioPadrao);
  const [dataFim, setDataFim] = useState(dataFimPadrao);
  const [inputInicio, setInputInicio] = useState(formatarDateInput(dataInicioPadrao));
  const [inputFim, setInputFim] = useState(formatarDateInput(dataFimPadrao));

  async function carregar(inicio: string, fim: string) {
    const result = await getVendasPorFormaPagamento(inicio, fim);
    setDados(result);
  }

  useEffect(() => {
    carregar(dataInicio, dataFim);
  }, [dataInicio, dataFim]);

  function aplicarFiltro() {
    const inicio = parseInput(inputInicio);
    const fim = parseInput(inputFim);
    if (!inicio || !fim) {
      Alert.alert("Data inválida", "Use o formato DD/MM/AAAA");
      return;
    }
    if (inicio > fim) {
      Alert.alert("Data inválida", "A data inicial deve ser anterior à final");
      return;
    }
    setDataInicio(inicio);
    setDataFim(fim);
  }

  function resetarMesAtual() {
    const inicio = inicioMesAtual();
    const fim = hoje();
    setDataInicio(inicio);
    setDataFim(fim);
    setInputInicio(formatarDateInput(inicio));
    setInputFim(formatarDateInput(fim));
  }

  const totalGeral = dados.reduce((acc, d) => acc + d.total, 0);
  const maiorValor = dados.length > 0 ? dados[0].total : 1;

  return (
    <View style={style.container}>
      <Text style={style.titulo}>Vendas por forma de pagamento</Text>

      <View style={style.filtroRow}>
        <TextInput
          value={inputInicio}
          onChangeText={(t) => setInputInicio(mascaraData(t))}
          placeholder="DD/MM/AAAA"
          placeholderTextColor={colors.textFaint}
          keyboardType="numeric"
          maxLength={10}
          onBlur={aplicarFiltro}
          style={style.filtroInput}
        />
        <Text style={style.filtroSeparador}>até</Text>
        <TextInput
          value={inputFim}
          onChangeText={(t) => setInputFim(mascaraData(t))}
          placeholder="DD/MM/AAAA"
          placeholderTextColor={colors.textFaint}
          keyboardType="numeric"
          maxLength={10}
          onBlur={aplicarFiltro}
          style={style.filtroInput}
        />
        <Pressable style={style.filtroBtnMes} onPress={resetarMesAtual}>
          <Text style={style.filtroBtnMesText}>Mês atual</Text>
        </Pressable>
      </View>

      
      {dados.length === 0 ? (
        <View style={style.emptyContainer}>
          <MaterialCommunityIcons name="chart-bar" size={36} color={colors.textFaint} />
          <Text style={style.emptyText}>Nenhuma venda no período</Text>
        </View>
      ) : (
        <View style={style.barrasContainer}>
          {dados.map((item, index) => {
            const pct = item.total / maiorValor;
            const cor = CORES[index % CORES.length];
            const porcentagemTotal = totalGeral > 0
              ? ((item.total / totalGeral) * 100).toFixed(1)
              : "0";

            return (
              <View key={item.forma_pagamento}>
                <View style={style.barraLabelRow}>
                  <Text style={style.barraLabel}>{item.forma_pagamento}</Text>
                  <Text style={style.barraValor}>
                    {formatarMoeda(item.total)} · {porcentagemTotal}%
                  </Text>
                </View>
                <View style={style.barraBg}>
                  <View style={[
                    style.barraFill,
                    { width: `${Math.round(pct * 100)}%`, backgroundColor: cor }
                  ]} />
                </View>
              </View>
            );
          })}

          <View style={style.totalRow}>
            <Text style={style.totalLabel}>Total geral</Text>
            <Text style={style.totalValor}>{formatarMoeda(totalGeral)}</Text>
          </View>
        </View>
      )}
    </View>
  );
}