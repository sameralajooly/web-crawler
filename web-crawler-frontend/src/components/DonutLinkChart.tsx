import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#00C49F", "#FF8042"];

type Props = {
  internal: number;
  external: number;
};

const DonutLinkChart = ({ internal, external }: Props) => {
  const data = [
    { name: "Internal", value: internal },
    { name: "External", value: external },
  ];

  return (
    <div className="p-4 shadow">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            innerRadius={40}
            label
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutLinkChart;
