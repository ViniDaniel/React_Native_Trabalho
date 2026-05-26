import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type EstoqueConfig = {
  limiteBaixo: number;  
  limiteMedio: number;   
};

type EstoqueConfigContextType = {
  config: EstoqueConfig;
  salvarConfig: (novaConfig: EstoqueConfig) => Promise<void>;
};

const DEFAULT_CONFIG: EstoqueConfig = {
  limiteBaixo: 5,
  limiteMedio: 20,
};

const EstoqueConfigContext = createContext<EstoqueConfigContextType>({
  config: DEFAULT_CONFIG,
  salvarConfig: async () => {},
});

export function EstoqueConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<EstoqueConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    async function carregar() {
      const salvo = await AsyncStorage.getItem("@estoque_config");
      if (salvo) setConfig(JSON.parse(salvo));
    }
    carregar();
  }, []);

  const salvarConfig = async (novaConfig: EstoqueConfig) => {
    setConfig(novaConfig);
    await AsyncStorage.setItem("@estoque_config", JSON.stringify(novaConfig));
  };

  return (
    <EstoqueConfigContext.Provider value={{ config, salvarConfig }}>
      {children}
    </EstoqueConfigContext.Provider>
  );
}

export const useEstoqueConfig = () => useContext(EstoqueConfigContext);