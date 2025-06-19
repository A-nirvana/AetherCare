import {Header, HealthScore, VitalCard, ClimateCard, ECGCard, DoctorTipsWeb, BotpressChat} from "@/components/Dashboard"

export default function Home() {
  return (
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Header />
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-4">
            <HealthScore />
            <VitalCard />
          </div>
            <ClimateCard />
          </div>
          <div className="w-full lg:w-1/3">
        <DoctorTipsWeb />
        <BotpressChat />
      </div>
      </div>
  );
}
