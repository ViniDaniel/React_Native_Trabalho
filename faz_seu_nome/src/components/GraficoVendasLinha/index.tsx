import { useState } from "react";
import { View, Text } from "react-native";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../global/themeContext";
import { darkTheme, lightTheme } from "../../global/themas";
import { createStyle } from "./style";

type Ponto = { x: number; y: number; label: string };

type Props = {
  pontos: Ponto[];
  corLinha: string;
  meta: number | null;
  progresso: number;
};

export function GraficoVendasLinha({ pontos, corLinha, meta, progresso }: Props) {
  const { dark, fontScale } = useTheme();
  const colors = dark ? darkTheme : lightTheme;
  const style = createStyle(colors, fontScale);
  const [graficoWidth, setGraficoWidth] = useState(300);

  const legendaTexto =
    meta === null
      ? "Sem meta"
      : progresso >= 1
        ? "Meta atingida"
        : progresso >= 0.75
          ? "Próximo da meta"
          : "Abaixo da meta";

  return (
    <View
      style={style.container}
      onLayout={(e) => setGraficoWidth(e.nativeEvent.layout.width)}
    >
      <View style={style.header}>
        <Text style={style.titulo}>Vendas acumuladas</Text>
        <View style={style.legendaRow}>
          <View style={[style.legendaDot, { backgroundColor: corLinha }]} />
          <Text style={style.legendaText}>{legendaTexto}</Text>
        </View>
      </View>

      {pontos.length >= 2 ? (
        <VictoryChart
          width={graficoWidth}
          height={200}
          padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
          domainPadding={{ y: [10, 30] }}
        >
          <VictoryAxis
            style={{
              axis: { stroke: colors.border },
              tickLabels: { fontSize: 10, fill: colors.textMuted },
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: colors.border },
              tickLabels: { fontSize: 10, fill: colors.textMuted },
            }}
            tickFormat={(t) => `R$${t}`}
          />
          <VictoryLine
            data={pontos}
            interpolation="monotoneX"
            style={{
              data: { stroke: corLinha, strokeWidth: 2.5 },
            }}
          />
        </VictoryChart>
      ) : (
        <View style={style.emptyContainer}>
          <MaterialCommunityIcons
            name="chart-line"
            size={40}
            color={colors.textFaint}
          />
          <Text style={style.emptyText}>Nenhuma venda no período selecionado</Text>
        </View>
      )}
    </View>
  );
}