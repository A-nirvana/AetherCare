"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

import { Button } from "@/components/ui/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Generates random data for a 24-hour period for BPM, Oxygen, and Temperature.
const generate24HourData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    bpm: Math.floor(Math.random() * (95 - 65 + 1)) + 65,
    oxygen: Math.floor(Math.random() * (100 - 90 + 1)) + 90,
    temperature: parseFloat((Math.random() * (37.5 - 36.0) + 36.0).toFixed(1)),
  }))
}

// Static data for the last 7 days.
const weeklyData = [
  { day: "Mon", bpm: 72, oxygen: 95, temperature: 36.8, bmi: 22.1 },
  { day: "Tue", bpm: 75, oxygen: 96, temperature: 37.0, bmi: 22.3 },
  { day: "Wed", bpm: 70, oxygen: 94, temperature: 36.5, bmi: 22.0 },
  { day: "Thu", bpm: 78, oxygen: 97, temperature: 37.2, bmi: 22.4 },
  { day: "Fri", bpm: 80, oxygen: 98, temperature: 37.1, bmi: 22.5 },
  { day: "Sat", bpm: 85, oxygen: 99, temperature: 37.3, bmi: 22.7 },
  { day: "Sun", bpm: 82, oxygen: 97, temperature: 36.9, bmi: 22.6 },
]

// Static data for the last 4 weeks.
const monthlyData = [
  { week: "Week 1", bpm: 78, oxygen: 96, temperature: 36.9, bmi: 22.3 },
  { week: "Week 2", bpm: 80, oxygen: 97, temperature: 37.0, bmi: 22.4 },
  { week: "Week 3", bpm: 75, oxygen: 95, temperature: 36.7, bmi: 22.2 },
  { week: "Week 4", bpm: 77, oxygen: 96, temperature: 36.8, bmi: 22.3 },
]

// --- Component Configuration ---

// Centralized data object
const allData = {
  "24h": generate24HourData(),
  "7d": weeklyData,
  "30d": monthlyData,
}

// Chart configuration for styling
const chartConfig = {
  bpm: {
    label: "BPM",
    color: "hsl(var(--chart-1))",
  },
  oxygen: {
    label: "Oxygen (%)",
    color: "hsl(var(--chart-2))",
  },
  temperature: {
    label: "Temperature (°C)",
    color: "hsl(var(--chart-3))",
  },
  bmi:{
    label: "BMI",
    color: "hsl(var(--chart-4))"
  }
}

export default function HealthChartComponent() {
  const [timeRange, setTimeRange] = useState("24h")

  const dataKeyMap = {
    "24h": "time",
    "7d": "day",
    "30d": "week",
  }

  const descriptionMap = {
    "24h": "Showing health metrics for the last 24 hours.",
    "7d": "Showing average health metrics for the last 7 days.",
    "30d": "Showing average health metrics for the last 4 weeks.",
  }

  const footerTextMap = {
    '24h': 'Data updated hourly.',
    '7d': 'Daily average for the last week.',
    '30d': 'Weekly average for the last month.',
  }

  const formatTick = (value) => {
    switch (timeRange) {
      case '24h':
        return value.split(':')[0]
      case '30d':
        return value.replace('Week ', 'W')
      default:
        return value
    }
  }

  return (
    <div className="grow w-full p-6">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6 mb-6">
        <div className="flex-1">
          <div className="font-semibold text-2xl">Health Metrics</div>
          <div>{descriptionMap[timeRange]}</div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={timeRange === "24h" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("24h")}
          >
            24 Hours
          </Button>
          <Button
            variant={timeRange === "7d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("7d")}
          >
            Weekly
          </Button>
          <Button
            variant={timeRange === "30d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("30d")}
          >
            Monthly
          </Button>
        </div>
      </div>
      <div>
        <ChartContainer config={chartConfig} className={"h-64 sm:h-[80vh]"}>
          <AreaChart
            accessibilityLayer
            data={allData[timeRange]}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={dataKeyMap[timeRange]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatTick}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[60, 'dataMax + 5']}
              label={{ value: "BPM", angle: -90, position: 'insideLeft', offset: -10, style: { textAnchor: 'middle', fill: 'var(--color-red-500)' } }}
            />
            <YAxis
              yAxisId="rightOxygen"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[80, 105]}
              label={{ value: "Oxygen (%)", angle: 90, position: 'insideRight', offset: -10, style: { textAnchor: 'middle', fill: 'var(--color-blue-500)' } }}
            />
            <YAxis
              yAxisId="rightTemp"
              orientation="right"
              hide={true}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[35.0, 38.0]}
            />
            <YAxis
              yAxisId="rightBmi"
              orientation="right"
              hide={true}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[17.0, 25.0]}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            {/* Defines a gradient fill for BPM */}
            <defs>
              <linearGradient id="fillBpm" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-red-500)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-red-500)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillOxygen" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-blue-500)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-blue-500)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillTemperature" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-green-500)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-green-500)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillBmi" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-orange-500)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-orange-500)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              yAxisId="left"
              dataKey="bpm"
              type="natural"
              fill="url(#fillBpm)"
              stroke="var(--color-red-500)"
            />
            <Area
              yAxisId="rightOxygen"
              dataKey="oxygen"
              type="natural"
              fill="url(#fillOxygen)"
              stroke="var(--color-blue-500)"
            />
            <Area
              yAxisId="rightTemp"
              dataKey="temperature"
              type="natural"
              fill="url(#fillTemperature)"
              stroke="var(--color-green-500)"
            />
            {timeRange!=="24h" &&
            <Area
              yAxisId="rightBmi"
              dataKey="bmi"
              type="natural"
              fill="url(#fillBmi)"
              stroke="var(--color-orange-500)"
            />}
          </AreaChart>
        </ChartContainer>
      </div>
      <div>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Your health metrics appear stable
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {footerTextMap[timeRange]}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}