import React, { useEffect, useState } from "react";

interface Stock {
  id?: string;
  name: string;
  symbol: string;
  sector?: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  cmp?: number;
  presentValue?: number;
  gainLoss: number;
  peRatio?: number;
  latestEarnings?: string;
  portfolioPercentage?: string;
}

const Dashboard: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          "https://finance-portfolio-dashboard-backend.onrender.com/api/stocks"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch stock data");
        }
        const data: Stock[] = await response.json();
        setStocks(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
    const intervalId = setInterval(fetchStockData, 15000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center mt-10 text-lg font-semibold">
        {error}
      </div>
    );
  }

  // Group stocks by sector
  const stocksBySector = stocks.reduce<Record<string, Stock[]>>((acc, stock) => {
    const sector = stock.sector || "Unknown Sector";
    if (!acc[sector]) acc[sector] = [];
    acc[sector].push(stock);
    return acc;
  }, {});

  return (
//     <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
//   <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
//     Stock Portfolio Dashboard
//   </h1>

//   {Object.entries(stocksBySector).map(([sector, sectorStocks]) => (
//     <div key={sector} className="mb-12">
//       {/* Sector Header */}
//       <div className="mb-4">
//         <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-2">
//           {sector}
//         </h2>
//       </div>

//       {/* Stock Table */}
//       <div className="overflow-x-auto rounded-lg shadow bg-white border border-gray-200">
//         <table className="min-w-full text-sm text-left text-gray-700">
//           <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
//             <tr>
//               {[
//                 "Stock Name",
//                 "NSE/BSE",
//                 "Purchase Price",
//                 "Quantity",
//                 "Investment",
//                 "Current Price",
//                 "Present Value",
//                 "Gain / Loss",
//                 "P/E Ratio",
//                 "Latest Earnings",
//                 "Portfolio %",
//               ].map((header) => (
//                 <th
//                   key={header}
//                   className="py-3 px-4 text-center font-medium border-b border-gray-200"
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {sectorStocks.map((stock, idx) => (
//               <tr
//                 key={stock.symbol}
//                 className={`transition-colors duration-200 ${
//                   idx % 2 === 0 ? "bg-white" : "bg-gray-50"
//                 } hover:bg-gray-100`}
//               >
//                 <td className="py-3 px-4 font-semibold text-gray-800">
//                   {stock.name}
//                 </td>
//                 <td className="py-3 px-4">{stock.symbol}</td>
//                 <td className="py-3 px-4">₹{stock.purchasePrice}</td>
//                 <td className="py-3 px-4">{stock.quantity}</td>
//                 <td className="py-3 px-4">₹{stock.investment}</td>
//                 <td className="py-3 px-4">₹{stock.cmp ?? "N/A"}</td>
//                 <td className="py-3 px-4">₹{stock.presentValue ?? "0"}</td>
//                 <td className="py-3 px-4">
//                   <span
//                     className={`px-2 py-1 rounded text-xs font-medium ${
//                       stock.gainLoss >= 0
//                         ? "bg-green-50 text-green-700 border border-green-200"
//                         : "bg-red-50 text-red-700 border border-red-200"
//                     }`}
//                   >
//                     ₹{stock.gainLoss}
//                   </span>
//                 </td>
//                 <td className="py-3 px-4">{stock.peRatio ?? "N/A"}</td>
//                 <td className="py-3 px-4">{stock.latestEarnings ?? "N/A"}</td>
//                 <td className="py-3 px-4 font-medium text-gray-700">
//                   {stock.portfolioPercentage ?? "0%"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   ))}
// </div>
<div className="p-6 min-h-screen" style={{ backgroundColor: "#fdfdfd" }}>
  <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
    Stock Portfolio Dashboard
  </h1>

  {Object.entries(stocksBySector).map(([sector, sectorStocks]) => (
    <div key={sector} className="mb-12">
      {/* Sector Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-300 pb-2">
          {sector}
        </h2>
      </div>

      {/* Stock Table */}
      <div className="overflow-x-auto rounded-lg shadow bg-white border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
            <tr>
              {[
                "Stock Name",
                "NSE/BSE",
                "Purchase Price",
                "Quantity",
                "Investment",
                "Current Price",
                "Present Value",
                "Gain / Loss",
                "P/E Ratio",
                "Latest Earnings",
                "Portfolio %",
              ].map((header) => (
                <th
                  key={header}
                  className="py-3 px-4 text-center font-medium border-b border-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sectorStocks.map((stock, idx) => (
              <tr
                key={stock.symbol}
                className={`transition-colors duration-200 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="py-3 px-4 font-semibold text-gray-800">
                  {stock.name}
                </td>
                <td className="py-3 px-4">{stock.symbol}</td>
                <td className="py-3 px-4">₹{stock.purchasePrice}</td>
                <td className="py-3 px-4">{stock.quantity}</td>
                <td className="py-3 px-4">₹{stock.investment}</td>
                <td className="py-3 px-4">₹{stock.cmp ?? "N/A"}</td>
                <td className="py-3 px-4">₹{stock.presentValue ?? "0"}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      stock.gainLoss >= 0
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    ₹{stock.gainLoss}
                  </span>
                </td>
                <td className="py-3 px-4">{stock.peRatio ?? "N/A"}</td>
                <td className="py-3 px-4">{stock.latestEarnings ?? "N/A"}</td>
                <td className="py-3 px-4 font-medium text-gray-700">
                  {stock.portfolioPercentage ?? "0%"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ))}
</div>

  );
};

export default Dashboard;
