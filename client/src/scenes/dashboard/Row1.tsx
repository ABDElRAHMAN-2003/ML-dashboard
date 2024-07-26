
import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashBoardBox'
import { useGetKpisQuery } from '@/state/api'
import { useTheme } from '@mui/material'
import { useMemo } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Line,
  LineChart,
  Legend,
  CartesianGrid,
  Area,
  Tooltip
}from "recharts"

type Props = {}

const Row1 = (props: Props) => {
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();
  console.log("🚀 ~ Row1 ~ data:", data);

  const { revenue,sideText_2, revenueProfit, revenueExpenses, sideText1 } = useMemo(() => {
    if (!data || !data[0].monthlyData || data[0].monthlyData.length < 2) {
      return { revenue:[],sideText_2: '', revenueProfit: [], revenueExpenses: [], sideText1: '' };
    }

    const monthlyData = data[0].monthlyData;


    const revenue = monthlyData.map(({ month, revenue }) => ({
      name: month.substring(0, 3),
      revenue: revenue,
    }));

    const revenueExpenses = monthlyData.map(({ month, revenue, expenses }) => ({
      name: month.substring(0, 3),
      revenue: revenue,
      expenses: expenses
    }));

    const revenueProfit = monthlyData.map(({ month, revenue, expenses }) => ({
      name: month.substring(0, 3),
      revenue: revenue,
      profit: (revenue - expenses).toFixed(2),
    }));

    const lastMonth = monthlyData[monthlyData.length - 2];
    const thisMonth = monthlyData[monthlyData.length - 1];

    const revenueChange = ((thisMonth.revenue - lastMonth.revenue) / lastMonth.revenue) * 100;
    const expensesChange = ((thisMonth.expenses - lastMonth.expenses) / lastMonth.expenses) * 100;
    const profitChange = (((thisMonth.revenue - thisMonth.expenses) - (lastMonth.revenue - lastMonth.expenses)) / (lastMonth.revenue - lastMonth.expenses)) * 100;

    const sideText1 = `Revenue Change: ${revenueChange.toFixed(2)}%, Expenses Change: ${expensesChange.toFixed(2)}%`;
    const sideText_2 = `Revenue Change: ${revenueChange.toFixed(2)}%, Profit Change: ${profitChange.toFixed(2)}%`;

    return { revenue,sideText_2, revenueProfit, revenueExpenses, sideText1 };
  }, [data]);

  

  return (
    <>
        <DashboardBox gridArea="a">
          <BoxHeader
          title='Revenue and Expenses'
          subtitle='top line represents revenue, bottom line represents expenses'
          sidetext={sideText1}
          />
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={revenueExpenses}
              margin={{
                top: 15,
                right: 25,
                left: -10,
                bottom: 60,
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="95%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                tickLine={false}
                style={{ fontSize: "10px" }}
              />
              <YAxis
                tickLine={false}
                axisLine={{ strokeWidth: "0" }}
                style={{ fontSize: "10px" }}
                domain={[8000, 23000]}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                dot={true}
                stroke={palette.primary.main}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                dot={true}
                stroke={palette.primary.main}
                fillOpacity={1}
                fill="url(#colorExpenses)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </DashboardBox>
        <DashboardBox gridArea="b">
          <BoxHeader
            title="Profit and Revenue"
            subtitle="top line represents revenue, bottom line represents expenses"
            sidetext={sideText_2}
          />
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={400}
              data={revenueProfit}
              margin={{
                top: 20,
                right: 0,
                left: -10,
                bottom: 55,
              }}
            >
              <CartesianGrid vertical={false} stroke={palette.grey[800]} />
              <XAxis
                dataKey="name"
                tickLine={false}
                style={{ fontSize: "10px" }}
              />
              <YAxis
                yAxisId="left"
                tickLine={false}
                axisLine={false}
                style={{ fontSize: "10px" }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickLine={false}
                axisLine={false}
                style={{ fontSize: "10px" }}
              />
              <Tooltip />
              <Legend
                height={20}
                wrapperStyle={{
                  margin: "0 0 10px 0",
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="profit"
                stroke={palette.tertiary[500]}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke={palette.primary.main}
              />
            </LineChart>
          </ResponsiveContainer>
        </DashboardBox>
        <DashboardBox gridArea="c">
          <BoxHeader
            title="Revenue Month by Month"
            subtitle="graph representing the revenue month by month"
            sidetext=""
          />
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={revenue}
              margin={{
                top: 17,
                right: 15,
                left: -5,
                bottom: 58,
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke={palette.grey[800]} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                style={{ fontSize: "10px" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                style={{ fontSize: "10px" }}
              />
              <Tooltip />
              <Bar dataKey="revenue" fill="url(#colorRevenue)" />
            </BarChart>
          </ResponsiveContainer>
        </DashboardBox>
    </>
  )
}


export default Row1