import { useState, useEffect } from "react";
import axios from "axios";

function FiiMonitor() {
  const [fiis, setFiis] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:5001/api/fiis"); // URL do backend
      setFiis(result.data);
    };

    fetchData();
    const interval = setInterval(fetchData, 180000); // 3 minutos

    return () => clearInterval(interval); // Cleanup na desmontagem do componente
  }, []);

  return (
    <div className="fiis-container">
      {fiis.map((fii) => (
        <div key={fii.symbol} className="fii-card">
          <h3>{fii.symbol}</h3>
          <p>Yield anual: {fii.yieldAnual}%</p>
          <p>Yield mensal (JC): {fii.yieldMensal}%</p>
          <p>Valor da Cota: R$ {fii.currentPrice}</p>
          <p>Cotas Necessárias: {fii.cotasNecessarias}</p>
          <p>Valor Total a ser Investido: R$ {fii.valorTotalInvestido}</p>
        </div>
      ))}
    </div>
  );
}

export default FiiMonitor;
