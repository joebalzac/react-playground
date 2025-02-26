import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock API call function
const fetchLoginAttempts = async () => {
  return new Promise<{ time: string; status: "success" | "failed" }[]>(
    (resolve) => {
      setTimeout(() => {
        resolve([
          { time: "10:00 AM", status: "success" },
          { time: "10:30 AM", status: "failed" },
          { time: "11:00 AM", status: "success" },
          { time: "11:30 AM", status: "failed" },
        ]);
      }, 500);
    }
  );
};

const SecurityDashboard: React.FC = () => {
  const [loginAttempts, setLoginAttempts] = useState<
    { time: string; status: "success" | "failed" }[]
  >([]);

  useEffect(() => {
    const getLoginAttempts = async () => {
      const data = await fetchLoginAttempts();
      setLoginAttempts(data);
    };

    getLoginAttempts();
  }, []);

  const chartData = {
    labels: loginAttempts.map((attempt) => attempt.time),
    datasets: [
      {
        label: "Successful Logins",
        data: loginAttempts.map((attempt) =>
          attempt.status === "success" ? 1 : 0
        ),
        backgroundColor: "green",
      },
      {
        label: "Failed Logins",
        data: loginAttempts.map((attempt) =>
          attempt.status === "failed" ? 1 : 0
        ),
        backgroundColor: "red",
      },
    ],
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4">Security Dashboard</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default SecurityDashboard;
